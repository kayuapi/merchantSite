/*
withHookHoc.js is a HOC
It is written as a data provider to MenuEditWithForm.js, which is a class component
*/

import React, { useState, useEffect } from 'react';
import { useFieldArray, useFormContext } from "react-hook-form";
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import { API, Auth } from 'aws-amplify';
import { CircularProgress } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  cardGrid: {
    // paddingTop: theme.spacing(8),
    // paddingBottom: theme.spacing(8),
  },
}));

async function grabFromDb(item) {
  const apiName = 'amplifyChmboxOrderingApi';
  const basePath = '/uiplugin/object';
  try {
    const myInit = {
      headers: {
        // 'X-Chm-Authorization': `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`, 
      },
      response: false
    };

    const currentUserInfo = await Auth.currentUserInfo();
    const path = `${basePath}/${currentUserInfo.username}/${item}`;
    const retrievedItem = await API.get(apiName, path, myInit);
    console.log('retrievedItem', retrievedItem);
    return retrievedItem;
  }
  catch(err) {
    console.log('api response error', err.response);
  }
}


export const withHookHoc = (Component) => {
  return (props) => {

    const classes = useStyles();
    const [loaded, setLoaded] = useState(false);
    const { handleSubmit, register, reset, getValues, setValue } = useFormContext();
    const { fields, append, remove } = useFieldArray({
      name: "menuPage.items"
    });

    useEffect(()=> {
      grabFromDb(`PluginMenu%23${props.pageId}`).then((retrievedItem)=> {
        if (retrievedItem.items) {
          console.log('with hook hoc resetted with retrieved items')
          reset({
            menuPage: {
              categories: props.pageNames,
              items: retrievedItem.items
            }
          });  
        } else {
          console.log('with hook hoc resetted WITHOUT retrieved items')
          reset({
            menuPage: {
              categories: props.pageNames,
              items: []
            }
          });            
        }
        setLoaded(true);
  

      }).catch((err) => {
        console.log('api response error', err.response);
      });
    }, [props.pageNames, props.pageId, reset]);



    //for debug purpose
    // useEffect(() => {
    //   console.log('withHookHoc: debug fields',fields);
    // }, [fields]);

    return (
      <Container className={classes.cardGrid} maxWidth="sm">
        {!loaded && <CircularProgress />}
        {loaded && 
          // need to pass in react-hook-form methods because <Component /> is a class component and cannot use hook. 
          <Component 
            handleSubmit={handleSubmit} 
            register={register} 
            reset={reset} 
            // control={control} 
            fields={fields} 
            append={append} 
            remove={remove} 
            setValue={setValue}
            {...props} />
        }
      </Container>
    )
  }
};
