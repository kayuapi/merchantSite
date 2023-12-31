/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/


const {promisify} = require('util');
const Axios = require('axios');
var jsonwebtoken = require('jsonwebtoken');
const AWS = require('aws-sdk')
var awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
var bodyParser = require('body-parser')
var express = require('express')
const jwkToPem = require('jwk-to-pem');




const cognitoPoolId = process.env.COGNITO_POOL_ID || '';
// const cognitoPoolId = 'ap-southeast-1_41Kg0kf0U'; // hardcoded in, todo: pass in through process env
if (!cognitoPoolId) {
  throw new Error('env var required for cognito pool');
}
const cognitoIssuer = `https://cognito-idp.ap-southeast-1.amazonaws.com/${cognitoPoolId}`;

let cacheKeys;
const getPublicKeys = async () => {
  if (!cacheKeys) {
    const url = `${cognitoIssuer}/.well-known/jwks.json`;
    const publicKeys = await Axios.default.get(url);
    cacheKeys = publicKeys.data.keys.reduce((agg, current) => {
      const pem = jwkToPem(current);
      agg[current.kid] = {instance: current, pem};
      return agg;
    }, {});
    return cacheKeys;
  } else {
    return cacheKeys;
  }
};

const verifyPromised = promisify(jsonwebtoken.verify.bind(jsonwebtoken));

const getUserNameFromJwt = async (token) => {
  let result;
  try {
    const tokenSections = (token || '').split('.');
    if (tokenSections.length < 2) {
      throw new Error('requested token is invalid');
    }
    const headerJSON = Buffer.from(tokenSections[0], 'base64').toString('utf8');
    const header = JSON.parse(headerJSON);
    const keys = await getPublicKeys();
    const key = keys[header.kid];
    if (key === undefined) {
      throw new Error('claim made for unknown kid');
    }
    const claim = await verifyPromised(token, key.pem);
    const currentSeconds = Math.floor( (new Date()).valueOf() / 1000);
    if (currentSeconds > claim.exp || currentSeconds < claim.auth_time) {
      throw new Error('claim is expired or invalid');
    }
    if (claim.iss !== cognitoIssuer) {
      throw new Error('claim issuer is invalid');
    }
    if (claim.token_use !== 'id') {
      throw new Error('claim use is not id');
    }
    result = {userName: claim['cognito:username'], isValid: true};
  } catch (error) {
    result = {userName: '', clientId: '', error: error.message, isValid: false};
  }
  return result;
};


AWS.config.update({ region: process.env.TABLE_REGION });

const dynamodb = new AWS.DynamoDB.DocumentClient();

let tableName = "amplifyChmboxorderingDdb";
if(process.env.ENV && process.env.ENV !== "NONE") {
  tableName = tableName + '-' + process.env.ENV;
}

const userIdPresent = true; // TODO: update in case is required to use that definition
const partitionKeyName = "shopId";
const partitionKeyType = "S";
const sortKeyName = "SK";
const sortKeyType = "S";
const hasSortKey = sortKeyName !== "";
const path = "/uiplugin";
const UNAUTH = 'UNAUTH';
const hashKeyPath = '/:' + partitionKeyName;
const sortKeyPath = hasSortKey ? '/:' + sortKeyName : '';
// declare a new express app
var app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, X-Chm-Authorization")
  next()
});

// convert url string param to expected Type
const convertUrlType = (param, type) => {
  switch(type) {
    case "N":
      return Number.parseInt(param);
    default:
      return param;
  }
}

/********************************
 * HTTP Get method for list objects *
 ********************************/

app.get(path + hashKeyPath, function(req, res) {
  var condition = {}
  condition[partitionKeyName] = {
    ComparisonOperator: 'EQ'
  }

  if (userIdPresent && req.apiGateway) {
    condition[partitionKeyName]['AttributeValueList'] = [req.apiGateway.event.requestContext.identity.cognitoIdentityId || UNAUTH ];
  } else {
    try {
      condition[partitionKeyName]['AttributeValueList'] = [ convertUrlType(req.params[partitionKeyName], partitionKeyType) ];
    } catch(err) {
      res.statusCode = 500;
      res.json({error: 'Wrong column type ' + err});
    }
  }

  let queryParams = {
    TableName: tableName,
    KeyConditions: condition
  }

  dynamodb.query(queryParams, (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.json({error: 'Could not load items: ' + err});
    } else {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, X-Chm-Authorization");    
      res.json(data.Items);
    }
  });
});

/*****************************************
 * HTTP Get method for get single object *
 *****************************************/

