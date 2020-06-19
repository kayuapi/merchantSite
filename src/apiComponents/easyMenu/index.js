import React, { useState, useEffect } from 'react';
// import { Route } from 'react-router-dom';
// import Typography from '@material-ui/core/Typography';
// import {
//     useTranslate,
//     useDataProvider,
//     Loading,
//     Error
// } from 'react-admin';
// import { useSelector } from 'react-redux';
// import ButtonBase from '@material-ui/core/ButtonBase';
// import AppBar from '@material-ui/core/AppBar';
// import Tab from '@material-ui/core/Tab';
// import TabContext from '@material-ui/lab/TabContext';
// import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
// import { useAuthenticated } from 'react-admin';
import MenuEditWithForm from './MenuEditWithForm';
// import InputBase from '@material-ui/core/InputBase';
// import Tabs from '@material-ui/core/Tabs';
// import Box from '@material-ui/core/Box';
import { DevTool } from "react-hook-form-devtools";
import { useForm, FormContext } from "react-hook-form";
// import Icon from '@material-ui/core/Icon';
import SaveIcon from '@material-ui/icons/Save';
// import { API, Auth } from 'aws-amplify';
import AddAndDeleteTab from './AddAndDeleteTab';
import ToggleButton from '@material-ui/lab/ToggleButton';
import { API, Auth } from 'aws-amplify';
import DraggableTabs from './DraggableTabs';

// import * as md from 'react-tabtab/lib/themes/material-design';
const useStyles = makeStyles(theme => ({
  button: {
    'margin': theme.spacing(1),
    
  },
  buttonContainer: {
    'position': 'sticky',
    top: 0,
    left: 'auto',
    right: 0,
    background: 'ghostwhite',
    zIndex: 2
  },
  root: {
    flexGrow: 1,
    width: '100%',
    bottom: theme.spacing(10),
  },
  appBar: {
    display: 'flex',
    flexDirection: 'row',
    // flex: '1 1 auto',
  },
  cardGrid: {
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5),
    height: '100%',
    padding: '0 0 0 0',
  },
  input: {
    width: 'auto',
    color: 'white',
  },
  iconButton: {
    color: 'white',
  }
}
));

// function a11yProps(index) {
//   return {
//     id: `simple-tab-${index}`,
//     'aria-controls': `simple-tabpanel-${index}`,
//   };
// }
export async function submitPage(items, pageId) {
  const apiName = 'amplifyChmboxOrderingApi';
  const basePath = '/uiplugin';
  items.forEach(element => {
    element.uiLocation.x = Number(element.uiLocation.x);
    element.uiLocation.y = Number(element.uiLocation.y);
    element.uiLocation.w = Number(element.uiLocation.w);
    element.uiLocation.h = Number(element.uiLocation.h);
  });
  try {
    const myInit = {
      headers: {
        'X-Chm-Authorization': `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`, 
      },
      body: {
        SK: `PluginMenu#${pageId}`, 
        items: items
      },
      response: false
    };  
    const path = `${basePath}`;
    const response = await API.post(apiName, path,  myInit);
    console.log('pageSubmissionResponse', response);
    return response;
  }
  catch(err) {
    console.log('api response error', err.response);
  }
}

export async function submitPageNames(pageNames) {
  // const processedPageNames = pageNames.map(item=>item.value);
  const processedPageNames = pageNames.map(item=>item);
  const apiName = 'amplifyChmboxOrderingApi';
  const basePath = '/uiplugin';
  try {
    const myInit = {
      headers: {
        'X-Chm-Authorization': `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`, 
      },
      body: {
        SK: 'PluginMenuPages', 
        pageNames: processedPageNames
      },
      response: false
    };  
    const path = `${basePath}`;
    const response = await API.post(apiName, path,  myInit);
    return response;
  }
  catch(err) {
    console.log('api response error', err.response);
  }
}

async function saveData(data, setIsSubmitting) {
  setIsSubmitting(true);
  const pageNamesResponse = await submitPageNames(data.menuPage.categories);
  const pageResponse = await submitPage(data.menuPage.items, data.menuPage.pageId);
  console.log('pageNaemsResponse', pageNamesResponse);
  console.log('pageResponse', pageResponse);
  if (pageNamesResponse.success && pageResponse.success) {
    setIsSubmitting(false);
  }
}


