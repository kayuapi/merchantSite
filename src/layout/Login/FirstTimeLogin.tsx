import * as React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { Field, withTypes } from 'react-final-form';


import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import { createMuiTheme, makeStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { useLocation, useHistory } from 'react-router-dom';
import { Notification } from 'react-admin';
import { useTranslate, useLogin, useNotify } from 'ra-core';
import { lightTheme } from '../themes';
import { Auth } from 'aws-amplify';

const useStyles = makeStyles(theme => ({
    main: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        alignItems: 'center',
        justifyContent: 'flex-start',
        // background: 'url(https://source.unsplash.com/random/1600x900)',
        background: 'aliceblue',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
    },
    card: {
        minWidth: 300,
        marginTop: '6em',
    },
    avatar: {
        margin: '1em',
        display: 'flex',
        justifyContent: 'center',
    },
    icon: {
        backgroundColor: theme.palette.secondary.main,
        width: theme.spacing(20),
        height: theme.spacing(20),
    },
    hint: {
        marginTop: '1em',
        display: 'flex',
        justifyContent: 'center',
        color: theme.palette.grey[500],
        textAlign: 'center',
    },
    form: {
        padding: '0 1em 1em 1em',
    },
    input: {
        marginTop: '1em',
    },
    actions: {
        padding: '0 1em 1em 1em',
    },
}));

const renderInput = ({
    meta: { touched, error } = { touched: false, error: undefined },
    input: { ...inputProps },
    ...props
}) => (
    <TextField
        error={!!(touched && error)}
        helperText={touched && error}
        {...inputProps}
        {...props}
        fullWidth
    />
);

interface FormValues {
    username?: string;
    password?: string;
    newPassword?: string;
    newPasswordConfirm?: string;
    email?: string;
}

const { Form } = withTypes<FormValues>();


function validateEmail(email:string) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

