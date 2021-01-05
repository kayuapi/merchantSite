import React, { useState } from 'react';
import { useTranslate } from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import Box from '@material-ui/core/Box';
import { saveBannerToDb } from './utils/request';

const useStyles = makeStyles((theme) => ({
  button: {
    marginLeft: "auto",
  },
}));

export default function ToggleButtons({
  localState: {
    bannerDisplayType, 
    _bannerDisplayType, 
    banner, 
    _banner
  }, 
  dispatch
}) {
  const translate = useTranslate();
  const classes = useStyles();
  const [isSaving, setIsSaving] = useState(false);
  const isDirty = bannerDisplayType !== _bannerDisplayType || banner !== _banner;
  const handleBannerDisplayType = (event, bannerDisplayType) => {
    dispatch({
      type: 'changeBannerDisplayType', 
      payload: {
        bannerDisplayType
      }, 
    });
  };
  // <Container style={{'display': 'flex'}}>

  return (
    <>
      <Box display="flex">
        <ToggleButtonGroup
          value={bannerDisplayType}
          exclusive
          onChange={handleBannerDisplayType}
          aria-label="banner display type"
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
            disabled={!isDirty || isSaving || (!_banner && !banner)}
            variant="contained"
            color="primary"
            size="small"
            className={classes.button}
            startIcon={<SaveIcon />}
            onClick={()=>{
              setIsSaving(true);
              saveBannerToDb(banner, bannerDisplayType)
                .then(({ success }) => {
                  if (success) {
                    setIsSaving(false);
                    dispatch({
                      type: 'imageSaved', 
                      payload: {
                        bannerDisplayType,
                        banner,
                      }
                    });
                  }
                });
            }}
          >
            { !isSaving && isDirty && <span>{translate('ra.action.save')}</span> }
            { !isSaving && !isDirty && <span>{translate('pos.action.saved')}</span>}
            { isSaving && <span>{translate('pos.action.saving')}</span> }

          </Button>
      </Box>
    </>
  );
}