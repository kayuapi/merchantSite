import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import BannerInput from './BannerInput';
import ImageDisplayTypeSelection from './ImageDisplayTypeSelection';
import { makeStyles } from '@material-ui/core/styles';
import { useForm } from 'react-hook-form';
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
const Banner = props => {
    const classes = useStyles();
    const [imageDisplayType, setImageDisplayType] = useState('contain'); 
    const { setValue } = useForm();
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
