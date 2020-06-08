import React from 'react';
import {
    List,
    useTranslate,
} from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  ticket: {
    width: '155px',
    'max-width': '155px',
  },
  im: {
    'max-width': 'inherit',
    width: 'inherit',
  },
  centered: {
    'text-align': 'center',
    'align-content': 'center',
  }
});

const Qrslip = props => {
  const classes = useStyles();
  return (
    <div className={classes.ticket}>
      <img className={classes.im} src={require("./logo.jpg")} alt="Logo" />
        <p class="centered">Guo Ba
	  <br />No.2, Ground Floor, Jln Perniagaan Bakri 3,
	  <br />Tmn Pusat Perniagaan Bakri,
          <br />Jln Bakri</p>
      <img className={classes.im} src={props.im} alt="Logo" />
      <p class="centered">Thanks for your order!
	  <br />chmbox ordering</p>
    </div>
  );
}

export default Qrslip;

