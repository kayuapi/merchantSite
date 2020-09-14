import * as React from 'react';
import { FC } from 'react';
import { Box, Card, CardActions, Button, Typography } from '@material-ui/core';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import FacebookIcon from '@material-ui/icons/Facebook';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslate } from 'react-admin';

import logoImage from './logo_white.svg';

interface Props {
  user?: string;
}

const useStyles = makeStyles(theme => ({
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

const Welcome: FC<Props> = ({ user }) => {
    const translate = useTranslate();
    const classes = useStyles();
    return (
        <Card className={classes.root}>
            <Box display="flex">
                <Box flex="1">
                    <Typography variant="h5" component="h2" gutterBottom>
                        {translate('pos.dashboard.welcome.hi')}, {user}! <br /><br />
                        {translate('pos.dashboard.welcome.title')}
                    </Typography>
                    <Box maxWidth="40em">
                        <Typography variant="body1" component="p" gutterBottom>
                            {translate('pos.dashboard.welcome.subtitle')}
                        </Typography>
                    </Box>
                    <CardActions className={classes.actions}>
                        <Button
                            variant="contained"
                            href="https://m.me/chmbox"
                            startIcon={<FacebookIcon />}
                        >
                            {translate('pos.dashboard.welcome.contact_by_facebook_button')}
                        </Button>
                        <Button
                            variant="contained"
                            href="https://wa.me/+60125281994?text=I'm%20intereste%20in%20this%20product%2C%20please%20tell%20me%20more%20about%20it."
                            startIcon={<WhatsAppIcon />}
                        >
                            {translate('pos.dashboard.welcome.contact_by_whatsapp_button')}
                        </Button>
                    </CardActions>
                </Box>

                <Box
                    display={{ xs: 'none', sm: 'none', md: 'block' }}
                    width="15em"
                    overflow="hidden"
                >
                    <Box height="9em" width="15em" className={classes.media} />
                </Box>
            </Box>
        </Card>
    );
};

export default Welcome;
