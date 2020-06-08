import React from 'react';
// import {
//     useTranslate,
//     useDataProvider,
//     Loading,
//     Error
// } from 'react-admin';
// import { useSelector } from 'react-redux';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import { useAuthenticated } from 'react-admin';
// import { fetchUtils } from 'react-admin';

import StorageInput from './StorageInput';

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
  },
}
));

const PlaygroundPageShow = props => {
    useAuthenticated();
    console.log('playgroundpage rendering ...');
    const classes = useStyles();
    return (
      <div className={classes.root}>
        <Container className={classes.cardGrid} maxWidth="lg">   
          <StorageInput />         
        </Container>
      </div>
    )
};

export default PlaygroundPageShow;
