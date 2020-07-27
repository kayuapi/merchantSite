import * as React from 'react';
import { FC } from 'react';

import { fetchUtils } from 'react-admin';

import { DeliveryOrder } from '../types';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';

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
import ListItemText from '@material-ui/core/ListItemText';

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


const DeliveryOrderMemo: FC<DeliveryOrder> = ({
  createdAt,
  shopId,
  orderId,
  fulfillmentMethod,
  status,
  paymentMethod,
  postscript,
  orderedItems,
  firstName,
  lastName,
  phoneNumber,
  deliveryDate,
  deliveryTime,
  deliveryAddress,
}) => {
  const classes = useStyles();
  let whatsappLink;
  if (phoneNumber) {
    whatsappLink = 'https://wa.me/6' + phoneNumber;
  }
  return (
    <Grid item xs={12} sm={12} md={4} className={classes.cardGrid}>
      <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          {orderId} : {fulfillmentMethod}
          <br />
          Order received time: {createdAt}
        </Typography>
        <Typography variant="h5" component="h2">
          {firstName} {lastName} 
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {phoneNumber && (
            <>
              <a href={whatsappLink}><WhatsAppIcon /></a>
              <span>{phoneNumber}</span>
              <br />
            </>
          )}
          <span> Delivered to: {deliveryAddress}</span>
        </Typography>
        <Typography variant="body2" component="p">
          <span>**{paymentMethod}**</span>
          <br />
          <span>Delivery date: {deliveryDate}</span>
          <br />
        </Typography>

        <List>
          {orderedItems.map(orderedItem => {
            const labelId = `checkbox-list-label-${orderedItem.id}`;
            return (
            <ListItem key={orderedItem.id} role={undefined} dense button>
              <ListItemText id={labelId} primary={orderedItem.name} secondary={orderedItem.variant} />
              <ListItemText id={labelId} primary={orderedItem.quantity} />
            </ListItem>
            );
          })}
        </List>
      </CardContent>
      </Card>
      <Button className={classes.button}>Cancel</Button>
      <Button className={classes.button}>Send to kitchen</Button>
    </Grid>
  );
};

export default DeliveryOrderMemo;
