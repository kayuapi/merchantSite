import React, { useState, useEffect } from 'react';
import CategoryTabs from './CategoryTabs';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import MenuItemsPanel from './MenuItemsPanel';
import { useForm, FormContext } from "react-hook-form";

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

const EasyMenuPageShow = props => {    
    const classes = useStyles();
    const methods = useForm();
    console.log('easymenu rendering');
    return (
      <div className={classes.root}>
        <FormContext {...methods}>
          <form>
            <Container className={classes.cardGrid} maxWidth="md">
              <CategoryTabs>
                <MenuItemsPanel />
              </CategoryTabs>
            </Container>
          </form>
        </FormContext>
      </div>
    )
};

export default EasyMenuPageShow;
