/**
 * How this works?
 * Upon events such as onAddItem, onRemoveItem, remove <AddCard /> by popping it off from state.items
 * Append <AddCard /> by adding it to state.items when component updates again
 * 
 */
import { PRODUCT_DISPLAY_HEIGHT, PRODUCT_DISPLAY_MIN_HEIGHT, PRODUCT_DISPLAY_VERTICAL_GAP } from './layoutConstants';
import '../css/styles.css';
import React, { useEffect } from "react";
import { WidthProvider, Responsive } from "react-grid-layout";
import PropTypes from 'prop-types';
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
    paddingLeft: theme.spacing(0.5),
    paddingRight: theme.spacing(0.5),
  },
  tabPanel: {
    paddingLeft: theme.spacing(0),
    paddingRight: theme.spacing(0),
  }
}));

function AddCard2() {
  const menuItemsCount = selectMenuItems(store.getState()) ? selectMenuItems(store.getState()).length : 0;

  return (
    <div key={uuidv4()} data-grid={{x: 0, y:0, w: 1, h:PRODUCT_DISPLAY_HEIGHT}}>
      <AddCard onClick={()=> {
        store.dispatch(
          addMenuItem({
            id: uuidv4(),
            image: '',
            name: '',
            price: '',
            uiLocation: {
              x: menuItemsCount % 2,
              y: Math.floor(menuItemsCount / 2)*PRODUCT_DISPLAY_HEIGHT + menuItemsCount*PRODUCT_DISPLAY_VERTICAL_GAP,
              w: 1,
              h: PRODUCT_DISPLAY_HEIGHT,
              minH: PRODUCT_DISPLAY_MIN_HEIGHT,
            }
          })
        )
      }} /> 
    </div>
  );
}


const createElement = (el, ind, setValue) => {
  const removeStyle = {
    position: "absolute",
    right: "2px",
    top: 0,
    cursor: "pointer",
    fontSize: "x-large",
  };
  el.uiLocation = {...el.uiLocation, minH:PRODUCT_DISPLAY_MIN_HEIGHT};
  return (
    <div key={el.id} data-grid={el.uiLocation}>
      <hr style={{margin: 0, width: '1000px', marginLeft: '-350px', display: 'none', borderStyle: 'ridge'}} />
      <ProductDisplay 
        key={el.id} 
        id={el.id} 
        index={ind} 
        item={el}
        // {...this.props}
      />
      <span
        className="remove"
        style={removeStyle}
        onClick={() => {
          setValue('menuPageIsDirty', uuidv4(), {shouldDirty: true});
          store.dispatch(removeMenuItem(el.id));
        }}
      >x
      </span>
      <hr style={{margin: 0, width: '1000px', marginLeft: '-350px', display: 'none', borderStyle: 'ridge'}} />
    </div>
  );        
}


export const AddRemoveLayout = ({
  // currentMenuItemsLayout,
  currentCategoryId,
  menuItems,
  menuItemsLoading,
  menuItemsError,
  loadMenuItems,
  updateMenuItemsLocation,
}) => {
  const { reset, setValue } = useFormContext();
  const classes = useStyles();

  useEffect(() => {
    loadMenuItems();
    reset({}, {dirtyFields: false, dirty: false});
  }, [currentCategoryId, loadMenuItems, reset]);

  const onLayoutChange = (layout) => {
    updateMenuItemsLocation(layout);
  }
  
  if (menuItemsLoading) {
    return <CircularProgress />
  }
  else {
    return (
      <TabPanel className={classes.tabPanel} value={currentCategoryId}>
        <Container className={classes.cardGrid} maxWidth="sm">
          {/* <input hidden name={`menuPage.pageId`} readOnly value={this.props.pageId} ref={this.props.register} /> */}
          {menuItems.length > 0 && 
            <div style={{position: "relative"}}>
              <ResponsiveReactGridLayout
                onLayoutChange={onLayoutChange}
                // layouts={{lg: currentMenuItemsLayout, md: currentMenuItemsLayout, sm: currentMenuItemsLayout, xs: currentMenuItemsLayout, xxs: currentMenuItemsLayout}}
                // onBreakpointChange={this.onBreakpointChange}
                breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
                cols={{ lg: 2, md: 2, sm: 2, xs: 2, xxs: 2 }}
                isDraggable={true}
                draggableCancel="input,textarea, button"
                isResizable={true}
                rowHeight={1}
                className="layout"
                margin={[0,0]}
                verticalCompact={false}
                onDragStart={(layout, oldItem, newItem, placeholder, e, element) => {
                  element.children[0].style.display="block";
                  element.children[3].style.display="block";
                }}
                onDragStop={(layout, oldItem, newItem, placeholder, e, element) => {
                  element.children[0].style.display="none";
                  element.children[3].style.display="none";
                }}
              >
                {_.map(menuItems, (el,ind) => createElement(el,ind, setValue))}
              </ResponsiveReactGridLayout> 
            </div>
          }

          <div style={{position: "relative", marginTop: '1rem'}}>
            <ResponsiveReactGridLayout
              // onLayoutChange={onLayoutChange}
              // layouts={{lg: currentMenuItemsLayout, md: currentMenuItemsLayout, sm: currentMenuItemsLayout, xs: currentMenuItemsLayout, xxs: currentMenuItemsLayout}}
              // onBreakpointChange={this.onBreakpointChange}
              breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
              cols={{ lg: 2, md: 2, sm: 2, xs: 2, xxs: 2 }}
              // isDraggable={true}
              margin= {[0, 0]}

              draggableCancel="input,textarea, button"
              isResizable={false}
              rowHeight={1}
              className="layout"
            >
              {AddCard2()}
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
  // currentMenuItemsLayout: makeSelectMenuItemsLayout(),
  currentCategoryId: makeSelectCurrentCategoryId(),
  menuItems: makeSelectMenuItems(),
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