/**
 * How this works?
 * Upon events such as onAddItem, onRemoveItem, remove <AddCard /> by popping it off from state.items
 * Append <AddCard /> by adding it to state.items when component updates again
 * 
 */
import React, { useEffect } from "react";
import { WidthProvider, Responsive } from "react-grid-layout";
import PropTypes, { resetWarningCache } from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import _ from "lodash";
// import makeLayout from "./test-hook.jsx";
// import AdminProductDisplay from './AdminProductDisplay';
import Container from '@material-ui/core/Container';
// import { withHookHoc } from './withHookHoc';
import { CircularProgress } from '@material-ui/core';
import AddCard from '../AddCard';
import ProductDisplay from '../ProductDisplay';
import { v4 as uuidv4 } from 'uuid';
import { loadMenuItems, addMenuItem, removeMenuItem } from "./actions.js";
import { updateMenuItemsLocation } from '../MenuItemsPanel/actions';
import { createStructuredSelector } from 'reselect';
import { makeStyles } from '@material-ui/core/styles';
import { useFormContext } from 'react-hook-form';
import {
  selectMenuItems,
  selectMenuItemsLayout,
  makeSelectMenuItemsLayout,
  makeSelectMenuItems, 
  makeSelectMenuItemsWithAddItem,
  makeSelectMenuItemsLoading, 
  makeSelectMenuItemsError,
} from './selectors';
import {
  makeSelectCurrentCategoryId,
} from '../CategoryTabs/selectors';
import TabPanel from "@material-ui/lab/TabPanel";
import { store } from '../../../App';
import VariantsPopUp from "../VariantsPopUp";
const ResponsiveReactGridLayout = WidthProvider(Responsive);

const useStyles = makeStyles(theme => ({
  cardGrid: {
    // paddingTop: theme.spacing(8),
    // paddingBottom: theme.spacing(8),
  },
}));


const createElement = (el, ind, setValue) => {
  const removeStyle = {
    position: "absolute",
    right: "2px",
    top: 0,
    cursor: "pointer",
    fontSize: "x-large"
  };
  let productName;
  if (el.uiLocation) {
    productName = el.uiLocation.add ? uuidv4() : el.name;
  } else {
    productName = el.name;
    el={...el, uiLocation: {add: false}};
  }
  return (
    <div key={el.id} data-grid={el.uiLocation}>
      {el.uiLocation.add ? (
        <AddCard onClick={()=> {
          const menuItemsCount = selectMenuItems(store.getState()) ? selectMenuItems(store.getState()).length : 0;
          store.dispatch(
            addMenuItem({
              id: uuidv4(),
              image: '',
              name: '',
              price: '',
              uiLocation: {
                x: menuItemsCount % 2,
                y: Math.floor(menuItemsCount / 2),
                w: 1,
                h: 2,
              }
            })
          )}} 
        />
      ) : (
        <ProductDisplay 
          key={el.id} 
          id={el.id} 
          index={ind} 
          item={el} 
          // {...this.props}
        />
      )}
      {el.uiLocation.add ? (
        <span></span>
      ) : (
        <span
          className="remove"
          style={removeStyle}
          onClick={() => {
            setValue('menuPageIsDirty', uuidv4(), {shouldDirty: true});
            store.dispatch(removeMenuItem(el.id));
          }}
        >
        x
        </span>
      )}
    </div>
  );        
}


export const AddRemoveLayout = ({
  currentMenuItemsLayout,
  currentCategoryId,
  menuItems,
  menuItemsWithAddItem,
  menuItemsLoading,
  menuItemsError,
  loadMenuItems,
  updateMenuItemsLocation,
}) => {
  useEffect(() => {
    // const ac = new AbortController();
    console.log('loading menu Items');
    loadMenuItems();
    // reset({}, {dirtyFields: false, dirty: false});
    // return () => ac.abort();
  }, [loadMenuItems]);

  const { reset, setValue } = useFormContext();
  console.log('rendering menuitemspanel');
  const onLayoutChange = (layout) => {
    updateMenuItemsLocation(layout);
    // const newLayout = selectMenuItemsLayout(store.getState())
    // console.log('going to use layout', newLayout);
    // setLayout(prev => newLayout);
    // return ({ layout: newLayout });
  }

  const classes = useStyles();
  // const [layout, setLayout] = React.useState([]);

  if (menuItemsLoading) {
    return <CircularProgress />
  }
  else {
    return (
      <TabPanel value={currentCategoryId}>
        <Container className={classes.cardGrid} maxWidth="sm">
          {/* <input hidden name={`menuPage.pageId`} readOnly value={this.props.pageId} ref={this.props.register} /> */}
          <div style={{position: "relative"}}>
          <ResponsiveReactGridLayout
            onLayoutChange={onLayoutChange}
            layouts={{lg: currentMenuItemsLayout, md: currentMenuItemsLayout, sm: currentMenuItemsLayout, xs: currentMenuItemsLayout, xxs: currentMenuItemsLayout}}
            // onBreakpointChange={this.onBreakpointChange}
            breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
            cols={{ lg: 2, md: 2, sm: 2, xs: 2, xxs: 2 }}
            isDraggable={true}
            draggableCancel="input,textarea, button"
            isResizable={false}
            rowHeight={150}
            className="layout"
          >
            {_.map(menuItemsWithAddItem, (el,ind) => createElement(el,ind, setValue))}
          </ResponsiveReactGridLayout> 
          </div>           
        </Container>
        <VariantsPopUp />
      </TabPanel>
    )
  }
}

AddRemoveLayout.propTypes = {
  currentCategoryId: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  menuItems: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  menuItemsWithAddItem: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  menuItemsLoading: PropTypes.bool,
  menuItemsError: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),

  loadMenuItems: PropTypes.func.isRequired,
  updateMenuItemsLocation: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  currentMenuItemsLayout: makeSelectMenuItemsLayout(),
  currentCategoryId: makeSelectCurrentCategoryId(),
  menuItems: makeSelectMenuItems(),
  menuItemsWithAddItem: makeSelectMenuItemsWithAddItem(),
  menuItemsLoading: makeSelectMenuItemsLoading(),
  menuItemsError: makeSelectMenuItemsError(),
});

function mapDispatchToProps(dispatch) {
  return {
    loadMenuItems: () => dispatch(loadMenuItems()),
    updateMenuItemsLocation: (layout) => dispatch(updateMenuItemsLocation(layout)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
)

// import("./test-hook.jsx").then(fn => fn.default(AddRemoveLayout));
// export default makeLayout(AddRemoveLayout);
export default compose(withConnect)(AddRemoveLayout);