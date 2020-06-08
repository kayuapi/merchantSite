import React from 'react';
import {
    List,
    useTranslate,
} from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
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
  },
  button: {
    'margin': theme.spacing(1),
    // '@media print': {
    //     display: 'none !important',
    // },
  },
  '@media print': {
    'body *': {
        visibility: 'hidden',
    },
    '#section-to-print, #section-to-print *': {
        visibility: 'visible',
    },
    '#section-to-print': {
        position: 'absolute',
        left: 0,
        top: 0,
    }    
  },
//   @media print: {
//     .hidden-print,
//     .hidden-print * {
//         display: none !important;
//     },
}
));

const handleClick = () => {
    var mywindow = window.open('', 'PRINT', 'height=400,width=600');

    mywindow.document.write('<html><head><title>' + document.title  + '</title>');
    mywindow.document.write('</head><body >');
    mywindow.document.write('<h1>' + document.title  + '</h1>');
    console.log(document.getElementById('section-to-print').innerHTML)
    mywindow.document.write(document.getElementById('section-to-print').innerHTML);
    mywindow.document.write('</body></html>');

    mywindow.document.close(); // necessary for IE >= 10
    mywindow.focus(); // necessary for IE >= 10*/

    mywindow.print();
    mywindow.close();

    console.log('print');


}

const Qrslip = props => {
  const classes = useStyles();
  return (
    <>
      <div id="section-to-print" >
          <div className={classes.ticket}>
            <img className={classes.im} src={props.im} alt="Logo" />
          </div>
      </div>
    </>
  );
}

export default Qrslip;

