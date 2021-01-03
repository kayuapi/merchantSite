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
import _ from "lodash";
// import makeLayout from "./test-hook.jsx";
// import AdminProductDisplay from './AdminProductDisplay';
import Container from '@material-ui/core/Container';
// import { withHookHoc } from './withHookHoc';
import AddCard from '../AddCard';
import { v4 as uuidv4 } from 'uuid';

import { useMenuItemsWorkingArea } from '../Context/MenuItemsWorkingArea/useMenuItemsWorkingArea';

import { makeStyles } from '@material-ui/core/styles';
import MenuItemDisplay from '../MenuItemDisplay';
import TabPanel from "@material-ui/lab/TabPanel";

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

function usePrevious(value) {
  // The ref object is a generic container whose current property is mutable ...
  // ... and can hold any value, similar to an instance property on a class
  const ref = React.useRef();
  
  // Store current value in ref
  useEffect(() => {
    ref.current = value;
  }, [value]); // Only re-run if value changes
  
  // Return previous value (happens before update in useEffect above)
  return ref.current;
}

function AddCard2() {
  const { menuItems, createMenuItem } = useMenuItemsWorkingArea();

  return (
    <div key={uuidv4()} data-grid={{x: 0, y:0, w: 1, h:PRODUCT_DISPLAY_HEIGHT}}>
      <AddCard onClick={()=> {
        const menuItemsCount2 = menuItems.length;
        createMenuItem({
          x: menuItemsCount2 % 2,
          y: Math.floor(menuItemsCount2 / 2)*PRODUCT_DISPLAY_HEIGHT + Math.floor(menuItemsCount2 /2)*PRODUCT_DISPLAY_VERTICAL_GAP,
          w: 1,
          h: PRODUCT_DISPLAY_HEIGHT,
          minH: PRODUCT_DISPLAY_MIN_HEIGHT,
        });
      }} /> 
    </div>
  );
}


const createElement = (el, categoryStatus) => {
  return (
    <div key={el.id} data-grid={el.uiLocation}>
      <MenuItemDisplay el={el} categoryStatus={categoryStatus} />
    </div>
  );        
}


export const AddRemoveLayout = ({
  menuItemsFromCloud,
  currentCategoryId,
  categoryStatus,
}) => {
  const { menuItems: newMenuItems, loadMenuItems: newLoadMenuItems, updateMenuItemLayout } = useMenuItemsWorkingArea();
  const classes = useStyles();

  const loadMenuItemsEfficientyly = React.useCallback((item) => {
    newLoadMenuItems(item);
  }, [newLoadMenuItems]);

  const prevCategoryId = usePrevious(currentCategoryId);
  useEffect(() => {
    if (prevCategoryId !== currentCategoryId) {
      if (menuItemsFromCloud) {
        loadMenuItemsEfficientyly(menuItemsFromCloud);
      } else {
        loadMenuItemsEfficientyly([]);
      }
    }
  }, [prevCategoryId, menuItemsFromCloud, currentCategoryId, loadMenuItemsEfficientyly]);

  const onLayoutChange = (layout) => {
    updateMenuItemLayout(layout);
  }
  return (
    <TabPanel className={classes.tabPanel} value={currentCategoryId}>
      <Container className={classes.cardGrid} maxWidth="sm">
        {newMenuItems.length > 0 && 
          <div style={{position: "relative"}}>
            <ResponsiveReactGridLayout
              onLayoutChange={onLayoutChange}
              breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
              cols={{ lg: 2, md: 2, sm: 2, xs: 2, xxs: 2 }}
              isDraggable={true}
              draggableCancel="input,textarea, button"
              draggableHandle=".dragme"
              isResizable={true}
              rowHeight={1}
              className="layout"
              margin={[0,0]}
              compactType={null}
              onDragStart={(layout, oldItem, newItem, placeholder, e, element) => {
                element.children[0].style.display="block";
                element.children[5].style.display="block";
              }}
              onDragStop={(layout, oldItem, newItem, placeholder, e, element) => {
                element.children[0].style.display="none";
                element.children[5].style.display="none";
              }}
            >
              {_.map(newMenuItems, (el,ind) => createElement(el, categoryStatus))}
            </ResponsiveReactGridLayout> 
          </div>
        }

        <div style={{position: "relative", marginTop: '1rem'}}>
          <ResponsiveReactGridLayout
            breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
            cols={{ lg: 2, md: 2, sm: 2, xs: 2, xxs: 2 }}
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
    </TabPanel>
  )
}

AddRemoveLayout.propTypes = {
  currentCategoryId: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  menuItemsFromCloud: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
};

// import("./test-hook.jsx").then(fn => fn.default(AddRemoveLayout));
// export default makeLayout(AddRemoveLayout);
export default AddRemoveLayout;