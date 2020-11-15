import * as React from 'react';
import { FC } from 'react';

import { DeliveryOrder } from '../types';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
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

import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';

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
  const notify = useNotify();

  let whatsappLink;
  if (phoneNumber) {
    whatsappLink = 'https://wa.me/' + phoneNumber;
  }
  let textArea = document.createElement('textarea');
  let nameTextArea = document.createElement('textarea');
  let addressTextArea = document.createElement('textarea');
  let phoneNumberTextArea = document.createElement('textarea');
  nameTextArea.value = firstName;
  addressTextArea.value = deliveryAddress;
  if (phoneNumber) {
    phoneNumberTextArea.value = phoneNumber;
  }

  function copyOrderItemsClipBoard() {
    // console.log(textArea.value);
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    notify("pos.notification.order_memo_copied", 'info');
    textArea.remove();
  }
  function copyPhoneNumberClipBoard() {
    // console.log(textArea.value);
    document.body.appendChild(phoneNumberTextArea);
    phoneNumberTextArea.select();
    document.execCommand('copy');
    notify("pos.notification.order_memo_copied", 'info');
    phoneNumberTextArea.remove();
  }
  function copyNameClipBoard() {
    // console.log(nameTextArea.value);
    document.body.appendChild(nameTextArea);
    nameTextArea.select();
    document.execCommand('copy');
    notify("pos.notification.order_memo_copied", 'info');
    nameTextArea.remove();
  }
  function copyAddressClipBoard() {
    // console.log(addressTextArea.value);
    document.body.appendChild(addressTextArea);
    addressTextArea.select();
    document.execCommand('copy');
    notify("pos.notification.order_memo_copied", 'info');
    addressTextArea.remove();
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
          <Tooltip title="add name to clipboard">
            <IconButton onClick={copyNameClipBoard} size='medium'>
              <CopyToClipboardIcon fontSize='small' />
            </IconButton>
          </Tooltip>
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
              <Tooltip title="add phone number to clipboard">
                <IconButton onClick={copyPhoneNumberClipBoard} size='medium'>
                  <CopyToClipboardIcon fontSize='small' />
                </IconButton>
              </Tooltip>
              <br />
            </>
          )}
          <span> Delivered to: {deliveryAddress}</span>
          <Tooltip title="add address to clipboard">
            <IconButton onClick={copyAddressClipBoard} size='medium'>
              <CopyToClipboardIcon fontSize='small' />
            </IconButton>
          </Tooltip>
        </Typography>
        <Typography variant="body2" component="p">
          <span>**{paymentMethod}**</span>
          <br />
          <span>Delivery date: {deliveryDate}</span>
          {deliveryTime && <span>, {new Date(`1994-03-21T${deliveryTime}`).toLocaleTimeString()}</span>}
          <br />
        </Typography>

        <List>
          {/* use index as key because assumption of static list here, might change in future */}
          {orderedItems && orderedItems.map((orderedItem, index) => {
            const labelId = `checkbox-list-label-${index}`;
            const labelId2 = `checkbox2-list-label-${index}`;
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
                <Checkbox
                  edge="start"
                  tabIndex={-1}
                  disableRipple
                  icon={<StarBorderIcon />} checkedIcon={<StarIcon />}
                  inputProps={{ 'aria-labelledby': labelId2 }}
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

export default DeliveryOrderMemo;
