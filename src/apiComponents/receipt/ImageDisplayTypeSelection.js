import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import Box from '@material-ui/core/Box';
import { API, Auth } from 'aws-amplify';

const useStyles = makeStyles((theme) => ({
  button: {
    marginLeft: "auto",
  },
}));


export default function ToggleButtons(props) {
  const classes = useStyles();
  const {image, currentImageDisplayType, isDirty, dispatch} = props;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleImageDisplayType = (event, newImageDisplayType) => {
    dispatch({type: 'changeCurrentImageDisplayType', payload: newImageDisplayType });
  };

  async function submitDisplayTypeChange(image, imageDisplayType) {
    setIsSubmitting(true);
    const apiName = 'amplifyChmboxOrderingApi';
    const basePath = '/uiplugin';
    try {
      const myInit = {
        headers: {
          'X-Chm-Authorization': `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`, 
        },
        body: {
          SK: 'Banner',
          image: image,
          imageDisplayType: imageDisplayType 
        },
        response: false
      };  
      const path = `${basePath}`;
      const response = await API.post(apiName, path,  myInit);
      if (response.success) {
        setIsSubmitting(false);
        dispatch({
          type: 'savedCurrentImageDisplayType'
        });  
      }
    }
    catch(err) {
      setIsSubmitting(false);
      console.log('api response error', err.response);
    }
  }
  
  return (
    <>
    <Box display="flex" justifyContent="flex-start">
      <ToggleButtonGroup
        value={currentImageDisplayType}
        exclusive
        onChange={handleImageDisplayType}
        aria-label="image display type"
      >
        <ToggleButton value="contain" aria-label="left aligned">
          A: contain
        </ToggleButton>
        <ToggleButton value="cover" aria-label="centered">
          B: cover
        </ToggleButton>
        <ToggleButton value="fill" aria-label="right aligned">
          C: fill
        </ToggleButton>
      </ToggleButtonGroup>
      <Button
        disabled={isSubmitting || !isDirty}
        variant="contained"
        color="primary"
        size="small"
        className={classes.button}
        startIcon={<SaveIcon />}
        onClick={()=>submitDisplayTypeChange(image, currentImageDisplayType)}
      >
        {!isSubmitting && isDirty && <span>Save</span>}
        {!isSubmitting && !isDirty && <span>Saved</span>}
        {isSubmitting && <span>Saving...</span>}

      </Button>
    </Box>
    </>
  );
}