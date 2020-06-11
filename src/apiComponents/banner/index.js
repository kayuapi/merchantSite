import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import BannerInput from './BannerInput';
import ImageDisplayTypeSelection from './ImageDisplayTypeSelection';
import { makeStyles } from '@material-ui/core/styles';
import { useForm } from 'react-hook-form';
import { Auth, API } from 'aws-amplify';

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
    const jwtToken = (await Auth.currentSession()).getIdToken().getJwtToken();
    console.log('jwtToke', jwtToken);
    const myInit = {
      headers: {
        'X-Chm-Authorization': `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`, 
      },
      body: {
        shopId: `testingABCD`, 
        SK: `TESTING2`, 
        items: jwtToken
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


const Banner = props => {
    const classes = useStyles();
    const [imageDisplayType, setImageDisplayType] = useState('contain'); 
    const { setValue } = useForm();
    submitData();


    return (
      <div className={classes.root}>
        <form>
        <Container className={classes.cardGrid} maxWidth="sm">
            ***FEATURE IN DEVELOPMENT***<br />
            *****PREVIEW & COMING SOON*****<br /><br />
            <ImageDisplayTypeSelection imageDisplayType={imageDisplayType} setImageDisplayType={setImageDisplayType} />
            <BannerInput imageDisplayType={imageDisplayType} writeValue={setValue} />
        </Container>
        </form>
      </div>
    )
};

export default Banner;
