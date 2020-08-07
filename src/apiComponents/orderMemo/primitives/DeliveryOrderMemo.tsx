import * as React from 'react';
import { FC } from 'react';

import { DeliveryOrder } from '../types';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
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
    backgroundColor: 'aliceblue',
    width: '100%',
    minWidth: '275px',
    maxWidth: '360px',
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
  deleteOrder,
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
          Order received time: {new Date(createdAt).toLocaleString()}
        </Typography>
        <Typography variant="h5" component="h2">
          {firstName} {lastName} 
        </Typography>
        <Typography variant="body2" component="p">
          <span>PS: {postscript}</span>
          <br />
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
          {/* use index as key because assumption of static list here, might change in future */}
          {orderedItems && orderedItems.map((orderedItem, index) => {
            const labelId = `checkbox-list-label-${index}`;
            return (
            <ListItem key={index} role={undefined} dense>
              <ListItemText id={labelId} primary={orderedItem.name} secondary={orderedItem.variant} />
              <ListItemText id={labelId} primary={orderedItem.quantity} />
            </ListItem>
            );
          })}
        </List>
      </CardContent>
      </Card>
      <Button variant="contained" className={classes.button} onClick={deleteOrder}>Fulfill</Button>
    </Grid>
  );
};

export default DeliveryOrderMemo;
