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

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';

import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import CommentIcon from '@material-ui/icons/Comment';

import WhatsAppIcon from '@material-ui/icons/WhatsApp';


const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    minWidth: 275,
    height: '100%',
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    'flex-direction': 'column',
    'justify-content': 'space-between',

  },
  cardGrid: {
    marginBottom: theme.spacing(5),
  },
  button: {
    marginBottom: theme.spacing(20),
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
}
));




const OrderMemo = (props) => {

  // const {title， phone_number, type, address, ...orderItems} = props;
  var orderId;
  const { 
    order_number,
    first_name, 
    last_name,            
    phone_number,
    table_number, 
    delivery_option, 
    delivery_address, 
    pickup_date, 
    pickup_time, 
    delivery_date,
    vehicle_plate_number,
    payment_method,
    received_order_time,
    ...orderItems
  } = props.details
  orderId = order_number;
  const whatsappLink = 'https://wa.me/6' + phone_number;
  if (orderItems) {
    var details = Object.keys(orderItems).reduce((pV, cV)=> {
      pV.push(cV+':'+orderItems[cV]);
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
        <Grid item xs={12} sm={12} md={4} className={classes.cardGrid}>
            <Card className={classes.root}>
              <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                  {order_number} : {delivery_option}
                  <br />
                  Order received time: {received_order_time}
                </Typography>
                <Typography variant="h5" component="h2">
                  {first_name} {last_name} 
                  {table_number && <span> - Table {table_number}</span>}
                  {vehicle_plate_number && <span> - Vehicle {vehicle_plate_number}</span>} 
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                  <a href={whatsappLink}><WhatsAppIcon /></a>
                  {phone_number}
                  <br />
                  {delivery_address && <span> Delivered to: {delivery_address}</span>}
                </Typography>
                <Typography variant="body2" component="p">
                  {payment_method && <span>**{payment_method}**</span>}
                  <br />
                  {pickup_date && <span>Pickup date and time: {pickup_date}, {pickup_time}</span>}
                  {delivery_date && <span>Delivery date: {delivery_date}</span>}
                  <br />
                  
                </Typography>
                <List>
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
              </CardContent>
            </Card>
            <Button className={classes.button} onClick={()=>props.onDelete(props.firestore, props.businessId, orderId)}>Delete</Button>
        </Grid>    
    )
  } else {
    return null;
  }
};

export default OrderMemo;
