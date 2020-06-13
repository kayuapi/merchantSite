// added wrapper style and change label to inputbase
// src: https://codesandbox.io/s/addanddelete-tabs-mui-howk8?file=/src/AddAndDeleteTab.js

import React, { useState, useEffect, memo } from "react";
import { AppBar, Tab, Grid, Button, InputBase } from "@material-ui/core";
import Add from "@material-ui/icons/Add";
import Close from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/styles";
import { useFormContext, useFieldArray, Controller } from "react-hook-form";
import TabList from '@material-ui/lab/TabList';
import TabContext from '@material-ui/lab/TabContext';
import { Auth, API } from 'aws-amplify';
import { IconButton } from '@material-ui/core';
import { CircularProgress } from '@material-ui/core';
import Container from '@material-ui/core/Container';
// import { DevTool } from "react-hook-form-devtools";
// I was stuck at deleting Tab, however, I found this thread from Rahul-RB on git
// https://gist.github.com/Rahul-RB/273dbb24faf411fa6cc37488e1af2415
// Since I am building an app with react hook only,
// I tried converting it to React Hooks and its works like this

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    marginTop: "60px",
    width: "100%",
    backgroundColor: "#fff"
  },
  appBar: {
    color: "inherit",
    backgroundColor: "a09b87",
    top: '55px', // hard coded need to be changed
    "& .myTab": {
      backgroundColor: "yellow",
      color: "green"
    }
  },
  gridContainer: {
    // maxWidth: '700px'
  },
  tabRoot: {
    minWidth: 100,
    width: 120,
  },
  myTab2: {
    flexDirection: "row-reverse",
    color: "white"
  },
  tabInput: {
    color: "white"
  },
  addPageButton: {
    color: "white",
    padding: 0,
  },
  tabsContainer: {
    //if not set then flickering because it takes upper container width (grid) which is responsive
    maxWidth: "100vw"
  },
}));


const AddAndDeleteTabContainer = ({ children }) => {
  console.log('AddAndDeleteTabContainer: render fields...');

  const methods = useFormContext();

  return <AddAndDeleteTab {...methods} children={children} />;
};

const AddAndDeleteTab = memo(({ reset, control, getValues, formState: { dirty }, children }) => {
  // fixed window functionality
  const tabsRef = React.useRef();
  
  const classes = useStyles();
  // const { handleSubmit, reset, control } = useForm();
  // const { reset, control } = useFormContext();
  // const [tabLoaded, setTabLoaded] = useState(false);
  const [pageNames, setPageNames] = useState({loaded: false, data: []});
  const [tabValue, setTabValue] = useState('0');
  const [scrollBtn, setScrollBtn] = useState("off");
  console.log('AddAndDeleteTab: render fields...');
  // const [myFields, setMyFields] = useState([]);

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
            const path = `${basePath}/${currentUserInfo.id}/PluginMenuPages`;
            const pageNamesResponse = await API.get(apiName, path, myInit);
            console.log('pageNamesResponse', pageNamesResponse);
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

  // fixed window functionality
  function updateScrollButton() {
    const container = tabsRef.current;
    if (!container) {
      return;
    }
    const containerWidth = container.clientWidth;
    const tabs = Array.from(container.getElementsByTagName("button"));
    const tabWidth = tabs.reduce((a, b) => a + b.clientWidth, 0);
    const newScrollButtons = tabWidth > containerWidth ? "on" : "off";
    if (scrollBtn !== newScrollButtons) {
      setScrollBtn(newScrollButtons);
    }
        
  }

  useEffect(() => {
    updateScrollButton();
  });

  // fixed window functionality
  useEffect(()=> {
    window.addEventListener("resize", updateScrollButton);
    return () => {
      window.removeEventListener("resize", updateScrollButton);
    }
    
  })

  // useEffect(() => {
  //   reset({menuPage: {categories: pageNames}});
  //   console.log('PAGENAMES', pageNames);
  // }, [pageNames, reset]);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "menuPage.categories"
  });

  const handleTabChange = (event, newValue) => {
    console.log('handleTabChange: newValue', newValue);
    setTabValue(newValue);
  };
  
  //for debug purpose
  useEffect(() => {
    // setMyFields(fields);
    console.log('AddAndDeleteTab: debug fields @after effect ',fields);
    console.log('AddAndDeleteTab: debug fields @after effect ',getValues());
  }, [fields, getValues]);

  // const [tabList, setTabList] = useState([
  //   {
  //     key: 0,
  //     id: 0
  //   }
  // ]);


  // const addTab = () => {
  //   let id = tabList[tabList.length - 1].id + 1;
  //   setTabList([...tabList, { key: id, id: id }]);
  // };

  const deleteTab = (index) => {
    remove(index);
  };

  const addTab = (e) => {
    e.stopPropagation();
    append({value: "New category"});
    setTabValue(fields.length.toString());
    setPageNames({
      ...pageNames, 
      data: [...pageNames.data, "New category"]
    })
  };

  const MyCloseIcon = React.forwardRef((props, ref) => {

    return (
      <Close id={props.index.toString()} onClick={
        (e)=>{
          e.stopPropagation();
          // console.log('log e', e.target.id);
          // console.log('log index', props.index);
          setTabValue('0');
          setPageNames({
            ...pageNames,
            data: pageNames.data.filter((el, ind) => ind !== props.index)
          });
          console.log('addanddeletetab: ***',pageNames.data.filter((el, ind) => ind !== props.index))
          // console.log('log tabValue', tabValue);
          deleteTab(props.index);

        }      
      } />
    )
  });

  return (
    <>
      {!pageNames.loaded && <CircularProgress />}
      {pageNames.loaded &&
        <>
          <TabContext value={tabValue}>
            <AppBar position="sticky" className={classes.appBar}>
              
              <Grid className={classes.gridContainer} container alignItems="center" justify="center">
                <Grid item xl={1} lg={1} md={1} sm={1} xs={1}>
                  <IconButton className={classes.addPageButton} onClick={addTab} aria-label="add page">
                    <Add />
                  </IconButton>
                </Grid>
                <Grid item xl={11} lg={11} md={11} sm={11} xs={11}>
                  <div ref={tabsRef} className={classes.tabsContainer}>
                  <TabList
                    onChange={handleTabChange}
                    variant="scrollable"
                    aria-label="simple tabs example"
                    scrollButtons={scrollBtn}
                  >
                    {fields.map((tab, index) => {
                      console.log("********", tab);
                      return(
                        <Tab
                          key={tab.id}
                          value={index.toString()}
                          label={<Controller 
                                    // key={tab.id}
                                    as={InputBase}
                                    // name={`menuPages[${index}]`}
                                    name={`menuPage.categories[${index}].value`}
                                    // name="menuPages"
                                    control={control}
                                    classes={{root: classes.tabInput}}
                                    // defaultValue={`menuPages[${index}].value`}
                                    // defaultValue={fields[`${index}`].value}
                                    defaultValue={tab.value}
                                    />}
                          // icon={<Close id={tab.id} onClick={deleteTab} />}
                          icon={<MyCloseIcon index={index} />}
                          classes={{ root: classes.tabRoot, wrapper: classes.myTab2 }}
                        />

                      )
                      }
                      )}
                  </TabList>
                  </div>
                </Grid>
              </Grid>
            </AppBar>
            {/* {console.log("important important", fields)} */}
            {children(pageNames.data)}
          </TabContext>
        </>
      }
    </>
  );
}
// (prevProps, nextProps) => prevProps.formState.dirty === nextProps.formState.dirty

);

export default AddAndDeleteTabContainer;
