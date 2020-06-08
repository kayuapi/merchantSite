import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Add from '@material-ui/icons/Add';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 345,
    height: '100%',
    display: 'flex',
    'flex-direction': 'column',
    'justify-content': 'space-between',
    textAlign: 'center',
    backgroundColor: theme.palette.background.paper,
  },
  center: {
    height: '100%',
  }
}));

export function AddCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea className={classes.center} onClick={props.onClick}>
        {/* <IconButton aria-label="add item"> */}
          <Add />
        {/* </IconButton> */}
      </CardActionArea>
    </Card>
  )
}
export default AddCard;
