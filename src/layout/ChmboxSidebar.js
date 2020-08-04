import * as React from 'react';
import { Sidebar } from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';
import lodashGet from 'lodash/get';


export const DRAWER_WIDTH = 240;
export const CLOSED_DRAWER_WIDTH = 55;
const useSidebarStyles = makeStyles(
  theme => ({
      drawerPaper: {
          position: 'relative',
          height: 'auto',
          overflowX: 'hidden',
          boxShadow: '2px 4px 18px rgba(0, 0, 0, 0.08)',
          width: props =>
              props.open
                  ? lodashGet(theme, 'sidebar.width', DRAWER_WIDTH)
                  : lodashGet(
                        theme,
                        'sidebar.closedWidth',
                        CLOSED_DRAWER_WIDTH
                    ),
          transition: theme.transitions.create('width', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
          }),
          backgroundColor: 'transparent',
          marginTop: '0.5em',
          borderRight: 'none',
          [theme.breakpoints.only('xs')]: {
              marginTop: 0,
              height: '100vh',
              position: 'inherit',
              backgroundColor: theme.palette.background.default,
          },
          [theme.breakpoints.up('md')]: {
              border: 'none',
              marginTop: '1.5em',
          },
          zIndex: 'inherit',
      },
  }),
  { name: 'ChmSidebar' }
);

const ChmboxSidebar = (props) => {
  const classes = useSidebarStyles();
  return (
      <Sidebar classes={classes} {...props} />
  );
};

export default ChmboxSidebar;