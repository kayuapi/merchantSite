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

export const withHookHoc = (Component) => {
  return (props) => {

    const classes = useStyles();
    const [loaded, setLoaded] = useState(false);
    const { handleSubmit, register, reset, getValues } = useFormContext();
    console.log('withHookHoc rendering... props', props);
    console.log('withHookHoc rendering... rhf getvalues', getValues());
    const { fields, append, remove } = useFieldArray({
      name: "menuPage.items"
    });

    useEffect(()=> {
      const myInit = {
        headers: {
        },
        response: false
      };
      async function grabPage() {
        const apiName = 'amplifyChmboxOrderingApi';
        const basePath = '/uiplugin/object';
        try {
          const currentUserInfo = await Auth.currentUserInfo();
          const path = `${basePath}/${currentUserInfo.id}/PluginMenu%23${props.pageId}`;
          const page = await API.get(apiName, path, myInit);
          if (page.items) {
            reset({
              menuPage: {
                categories: props.pageNames,
                items: page.items
              }
            });  
          } else {
            reset({
              menuPage: {
                categories: props.pageNames,
                items: []
              }
            });            
          }
          console.log('withHookHoc: pageAPIResponse', page);
          console.log('withHookHoc: getValues', getValues());
          setLoaded(true);
          // await API.post(apiName, '/uiplugin', {body: {shopId: `${currentUserInfo.id}12`, SK: 'PluginMenu#Page11', category: 'test'}});
        }
        catch(err) {
          console.log('api response error', err.response);
        }
      }
      console.log('loaded page categories from internet...')
      grabPage();
    }, [props.pageNames, props.pageId, reset, getValues]);



    //for debug purpose
    useEffect(() => {
      console.log('withHookHoc: debug fields',fields);
    }, [fields]);

    return (
      <Container className={classes.cardGrid} maxWidth="sm">
        {!loaded && <CircularProgress />}
        {loaded && 
          <Component 
            handleSubmit={handleSubmit} 
            register={register} 
            reset={reset} 
            // control={control} 
            fields={fields} 
            append={append} 
            remove={remove} 
            {...props} />
        }
      </Container>
    )
  }
};