const handleSortCategoryModeToggle = (pageNames, isSortCategoryModeOn, setIsSortCategoryModeOn, setIsSubmittingCategory) => {
  console.log('isSortCategoryModeOn', isSortCategoryModeOn);

  if(!isSortCategoryModeOn) {
    setIsSortCategoryModeOn(!isSortCategoryModeOn);
    console.log('isSortCategoryModeOn', isSortCategoryModeOn);
  } else {
    setIsSubmittingCategory(true);
    console.log('PAGENAME2', pageNames);
    
    submitPageNames(pageNames.data).then(pageNamesResponse => {
      if (pageNamesResponse.success) {
        setIsSubmittingCategory(false);
        setIsSortCategoryModeOn(!isSortCategoryModeOn);
      }
    })

  }
};

const EasyMenuPageShow = props => {    
    const classes = useStyles();
    const methods = useForm();
    const { reset } = methods;
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmittingCategory, setIsSubmittingCategory] = useState(false);
    const [isSortCategoryModeOn, setIsSortCategoryModeOn] = useState(false);
    const [pageNames, setPageNames] = useState({loaded: false, data: []});

    useEffect(() => {
      const myInit = {
          headers: {
          },
          response: false
      };
      async function grabPageNames() {
          const apiName = 'amplifyChmboxOrderingApi';
          const basePath = '/uiplugin/object';
          try {
              const currentUserInfo = await Auth.currentUserInfo();
              const path = `${basePath}/${currentUserInfo.username}/PluginMenuPages`;
              const pageNamesResponse = await API.get(apiName, path, myInit);
              // setPageNames(pageNamesResponse.pageNames);
              reset({menuPage: {categories: pageNamesResponse.pageNames}});
              setPageNames({loaded: true, data: pageNamesResponse.pageNames});
          }
          catch(err) {
              console.log('pageNames api response error', err.response);
          }
      }
      console.log('reseted');
      grabPageNames();
    }, [reset]);




    console.log('easymenu rendering');
    console.log('isSortCategoryModeOn', isSortCategoryModeOn);
    const onSubmit = data => {console.log("data", data); saveData(data, setIsSubmitting)};
    return (
      <div className={classes.root}>
        <Container className={classes.cardGrid} maxWidth="md">
          <FormContext {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <div className={classes.buttonContainer}>
              <Button
                disabled={ isSubmitting }
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                className={classes.button}
                startIcon={<SaveIcon />}
              >
                {isSubmitting && <span>Saving...</span>}
                {!isSubmitting && <span>Save page</span>}
              </Button>
              <ToggleButton
                value="check"
                selected={isSortCategoryModeOn}
                onChange={() => handleSortCategoryModeToggle(pageNames, isSortCategoryModeOn, setIsSortCategoryModeOn, setIsSubmittingCategory)}
              >
                {isSortCategoryModeOn && <span>Sort Category Mode: On</span>}
                {isSortCategoryModeOn && isSubmittingCategory && <span>Submitting...</span>}
                {!isSortCategoryModeOn && <span>Sort Category Mode: Off</span>}
              </ToggleButton>
              </div>

              {isSortCategoryModeOn && <DraggableTabs tabs={pageNames} setPageNames2={setPageNames} />}

              <AddAndDeleteTab formMethods={methods} pageNames={pageNames} setPageNames={setPageNames} isSortCategoryModeOn={isSortCategoryModeOn}>
                {(pageNames) => (<>
                    <TabPanel value="0"><MenuEditWithForm pageNames={pageNames} pageId="Page1" /></TabPanel> 
                    <TabPanel value="1"><MenuEditWithForm pageNames={pageNames} pageId="Page2" /></TabPanel>
                    <TabPanel value="2"><MenuEditWithForm pageNames={pageNames} pageId="Page3" /></TabPanel>
                    <TabPanel value="3"><MenuEditWithForm pageNames={pageNames} pageId="Page4" /></TabPanel>
                    <TabPanel value="4"><MenuEditWithForm pageNames={pageNames} pageId="Page5" /></TabPanel>
                    <TabPanel value="5"><MenuEditWithForm pageNames={pageNames} pageId="Page6" /></TabPanel> 
                    <TabPanel value="6"><MenuEditWithForm pageNames={pageNames} pageId="Page7" /></TabPanel>
                    <TabPanel value="7"><MenuEditWithForm pageNames={pageNames} pageId="Page8" /></TabPanel>
                    <TabPanel value="8"><MenuEditWithForm pageNames={pageNames} pageId="Page9" /></TabPanel>
                    <TabPanel value="9"><MenuEditWithForm pageNames={pageNames} pageId="Page10" /></TabPanel>
                  </>
                )}

              </AddAndDeleteTab>
            </form>
          </FormContext>
        </Container>
        <DevTool control={methods.control} />
      </div>
    )
};

export default EasyMenuPageShow;
