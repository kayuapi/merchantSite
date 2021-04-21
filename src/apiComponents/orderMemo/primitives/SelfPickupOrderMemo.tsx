import * as React from 'react';
import { FC, Fragment } from 'react';

import { SelfPickupOrder, MenuItem } from '../types';
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

interface ISomeObject {
  [key: string]: string|number;
}

function extractItemsFromCartItems(cartItems: MenuItem[]) {
  const items = cartItems.reduce((acc: ISomeObject, obj) => {
    const key = `${obj.name}(${obj.variant})`;
    acc[key] = `(${obj.quantity})`;
    return acc;
  }, {});
  return items;
}

const whatsappStringifyOrder = (orders:MenuItem[]) =>
  `***Orders:***\r\n${JSON.stringify(extractItemsFromCartItems(orders))
    .slice(1, -1)
    .replace(/\(undefined\)/g, '')
    .replace(/\(null\)/g, '')
    .replace(/"/g, '')
    .replace(/\$\$\$/g, ',subtotal:')
    .replace(/,/g, '\r\n\r\n')}`;

const SelfPickupOrderMemo: FC<SelfPickupOrder> = ({
  createdAt,
  shopId,
  orderId,
  fulfillmentMethod,
  status,
  customAttributeField1,
  customAttributeField2,
  storeFrontSideTotalPrice,
  paymentMethod,
  postscript,
  orderedItems,
  firstName,
  lastName,
  phoneNumber,
  pickupDate,
  pickupTime,
  vehiclePlateNumber,
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
  let phoneNumberTextArea = document.createElement('textarea');
  nameTextArea.value = firstName;
  if (phoneNumber) {
    phoneNumberTextArea.value = phoneNumber;
  }

  let myPickupDate = '';
  let myPickupTime = '';
  if (pickupTime) {
    myPickupDate = new Date(pickupDate.replace(/T.*/, '')).toLocaleDateString();
    myPickupTime = new Date(`${pickupDate}T${pickupTime}`).toLocaleTimeString();
  } else {
    myPickupDate = new Date(pickupDate.replace(/T.*/, '')).toLocaleDateString();
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
  
  function sendWhatsapp(phoneNumber: string) {
    const totalPriceTextToSend = storeFrontSideTotalPrice ? `\r\n\r\nTotal: RM ${storeFrontSideTotalPrice.replace(/[^0-9.-]+/g,'')}`: '';
    const textToSend = encodeURIComponent(`**Checklist / 清单** ${totalPriceTextToSend}\r\n\r\n${whatsappStringifyOrder(orderedItems)}${totalPriceTextToSend}\r\n\r\n***Info/资料:***\r\nPayment Method:${paymentMethod}\r\nHp: ${phoneNumber.replace(/(^\+6)/g, '')}`);
    const windowReference = window.open('', '_blank');
    (windowReference as Window).location.href = `https://wa.me/${
      phoneNumber
    }?text=${textToSend}`;
  }

  return (
    <Grid item xs={12} sm={12} md={4} className={classes.cardGrid}>
      <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          {orderId} : {fulfillmentMethod}
          <br />
          Order received time: {new Date(createdAt).toLocaleString()}
          {customAttributeField1 && 
            <>
              <br />
              {customAttributeField1}
            </>
          }
          {customAttributeField2 && 
            <>
              <br />
              {customAttributeField2}
            </>
          }
        </Typography>
        <Typography variant="h5" component="h2">
          {firstName} {lastName}
          {vehiclePlateNumber && <span> - Vehicle {vehiclePlateNumber}</span>} 
          <Tooltip title="add name to clipboard">
            <IconButton onClick={copyNameClipBoard} size='medium'>
              <CopyToClipboardIcon fontSize='small' />
            </IconButton>
          </Tooltip>
        </Typography>
        {phoneNumber && 
          <Typography variant="h5" component="h2">
            {<span>{phoneNumber}</span>}
            <Tooltip title="send checklist via whatsapp">
              <IconButton onClick={() => sendWhatsapp(phoneNumber)} size='medium'>
                <WhatsAppIcon fontSize='small' />
              </IconButton>
            </Tooltip>
          </Typography>
        }
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
        </Typography>
        <Typography variant="body2" component="p">
          <span>**{paymentMethod}**</span>
          <br />
          {myPickupDate && <span>Pickup date and time: {myPickupDate} </span>}          
          {myPickupTime && <span>, {myPickupTime}</span>}
          <br />
        </Typography>

        <List>
          {/* use index as key because assumption of static list here, might change in future */}
          {orderedItems && orderedItems.map((orderedItem, index) => {
            const labelId = `checkbox-list-label-${index}`;
            const labelId2 = `checkbox2-list-label-${index}`;
            let variantName = '';
            if (orderedItem.variant) {
              variantName = JSON.stringify(orderedItem.variant)
                .replace(/["']/g, '')
                .replace(/[,]/g, '\n');
            }
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
              <ListItemText 
                id={labelId}
                disableTypography
                primary={orderedItem.name} 
                secondary={variantName &&
                  <Typography variant="subtitle2" color="textSecondary">
                    <span>
                      {variantName.split('\n').map((el, key) => (
                        // eslint-disable-next-line react/no-array-index-key
                        <Fragment key={key}>
                          {el}
                          <br />
                        </Fragment>
                      ))}
                    </span>
                  </Typography>                  
                } 
              />
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
        {storeFrontSideTotalPrice && <Typography style={{color: 'red'}}>Price shown on customers' side: RM {storeFrontSideTotalPrice.replace(/[^0-9.-]+/g,'')}</Typography>}
      </CardContent>
      </Card>
      <Button variant="contained" className={classes.button} onClick={deleteOrder}>Fulfill</Button>
    </Grid>
  );
};

export default SelfPickupOrderMemo;
