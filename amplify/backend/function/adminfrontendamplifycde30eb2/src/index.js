/* Amplify Params - DO NOT EDIT
	ANALYTICS_ADMINFRONTENDAMPLIFY_ID
	ANALYTICS_ADMINFRONTENDAMPLIFY_REGION
	ENV
	REGION
Amplify Params - DO NOT EDIT */
const AWS = require('aws-sdk')
const region = process.env.ANALYTICS_ADMINFRONTENDAMPLIFY_REGION
const applicationId = process.env.ANALYTICS_ADMINFRONTENDAMPLIFY_ID

// take in userId
function CreateUserMessageRequest(userId, title, message) {
  const action = 'URL';
  const url = 'https://admin.partners.chmbox.tech';
  const priority = 'high';
  const ttl = 30;
  const silent = false;
  let messageRequest = {
    'MessageConfiguration': {
      'APNSMessage': {
        'Action': action,
        'Body': message,
        'Priority': priority,
        'SilentPush': silent,
        'Title': title,
        'TimeToLive': ttl,
        'Url': url
      },
      'GCMMessage': {
        'Action': action,
        'Body': message,
        'Priority': priority,
        'SilentPush': silent,
        'Title': title,
        'TimeToLive': ttl,
        'Url': url
      }
    }  
  }

  const toUser = {
    [userId]: {}
  };
  messageRequest['Users'] = toUser;
  return messageRequest
}

const handle_insert = (record) => {
  const newImage = record.dynamodb.NewImage;
  const orderId = newImage.orderId.S;
  const shopId = newImage.shopId.S;
  const title = 'Ding-dong! Incoming Order.'
  const message = `You have a new order. Order number: ${orderId}.`
  const pinpoint = new AWS.Pinpoint({apiVersion: '2016-12-01', region: region});
  const userMessageRequests = {
    "ApplicationId" : applicationId,
    "SendUsersMessageRequest": CreateUserMessageRequest(shopId, title, message),
  }
  const sendUsersMessagesPromise = pinpoint.sendUsersMessages(userMessageRequests).promise();
  return sendUsersMessagesPromise;
}

exports.handler = event => {
  //eslint-disable-line
  console.log(JSON.stringify(event, null, 2));
  event.Records.forEach(record => {
    console.log(record.eventID);
    console.log(record.eventName);
    console.log('DynamoDB Record: %j', record.dynamodb);
    if (record.eventName === 'INSERT') {
      handle_insert(record).then(result => {
        console.log('result', result);
        return Promise.resolve(result);
      }).catch(err => console.log('final err', err));
    }
  });
  // return Promise.resolve('Successfully processed DynamoDB record');
};