const Login = () => {
    const [loading, setLoading] = useState(false);
    const [cognitoUser, setCognitoUser] = useState('');
    const translate = useTranslate();
    const classes = useStyles();
    const notify = useNotify();
    const login = useLogin();
    const location = useLocation<{ nextPathname: string } | null>();

    const [newPasswordChallenge, setNewPasswordChallenge] = useState(false);
    const [requiredAttributes, setRequiredAttributes] = useState<String[]>([]);
    const history = useHistory();
    const handleSubmit = (auth: FormValues) => {
        
        setLoading(true);
        // const { username, password }: {username: string, password: string} = auth;
        if (!newPasswordChallenge) {
          try {
            Auth.signIn(auth.username as string, auth.password as string).then(user => {
              setCognitoUser(user);
              const { challengeName, challengeParam: { requiredAttributes = [] } = {} } = user;
              if (challengeName === 'NEW_PASSWORD_REQUIRED') {
                setNewPasswordChallenge(true);
                setLoading(false);
                setRequiredAttributes(requiredAttributes);
              } else {
                // eslint-disable-next-line no-throw-literal
                throw ({code: 'NotFirstTimeLoginException', message: 'not first time login'});
              }
            }).catch(error => {
              setLoading(false);
              if (error.code === 'NotAuthorizedException') {
                notify(error.message, 'error');
              } else if (error.code === 'NotFirstTimeLoginException') {
                history.push('/');
              }
            });  
          } catch (error) {
          }
        } else if (newPasswordChallenge) {
          Auth.completeNewPassword(cognitoUser, auth.newPassword as string,{email: auth.email}).then(user => {
            history.push('/');
          });
        }

        // login(auth, location.state ? location.state.nextPathname : '/').then(result => {
        //   console.log('result', result);
        //   handleChallenges(result);
        // }).catch(
        //     (error: Error) => {
        //         console.log('err', error);
        //         setLoading(false);
        //         notify(
        //             typeof error === 'string'
        //                 ? error
        //                 : typeof error === 'undefined' || !error.message
        //                 ? 'ra.auth.sign_in_error'
        //                 : error.message,
        //             'warning'
        //         );
        //     }
        // );
    };

    const validate = (values: FormValues) => {
        const errors: FormValues = {};
        if (!newPasswordChallenge) {
          if (!values.username) {
            errors.username = translate('ra.validation.required');
          }
          if (!values.password) {
              errors.password = translate('ra.validation.required');
          }
        } else if (newPasswordChallenge) {
          if (requiredAttributes.includes('email')) {
            if (!values.email) {
              errors.email = translate('ra.validation.required');
            } else {
              if (!validateEmail(values.email)) {
                errors.email = "Invalid email format";
              }
            }  
          }
          if (!values.newPassword) {
            errors.newPassword = translate('ra.validation.required');
          }
          if (!values.newPasswordConfirm) {
            errors.newPasswordConfirm = translate('ra.validation.required');
          }

          if (values.newPassword !== values.newPasswordConfirm) {
            errors.newPasswordConfirm = "Not matching password";
          }
        }
        return errors;
    };

    return (
        <Form
            onSubmit={handleSubmit}
            validate={validate}
            render={({ handleSubmit }) => (
                <form onSubmit={handleSubmit} noValidate>
                    <div className={classes.main}>
                        <Card className={classes.card}>
                            <div className={classes.avatar}>
                                <Avatar variant="rounded" alt="logo" className={classes.icon} src={process.env.PUBLIC_URL + '/logo192.png'}>
                                  {/* <img alt={'logo'} src={process.env.PUBLIC_URL + '/logo192.png'} /> */}
                                </Avatar>
                            </div>
                            <div className={classes.hint}>
                                CHM Ordering System
                                <br />
                                v 2.0.8
                                <br />
                            </div>
                            <div className={classes.form}>
                                {!newPasswordChallenge && 
                                  <>
                                    <div className={classes.input}>
                                        <Field
                                            autoFocus
                                            name="username"
                                            // @ts-ignore
                                            component={renderInput}
                                            label={"Username (case sensitive)"}
                                            disabled={loading}
                                        />
                                    </div>
                                    <div className={classes.input}>
                                        <Field
                                            name="password"
                                            // @ts-ignore
                                            component={renderInput}
                                            label={translate('ra.auth.password')}
                                            type="password"
                                            disabled={loading}
                                        />
                                    </div>
                                  </>
                                }
                                {requiredAttributes.includes("email") && 
                                  <div className={classes.input}>
                                      <Field
                                          // autoFocus
                                          name="email"
                                          // @ts-ignore
                                          component={renderInput}
                                          label={"Email"}
                                          disabled={loading}
                                      />
                                  </div>
                                }
                                {newPasswordChallenge && 
                                  <>
                                    <div className={classes.input}>
                                        <Field
                                            autoFocus
                                            name="newPassword"
                                            // @ts-ignore
                                            component={renderInput}
                                            label={"New password"}
                                            type="password"
                                            disabled={loading}
                                        />
                                    </div>
                                    <div className={classes.input}>
                                        <Field
                                            name="newPasswordConfirm"
                                            // @ts-ignore
                                            component={renderInput}
                                            label={"confirm new password"}
                                            type="password"
                                            disabled={loading}
                                        />
                                    </div>
                                  </>
                                }
                            </div>
                            <CardActions className={classes.actions}>
                              {!newPasswordChallenge && 
                                <Button
                                    variant="contained"
                                    type="submit"
                                    color="primary"
                                    disabled={loading}
                                    fullWidth
                                >
                                    {loading && (
                                        <CircularProgress
                                            size={25}
                                            thickness={2}
                                        />
                                    )}
                                    {translate('ra.auth.sign_in')}
                                </Button>
                              }
                              {newPasswordChallenge && 
                                <Button
                                    variant="contained"
                                    type="submit"
                                    color="primary"
                                    disabled={loading}
                                    fullWidth
                                >
                                  {loading && (
                                      <CircularProgress
                                          size={25}
                                          thickness={2}
                                      />
                                  )}
                                  Confirm
                                </Button>
                              }

                            </CardActions>
                        </Card>
                        <Notification />
                    </div>
                </form>
            )}
        />
    );
};

Login.propTypes = {
    authProvider: PropTypes.func,
    previousRoute: PropTypes.string,
};

// We need to put the ThemeProvider decoration in another component
// Because otherwise the useStyles() hook used in Login won't get
// the right theme
const FirstTimeLoginWithTheme = (props: any) => (
    <ThemeProvider theme={createMuiTheme(lightTheme)}>
        <Login {...props} />
    </ThemeProvider>
);

export default FirstTimeLoginWithTheme;