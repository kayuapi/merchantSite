import React, { useState, useEffect, useReducer } from 'react';
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

// async function submitData() {
//   const apiName = 'amplifyChmboxOrderingApi';
//   const basePath = '/uiplugin';
//   try {
//     const myInit = {
//       headers: {
//         'X-Chm-Authorization': `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`, 
//       },
//       body: {
//         SK: `Banner`
//       },
//       response: false
//     };
//     const path = `${basePath}`;
//     const pageSubmissionResponse = await API.post(apiName, path,  myInit);
//     console.log('pageSubmissionResponse', pageSubmissionResponse);
//     return pageSubmissionResponse;
//   }
//   catch(err) {
//     console.log('api response error', err.response);
//   }
// }

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

function init(initialState) {
  return {
    imageDisplayType: '',
    currentImageDisplayType: '',
    isLoading: true,
    currentBanner: ''  
  }
}

const initialState = {
  imageDisplayType: '',
  currentImageDisplayType: '',
  currentBanner: ''
};

function reducer(state, action) {
  switch (action.type) {
    case 'initialStateLoaded':
      return {
        imageDisplayType: action.payload.imageDisplayType,
        currentImageDisplayType: action.payload.imageDisplayType,
        image: action.payload.image
      };
    case 'changeCurrentImageDisplayType':
      return {
        ...state,
        currentImageDisplayType: action.payload
      };
    case 'savedCurrentImageDisplayType':
      return {
        ...state,
        imageDisplayType: state.currentImageDisplayType
      };
    default:
      throw new Error();
  }
}

const Banner = ({props}) => {
  const [state, dispatch] = useReducer(reducer, initialState, init);

  console.log('rendering banner...');

  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(()=> {
    console.log('effect ran');
    grabFromDb('Banner').then((retrievedItem)=> {
      setIsLoading(false);
      dispatch({
        type: 'initialStateLoaded', 
        payload: {
          currentImageDisplayType: retrievedItem.imageDisplayType,
          imageDisplayType: retrievedItem.imageDisplayType,
          image: retrievedItem.image
        }
      })
    });
  }, []);
  
  return (
    <div className={classes.root}>        
      <Container className={classes.cardGrid} maxWidth="sm">
          ***FEATURE IN DEVELOPMENT***<br />
          *****PREVIEW & COMING SOON*****<br /><br />
        {isLoading && <CircularProgress />}
        {!isLoading && state.image &&
          <form>
            <ImageDisplayTypeSelection image={state.image} currentImageDisplayType={state.currentImageDisplayType} isDirty={state.imageDisplayType !== state.currentImageDisplayType} dispatch={dispatch} />
            <img height="150px" width="100%" style={{objectFit: state.currentImageDisplayType}} alt={state.image} src={state.image} />
          </form>
        }
        {!isLoading && !state.image &&
          <>
            {/* <ImageDisplayTypeSelection currentImageDisplayType={state.currentImageDisplayType} isDirty={state.imageDisplayType !== state.currentImageDisplayType} dispatch={dispatch} /> */}
            <BannerInput imageDisplayType="fill" loadingData={isLoading} />
          </>
        }
      </Container>
    </div>
  )
};

export default Banner;
