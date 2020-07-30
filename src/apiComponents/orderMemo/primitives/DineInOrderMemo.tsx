import * as React from 'react';
import { FC } from 'react';

import { fetchUtils } from 'react-admin';

import { DineInOrder } from '../types';

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
    height: '100%',
  },
  button: {
    // marginBottom: theme.spacing(20),
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
}
));


const OrderMemo: FC<DineInOrder> = ({
  createdAt,
  shopId,
  orderId,
  fulfillmentMethod,
  status,
  paymentMethod,
  postscript,
  orderedItems,
  tableNumber,
}) => {
  const classes = useStyles();
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
          {<span>Table {tableNumber}</span>}
        </Typography>
        <Typography variant="body2" component="p">
          <span>PS: {postscript}</span>
          <br />
        </Typography>
        <List>
          {/* use index as key because assumption of static list here, might change in future */}
          {orderedItems &&  orderedItems.map((orderedItem,index) => {
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
      <Button className={classes.button}>Cancel</Button>
      <Button className={classes.button}>Fulfill</Button>
    </Grid>
  );
};

export default OrderMemo;
