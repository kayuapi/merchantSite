import * as React from 'react';
import { useSelector } from 'react-redux';
import { Layout, Sidebar } from 'react-admin';
import AppBar from './AppBar';
import Menu from './Menu';
import { darkTheme, lightTheme } from './themes';
import { AppState } from '../types';
import { makeStyles } from '@material-ui/core/styles';
const useSidebarStyles = makeStyles({
  drawerPaper: {
    // boxShadow: '2px 4px 18px rgba(0, 0, 0, 0.08)',
  },
});
const MySidebar = (props: any) => {
  const classes = useSidebarStyles();
  return (
      <Sidebar classes={classes} {...props} />
  );
};

const CustomSidebar = (props: any) => <Sidebar {...props} size={200} />;

export default (props: any) => {
    const theme = useSelector((state: AppState) =>
        state.theme === 'dark' ? darkTheme : lightTheme
    );
    return (
        <Layout
            {...props}
            appBar={AppBar}
            sidebar={MySidebar}
            menu={Menu}
            theme={theme}
        />
    );
};