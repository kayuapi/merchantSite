import * as React from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { useTranslate, useLocale, useSetLocale, Title } from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
    label: { width: '10em', display: 'inline-block' },
    button: { margin: '1em' },
});

const Configuration = () => {
    const translate = useTranslate();
    const locale = useLocale();
    const setLocale = useSetLocale();
    const classes = useStyles();
    return (
        <Card>
            <Title title={translate('pos.configuration')} />
            <CardContent>
                <div className={classes.label}>{translate('pos.language')}</div>
                <Button
                    variant="contained"
                    className={classes.button}
                    color={locale === 'en' ? 'primary' : 'default'}
                    onClick={() => setLocale('en')}
                >
                    english
                </Button>
                <Button
                    variant="contained"
                    className={classes.button}
                    color={locale === 'cn' ? 'primary' : 'default'}
                    onClick={() => setLocale('cn')}
                >
                    中文
                </Button>
                <Button
                    variant="contained"
                    className={classes.button}
                    color={locale === 'ms' ? 'primary' : 'default'}
                    onClick={() => setLocale('ms')}
                >
                  melayu
                </Button>
            </CardContent>
        </Card>
    );
};

export default Configuration;