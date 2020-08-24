import * as React from 'react';
import { FC } from 'react';


import { DineInOrder } from '../types';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Checkbox from '@material-ui/core/Checkbox';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { useNotify } from 'react-admin';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import CopyToClipboardIcon from '@material-ui/icons/Assignment';

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
  deleteOrder,
}) => {
  const classes = useStyles();
  const notify = useNotify();
  let textArea = document.createElement('textarea');
  let tableTextArea = document.createElement('textarea');
  tableTextArea.value = tableNumber;

  function copyOrderItemsClipBoard() {
    // console.log(textArea.value);
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    notify("pos.notification.order_memo_copied", 'info');
    textArea.remove();
  }
  function copyTableClipBoard() {
    // console.log(nameTextArea.value);
    document.body.appendChild(tableTextArea);
    tableTextArea.select();
    document.execCommand('copy');
    notify("pos.notification.order_memo_copied", 'info');
    tableTextArea.remove();
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
          {<span>Table {tableNumber}</span>}
          <Tooltip title="add table number to clipboard">
            <IconButton onClick={copyTableClipBoard} size='medium'>
              <CopyToClipboardIcon fontSize='small' />
            </IconButton>
          </Tooltip>
        </Typography>
        <Typography variant="body2" component="p">
          <span>PS: {postscript}</span>
          <br />
        </Typography>
        <List>
          {/* use index as key because assumption of static list here, might change in future */}
          {orderedItems &&  orderedItems.map((orderedItem,index) => {
            const labelId = `checkbox-list-label-${index}`;
            textArea.value += orderedItem.name + ', '; 
            textArea.value += orderedItem.quantity + ', '; 
            return (
            <ListItem key={index} role={undefined} dense>
              <ListItemIcon>
                <Checkbox
                    edge="start"
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={orderedItem.name} secondary={orderedItem.variant} />
              <ListItemText id={labelId} primary={orderedItem.quantity} />
            </ListItem>
            );
          })}
        </List>
        {orderedItems && 
        (<Tooltip title="add ordered items to clipboard">
          <IconButton onClick={copyOrderItemsClipBoard} size='medium'>
            <CopyToClipboardIcon fontSize='small' />
          </IconButton>
        </Tooltip>)}
      </CardContent>
      </Card>
      <Button variant="contained" className={classes.button} onClick={deleteOrder}>Fulfill</Button>
    </Grid>
  );
};

export default OrderMemo;
