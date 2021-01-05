import * as React from 'react';

import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { useTranslate } from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';
import logoImage from '../dashboard/logo_white.svg';

const useStyles = makeStyles(theme => ({
    label: { width: '10em', display: 'inline-block' },
    button: { margin: '1em' },
    root: {
      background:
          theme.palette.type === 'dark'
              ? '#535353'
              : `#000000`,
              // : `url(${backgroundImage}) no-repeat #6f4ceb`,
      color: '#fff',
      padding: 20,
      marginTop: theme.spacing(2),
      marginBottom: '1em',
    },
    media: {
        background: `url(${logoImage}) top right / cover`,
        marginLeft: 'auto',
        marginTop: '4em',
    },
    actions: {
        [theme.breakpoints.down('md')]: {
            padding: 0,
            flexWrap: 'wrap',
            '& a': {
                marginTop: '1em',
                marginLeft: '0!important',
                marginRight: '1em',
            },
        },
    },
}));

const Help = () => {
    const translate = useTranslate();
    const classes = useStyles();
    return (
      <>
        <Card className={classes.root}>
            <Box display="flex">
                <Box flex="1">
                    <Typography variant="h5" component="h2" gutterBottom>
                        {translate('pos.help.manual')}<br /><br />
                        {translate('pos.help.instruction')}
                    </Typography>
                    <Box maxWidth="40em">
                      <a href="https://drive.google.com/drive/folders/1LQUiTPAbxPveHCuiaMrdQx3LrxH8vIav" target="_blank" rel="noreferrer noopener">
                        <Typography variant="body1" component="p" style={{color: 'white'}} gutterBottom>
                            {translate('pos.help.linkToManual')}
                        </Typography>
                      </a>
                    </Box>
                </Box>
            </Box>
        </Card>

        <Card className={classes.root}>
            <Box display="flex">
                <Box flex="1">
                    <Typography variant="h5" component="h2" gutterBottom>
                        {translate('pos.help.changelog')}
                    </Typography>
                    <Box maxWidth="40em">
                      <Typography variant="body1" component="ul" style={{color: 'white'}} gutterBottom>
                        <li>NEW FEATURE: enable adding description to individual menu item</li>
                        <li>NEW FEATURE: enable changing indiviual menu item to unavailable</li>
                        <li>NEW FEATURE: enable deleting image</li>
                        <li>NEW FEATURE: enable malay, english and chinese multi language support</li>
                        <li>NEW FEATURE: enable help page to add manual link and changelogs</li>
                        <li>NEW FEATURE: enable creating duplicated menu item</li>
                        <li>FIX BUGS: menu item icon updated</li>
                        <li>FIX BUGS: general bug fixes and refactoring</li>
                      </Typography>
                    </Box>
                </Box>
            </Box>
        </Card>

      </>
    );
};

export default Help;