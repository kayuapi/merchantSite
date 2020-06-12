import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
  button: {
    marginLeft: "auto",
  },
}));

export default function ToggleButtons(props) {
  const classes = useStyles();
  const {imageDisplayType, setImageDisplayType} = props;
  const handleImageDisplayType = (event, newImageDisplayType) => {
    setImageDisplayType(newImageDisplayType);
  };

  return (
    <>
    <Box display="flex" justifyContent="flex-start">
      <ToggleButtonGroup
        value={imageDisplayType}
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
        disabled
        variant="contained"
        color="primary"
        size="small"
        className={classes.button}
        startIcon={<SaveIcon />}
      >
        Save Display Type
      </Button>
    </Box>
    </>
  );
}