app.get(path + '/object' + hashKeyPath + sortKeyPath, function(req, res) {
  var params = {};
  if (userIdPresent && req.apiGateway) {
    // params[partitionKeyName] = req.apiGateway.event.requestContext.identity.cognitoIdentityId || UNAUTH;
    params[partitionKeyName] = req.params[partitionKeyName];
  } else {
    params[partitionKeyName] = req.params[partitionKeyName];
    try {
      params[partitionKeyName] = convertUrlType(req.params[partitionKeyName], partitionKeyType);
    } catch(err) {
      res.statusCode = 500;
      res.json({error: 'Wrong column type ' + err});
    }
  }
  if (hasSortKey) {
    try {
      params[sortKeyName] = convertUrlType(req.params[sortKeyName], sortKeyType);
      params[sortKeyName] = decodeURIComponent(params[sortKeyName]);
    } catch(err) {
      res.statusCode = 500;
      res.json({error: 'Wrong column type ' + err});
    }
  }

  let getItemParams = {
    TableName: tableName,
    Key: params,
    ProjectionExpression: 'categories, menuItems, banner, bannerDisplayType'
  }

  dynamodb.get(getItemParams,(err, data) => {
    if(err) {
      res.statusCode = 500;
      res.json({error: 'Could not load items: ' + err.message});
    } else {
      if (data.Item) {
        res.json(data.Item);
      } else {
        res.json(data) ;
      }
    }
  });
});


/************************************
* HTTP put method for insert object *
*************************************/

app.put(path, function(req, res) {

  if (userIdPresent) {
    req.body['userId'] = req.apiGateway.event.requestContext.identity.cognitoIdentityId || UNAUTH;
  }

  let putItemParams = {
    TableName: tableName,
    Item: req.body
  }
  dynamodb.put(putItemParams, (err, data) => {
    if(err) {
      res.statusCode = 500;
      res.json({error: err, url: req.url, body: req.body});
    } else{
      res.json({success: 'put call succeed!', url: req.url, data: data})
    }
  });
});

/************************************
* HTTP post method for insert object *
*************************************/
function verifyToken(req, res, next) {
  const bearerHeader = req.headers['x-chm-authorization'];
  if (bearerHeader) {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    // Forbidden
    res.statusCode = 403;
    res.json({error: 'Missing X-Chm-Authorization header', url: req.url, body: req.body});
  }
}

app.post(path, verifyToken, function(req, res) {
  let dataFromJwt;
  if (userIdPresent) {
    req.body['userId'] = req.apiGateway.event.requestContext.identity.cognitoIdentityId || UNAUTH;
    dataFromJwt = getUserNameFromJwt(req.token);
  }
  dataFromJwt.then((claim) => {
    req.body['shopId'] = claim.userName;
    let putItemParams = {
      TableName: tableName,
      Item: req.body
    }
    dynamodb.put(putItemParams, (err, data) => {
      if(err) {
        res.statusCode = 500;
        res.json({error: err, url: req.url, body: req.body});
      } else{
        res.json({success: 'post call succeed!', url: req.url, data: data})
      }
    });
  
  });
});

/************************************
* HTTP post method for insert objects transactionally *
*************************************/
app.post(`${path}/save`, verifyToken, function(req, res) {
  let dataFromJwt;
  if (userIdPresent) {
    req.body['userId'] = req.apiGateway.event.requestContext.identity.cognitoIdentityId || UNAUTH;
    dataFromJwt = getUserNameFromJwt(req.token);
  }
  dataFromJwt.then((claim) => {
    req.body.categories['shopId'] = claim.userName;
    req.body.menuItems['shopId'] = claim.userName;

    let params = {
      TransactItems: [{
        Put: {
          TableName : tableName,
          Item: req.body.categories,
        }
      }, {
        Put: {
          TableName: tableName,
          Item: req.body.menuItems,
        }
      }]
    };

    dynamodb.transactWrite(params, (err, data) => {
      if(err) {
        res.statusCode = 500;
        res.json({error: err, url: req.url, body: req.body});
      } else{
        res.json({success: 'post call succeed!', url: req.url, data: data})
      }
    });
  });
});

