import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import {
    useTranslate,
    useDataProvider,
    Loading,
    Error
} from 'react-admin';
import { fetchUtils } from 'react-admin';


import PropTypes from 'prop-types';
import { connect, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';

import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import CommentIcon from '@material-ui/icons/Comment';




const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    height: '100%',
  },
  cardGrid: {
    backgroundColor: theme.palette.background.paper,
  },
  button: {
    marginBottom: theme.spacing(2),
  },
}
));




const Order = (props) => {

  // const {title， phone_number, type, address, ...orderItems} = props;
  var orderId;
  if (props.details) {
    var details = Object.keys(props.details).reduce((pV, cV)=> {
      pV.push(cV+':'+props.details[cV]);
      if (cV === 'order_number')
        orderId=props.details[cV]
      return pV;
    },[]);
  }

  const classes = useStyles();
  const [checked, setChecked] = React.useState([0]);

  const handleToggle = value => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };
  if (details) {
    return (
      <Grid item xs={12} sm={12} md={4} className={classes.root}>
        <List className={classes.cardGrid}>
          {details.map(value => {
            const labelId = `checkbox-list-label-${value}`;

            return (
              <ListItem key={value} role={undefined} dense button onClick={handleToggle(value)}>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={checked.indexOf(value) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': labelId }}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={value} />
              </ListItem>
            );
          })}
        </List>
        <Button className={classes.button} onClick={()=>props.onDelete(props.firestore, props.businessId, orderId)}>Delete</Button>
      </Grid>    
    )
  } else {
    return null;
  }
  // return (
  //   details && 
  //     (<Grid item xs={6} sm={6} md={4}>
  //       <List className={classes.root}>
  //         {details.map(value => {
  //           const labelId = `checkbox-list-label-${value}`;

  //           return (
  //             <ListItem key={value} role={undefined} dense button onClick={handleToggle(value)}>
  //               <ListItemIcon>
  //                 <Checkbox
  //                   edge="start"
  //                   checked={checked.indexOf(value) !== -1}
  //                   tabIndex={-1}
  //                   disableRipple
  //                   inputProps={{ 'aria-labelledby': labelId }}
  //                 />
  //               </ListItemIcon>
  //               <ListItemText id={labelId} primary={value} />
  //             </ListItem>
  //           );
  //         })}
  //       </List>
  //       <Button className={classes.button} onClick={()=>props.onDelete(props.firestore, props.businessId, orderId)}>Delete</Button>
  //     </Grid>
  //   )
  // )
};

export default Order;
