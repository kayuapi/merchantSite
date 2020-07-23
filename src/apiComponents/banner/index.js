import React, { useState, useEffect, useReducer } from 'react';
import Container from '@material-ui/core/Container';
import BannerInput from './BannerInput';
import ImageDisplayTypeSelection from './ImageDisplayTypeSelection';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { grabFromDb, grabUploadingPath } from './utils/request';

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

function init(initialState) {
  return {
    _banner: initialState._banner,
    _bannerDisplayType: initialState._bannerDisplayType,
    banner: initialState.banner,
    bannerDisplayType: initialState.bannerDisplayType ? initialState.bannerDisplayType : 'cover',
  }
};

const initialState = {
  _banner: false,
  _bannerDisplayType: false,
  banner: false,
  bannerDisplayType: false,
};

function reducer(state, action) {
  switch (action.type) {
    case 'initialStateLoaded':
      return init(initialState);
    case 'changeBannerDisplayType':
      return {
        ...state,
        bannerDisplayType: action.payload.bannerDisplayType,
      };
    case 'imageLoaded':
      return {
        ...state,
        banner: action.payload.banner,
      };
    case 'imageSaved':
      return {
        _bannerDisplayType: action.payload.bannerDisplayType,
        _banner: action.payload.banner,
        bannerDisplayType: action.payload.bannerDisplayType,
        banner: action.payload.banner,
      };  
    default:
      throw new Error();
  }
}

const Banner = ({props}) => {
  const [state, dispatch] = useReducer(reducer, initialState, init);
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(true);
  const [uploadedImagePath, setUploadedImagePath] = useState('');

  useEffect(()=> {
    grabUploadingPath().then(uploadingPath => setUploadedImagePath(uploadingPath));
    grabFromDb('Banner').then(({banner, bannerDisplayType})=> {
      setIsLoading(false);
      if (!banner && !bannerDisplayType) {
        dispatch({
          type: 'initialStateLoaded'
        });  
      } else {
        dispatch({
          type: 'imageSaved', 
          payload: {
            bannerDisplayType,
            banner
          }
        });
      }
    });
  }, []);
  
  return (
    <div className={classes.root}>
      <Container className={classes.cardGrid} maxWidth="sm">
        {isLoading && <CircularProgress />}
        {!isLoading && 
          <>
            <ImageDisplayTypeSelection
              localState={state} 
              dispatch={dispatch} 
            />          
            <BannerInput 
              uploadedImagePath={uploadedImagePath}
              _banner={state._banner}
              banner={state.banner} 
              bannerDisplayType={state.bannerDisplayType} 
              dispatch={dispatch} 
            />          
          </>
        }
      </Container>
    </div>
  )
};

export default Banner;
