import React, { useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import BannerInput from './BannerInput';
import ImageDisplayTypeSelection from './ImageDisplayTypeSelection';
import { makeStyles } from '@material-ui/core/styles';
import { useForm } from 'react-hook-form';
import { Auth, API } from 'aws-amplify';
import CircularProgress from '@material-ui/core/CircularProgress';
import { DevTool } from "react-hook-form-devtools";

const useStyles = makeStyles(theme => ({
    button: {
      'margin': theme.spacing(1),
    },
    root: {
      flexGrow: 1,
      width: '100%',
      bottom: theme.spacing(10),
    },
    cardGrid: {
      paddingTop: theme.spacing(5),
      paddingBottom: theme.spacing(5),
      height: '100%',
      padding: '0 0 0 0',
    },
    input: {
      width: 'auto',
      color: 'white',
    },
    iconButton: {
      color: 'white',
    }
  }
));

// async function getJwtToken() {
//   const jwtToken = (await Auth.currentSession()).getIdToken().getJwtToken();
//   console.log(jwtToken);
//   return jwtToken;
// }

async function submitData() {
  const apiName = 'amplifyChmboxOrderingApi';
  const basePath = '/uiplugin';
  try {
    const myInit = {
      headers: {
        'X-Chm-Authorization': `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`, 
      },
      body: {
        SK: `Banner`
      },
      response: false
    };
    const path = `${basePath}`;
    const pageSubmissionResponse = await API.post(apiName, path,  myInit);
    console.log('pageSubmissionResponse', pageSubmissionResponse);
    return pageSubmissionResponse;
  }
  catch(err) {
    console.log('api response error', err.response);
  }
}

async function grabFromDb(item) {
  const apiName = 'amplifyChmboxOrderingApi';
  const basePath = '/uiplugin/object';
  try {
    const myInit = {
      headers: {
        // 'X-Chm-Authorization': `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`, 
      },
      response: false
    };

    const currentUserInfo = await Auth.currentUserInfo();
    const path = `${basePath}/${currentUserInfo.username}/${item}`;
    const retrievedItem = await API.get(apiName, path, myInit);
    console.log('retrievedItem', retrievedItem);
    return retrievedItem;
  }
  catch(err) {
    console.log('api response error', err.response);
  }
}

const Banner = props => {
  console.log('rendering banner...');

  const classes = useStyles();
  const [imageDisplayType, setImageDisplayType] = useState('contain');
  const [isLoading, setIsLoading] = useState(true);
  const [currentBanner, setCurrentBanner] = useState('');s

  useEffect(()=> {
    console.log('effect ran');
    console.log('imageDisplayType', imageDisplayType);
    console.log('isLoading', isLoading);
    console.log('currentBanner', currentBanner);
    grabFromDb('Banner').then((retrievedItem)=> {
      setIsLoading(false);
      setCurrentBanner(retrievedItem.image);
      setImageDisplayType(retrievedItem.imageDisplayType);
    });
  }, [currentBanner, imageDisplayType, isLoading]);
  
  return (
    <div className={classes.root}>        
      <Container className={classes.cardGrid} maxWidth="sm">
          ***FEATURE IN DEVELOPMENT***<br />
          *****PREVIEW & COMING SOON*****<br /><br />
        {isLoading && <CircularProgress />}
        {!isLoading && currentBanner &&
          <form>
            <ImageDisplayTypeSelection imageDisplayType={imageDisplayType} setImageDisplayType={setImageDisplayType} />
            <img height="150px" width="100%" style={{objectFit: imageDisplayType}} alt={currentBanner} src={currentBanner} />
          </form>
        }
        {!isLoading && !currentBanner &&
          <>
            <ImageDisplayTypeSelection imageDisplayType={imageDisplayType} setImageDisplayType={setImageDisplayType} />
            <BannerInput imageDisplayType={imageDisplayType} loadingData={isLoading} />
          </>
        }
      </Container>
    </div>
  )
};

export default Banner;
