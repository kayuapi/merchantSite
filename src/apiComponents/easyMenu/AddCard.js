import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import { makeStyles } from '@material-ui/core/styles';
import Add from '@material-ui/icons/Add';

const useStyles = makeStyles(theme => ({
  root: {
    // maxWidth: 345,
    marginRight: '1rem',
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
          <Add /><br /><br />Click to add dishes
        {/* </IconButton> */}
      </CardActionArea>
    </Card>
  )
}
export default AddCard;
