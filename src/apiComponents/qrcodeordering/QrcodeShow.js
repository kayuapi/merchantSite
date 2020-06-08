import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import {
    useTranslate,
    useDataProvider,
    Loading,
    Error
} from 'react-admin';
import Qrslip from './QrslipSansLogo';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { fetchUtils } from 'react-admin';

const useStyles = makeStyles(theme => ({
  button: {
    'margin': theme.spacing(1),
    // '@media print': {
    //     display: 'none !important',
    // },
  },
  '@page': { 
    'size': 'auto', 
    'margin': '0mm',
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




const QrcodeShow = props => {
  const classes = useStyles();
  const dataProvider = useDataProvider();
  const [qr, setQr] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [toPrint, setToPrint] = useState(true);
  useEffect(() => {
    dataProvider.show('chmtokens/obtain', {})
      .then(({ data }) => {
        setQr(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      })
  }, []);

  const handlePrint = () => {
    var mywindow = window.open('', 'PRINT', 'height=400,width=600');

    // mywindow.document.write('<html><head><title>' + document.title  + '</title>');
    // mywindow.document.write('</head><body >');
    // mywindow.document.write('<h1>' + document.title  + '</h1>');
    // console.log(document.getElementById('section-to-print').innerHTML)
    mywindow.document.write(document.getElementById('section-to-print').innerHTML);
    // mywindow.document.write('</body></html>');

    mywindow.document.close(); // necessary for IE >= 10
    mywindow.focus(); // necessary for IE >= 10*/

    mywindow.print();
    mywindow.close();
    setToPrint(!toPrint);

}

  const generateNewQr = () => {
    const url = 'http://192.168.0.162:8000/chmtokens/obtain';
    async function callQrApi() {
      const res = await fetchUtils.fetchJson(url).then(response=>response.json);
      setQr(res);
      setToPrint(!toPrint);
    }
    callQrApi();
  }
  

  if (loading) return <Loading />;
  if (error) return <Error />;
  if (!qr) return null;
  return (
    <>
      <Qrslip im={qr.access} />
      <Button variant="contained" color="primary" className={classes.button} onClick={generateNewQr} disabled={toPrint}>
        Get New Qr Code
      </Button>
      <Button variant="contained" color="primary" className={classes.button} onClick={handlePrint} disabled={!toPrint}>
          Print Qr Code
      </Button>
      {/* <button id="btnPrint" class="hidden-print">Print</button>
      <script src="script.js"></script> */}
    </>
  )
};

export default [
  <Route exact path="/qrcode" component={QrcodeShow} />,
];