/************************************
* HTTP post method for unpublish category transactionally *
*************************************/
app.post(`${path}/unpublish`, verifyToken, function(req, res) {
  let dataFromJwt;
  if (userIdPresent) {
    req.body['userId'] = req.apiGateway.event.requestContext.identity.cognitoIdentityId || UNAUTH;
    dataFromJwt = getUserNameFromJwt(req.token);
  }
  dataFromJwt.then((claim) => {
    let params = {
      TransactItems: [{
        Put: {
          TableName : tableName,
          Item: {
            "shopId": claim.userName,
            "SK": "PluginMenuPages",
            "categories": req.body.categories,
          },
        }
      }, {
        Update: {
          TableName: tableName,
          Key: {
            shopId: claim.userName,
            SK: 'PluginUnpublishedMenuPages',
          },
          UpdateExpression: 'SET #c = list_append(if_not_exists(#c, :empty_list), :vals)',
          ExpressionAttributeNames: {'#c': 'categories'},
          ExpressionAttributeValues: {
            ':empty_list': [],
            ':vals': [req.body.unpublishedCategory],
          }
        }
      }
    ]};
    dynamodb.transactWrite(params, (err, data) => {
      if(err) {
        res.statusCode = 500;
        res.json({error: err, url: req.url, body: req.body});
      } else{
        res.json({success: 'post call succeed!', url: req.url, data: data})
      }
    });
  });
});

/************************************
* HTTP post method for publish category transactionally *
*************************************/
app.post(`${path}/publish`, verifyToken, function(req, res) {
  let dataFromJwt;
  if (userIdPresent) {
    req.body['userId'] = req.apiGateway.event.requestContext.identity.cognitoIdentityId || UNAUTH;
    dataFromJwt = getUserNameFromJwt(req.token);
  }
  dataFromJwt.then((claim) => {
    let params = {
      TransactItems: [{
        Put: {
          TableName : tableName,
          Item: {
            "shopId": claim.userName,
            "SK": "PluginUnpublishedMenuPages",
            "categories": req.body.categories,
          },
        }
      }, {
        Update: {
          TableName: tableName,
          Key: {
            shopId: claim.userName,
            SK: 'PluginMenuPages',
          },
          UpdateExpression: 'SET #c = list_append(if_not_exists(#c, :empty_list), :vals)',
          ExpressionAttributeNames: {'#c': 'categories'},
          ExpressionAttributeValues: {
            ':empty_list': [],
            ':vals': [req.body.publishedCategory],
          }
        }
      }
    ]};
    dynamodb.transactWrite(params, (err, data) => {
      if(err) {
        res.statusCode = 500;
        res.json({error: err, url: req.url, body: req.body});
      } else{
        res.json({success: 'post call succeed!', url: req.url, data: data})
      }
    });
  });
});

/**************************************
* HTTP remove method to delete object *
***************************************/

app.delete(path + '/object' + hashKeyPath + sortKeyPath, verifyToken, function(req, res) {
  let dataFromJwt;
  var params = {};
  if (userIdPresent && req.apiGateway) {
    // params[partitionKeyName] = req.apiGateway.event.requestContext.identity.cognitoIdentityId || UNAUTH;
    params[partitionKeyName] = req.params[partitionKeyName];
    dataFromJwt = getUserNameFromJwt(req.token);
  } else {
    params[partitionKeyName] = req.params[partitionKeyName];
    try {
      params[partitionKeyName] = convertUrlType(req.params[partitionKeyName], partitionKeyType);
    } catch(err) {
      res.statusCode = 500;
      res.json({error: 'Wrong column type ' + err});
    }
  }
  if (hasSortKey) {
    try {
      params[sortKeyName] = convertUrlType(req.params[sortKeyName], sortKeyType);
    } catch(err) {
      res.statusCode = 500;
      res.json({error: 'Wrong column type ' + err});
    }
  }

  dataFromJwt.then((claim) => {
    params[partitionKeyName] = claim.userName;
    let removeItemParams = {
      TableName: tableName,
      Key: params
    }
    dynamodb.delete(removeItemParams, (err, data) => {
      if(err) {
        res.statusCode = 500;
        res.json({error: err, url: req.url});
      } else{
        res.json({success: 'delete call succeed!', url: req.url, data: data})
      }
    });
  
  });
});

/************************************
* HTTP post method for delete objects transactionally *
*************************************/
app.post(`${path}/delete`, verifyToken, function(req, res) {
  let dataFromJwt;
  if (userIdPresent) {
    req.body['userId'] = req.apiGateway.event.requestContext.identity.cognitoIdentityId || UNAUTH;
    dataFromJwt = getUserNameFromJwt(req.token);
  }
  dataFromJwt.then((claim) => {
    req.body.categories[partitionKeyName] = claim.userName;
    req.body.deletedCategoryName[partitionKeyName] = claim.userName;

    let params = {
      TransactItems: [{
        Put: {
          TableName : tableName,
          Item: req.body.categories,
        }
      }, {
        Delete: {
          TableName: tableName,
          Key: req.body.deletedCategoryName,
        }
      }]
    };

    dynamodb.transactWrite(params, (err, data) => {
      if(err) {
        res.statusCode = 500;
        res.json({error: err, url: req.url, body: req.body});
      } else{
        res.json({success: 'post call succeed!', url: req.url, data: data})
      }
    });
  });
});

app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
