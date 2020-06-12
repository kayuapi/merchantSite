import React from "react";
import { WidthProvider, Responsive } from "react-grid-layout";
import _ from "lodash";
import makeLayout from "./test-hook.jsx";
import AdminProductDisplay from './AdminProductDisplay';
import { withHookHoc } from './withHookHoc';
import { IconButton } from '@material-ui/core';
import Add from "@material-ui/icons/Add";
import CardActionArea from '@material-ui/core/CardActionArea';
import Card from '@material-ui/core/Card';
import AddCard from './AddCard';
const ResponsiveReactGridLayout = WidthProvider(Responsive);

/**
 * This layout demonstrates how to use a grid with a dynamic number of elements.
 */
class AddRemoveLayout extends React.PureComponent {
  static defaultProps = {
    className: "layout",
    breakpoints: {lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0},
    // cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
    cols: { lg: 2, md: 2, sm: 2, xs: 2, xxs: 2 },
    rowHeight: 150
  };

  constructor(props) {      
    super(props);
    console.log('PROPOS', props);
    this.state = {
      items: [
        ...this.props.fields, 
        {
          uiLocation: 
          {
            x: this.props.fields.length % 2,
            y:Infinity,
            w:1,
            h:2, 
            add: true
          }
        }
      ],
      newCounter: 0,
      itemsLoaded: false,
      affectedItems: null
    };

    this.onAddItem = this.onAddItem.bind(this);
    this.onBreakpointChange = this.onBreakpointChange.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('INVESTIGATE prev props', prevProps);
    console.log('INVESTIGATE this props', this.props);

    console.log('INVESTIGATE prev state', prevState);
    console.log('INVESTIGATE this state', this.state);


    if (this.state.affectedItems) {
      console.log('HEREHEREHERE', [...this.state.items, ...this.state.affectedItems]);
      this.setState({items: [...this.state.items, ...this.state.affectedItems], affectedItems: null})
    }

    if (!this.state.items[this.state.items.length-1].uiLocation.add) {
      if (this.state.affectedItems) {
        console.log('choice1');
        this.setState({
          items: 
            [...this.state.items, ...this.state.affectedItems, {
              uiLocation: 
              {
                x: (this.state.affectedItems.length + this.state.items.length) % 2,
                y:Infinity,
                w:1,
                h:2, 
                add: true
              }
            }],
          // Increment the counter to ensure key is always unique.
          newCounter: this.state.newCounter + 1,
          itemsLoaded: true
        });
      } else {
      // mutating list directly here for performance but not working
      // this.state.items.push(
      //   {
      //     uiLocation: 
      //     {
      //       x: this.state.items.length % 2,
      //       y:Infinity,
      //       w:1,
      //       h:2, 
      //       add: true
      //     }
      //   }
      // );
      console.log('choice2');
      this.setState({
        items: 
          [...this.state.items, {
            uiLocation: 
            {
              x: this.state.items.length % 2,
              y:Infinity,
              w:1,
              h:2, 
              add: true
            }
          }],
          // this.state.items.concat(
          // {
          //   uiLocation: 
          //   {
          //     x: this.state.items.length % 2,
          //     y:Infinity,
          //     w:1,
          //     h:2, 
          //     add: true
          //   }
          // }),
        // Increment the counter to ensure key is always unique.
        newCounter: this.state.newCounter + 1,
        itemsLoaded: true
      });}





    }
  
    // if (prevState.items.length !== this.state.items.length) {
    //   this.setState({
    //     // Add a new item. It must have a unique key!
    //     items: this.state.items.concat(
    //       {
    //         uiLocation: 
    //         {
    //           x: this.state.items.length % 2,
    //           y:Infinity,
    //           w:1,
    //           h:2, 
    //           add: true
    //         }
    //       }),
    //     // Increment the counter to ensure key is always unique.
    //     newCounter: this.state.newCounter + 1,
    //     itemsLoaded: true
    //   });

    // }
  

    // console.log('component did update debug', this.props.fields);
    // console.log('component did update debug', prevProps.fields);
    // if (prevProps.fields.title !== this.props.fields) {
    //   this.setState(({
    //     items: this.props.fields
    //   }))
    // }
  }

  createElement(el, ind) {
    const removeStyle = {
      position: "absolute",
      right: "2px",
      top: 0,
      cursor: "pointer",
      fontSize: "x-large"
    };
    let productName;
    if (el.uiLocation) {
      productName = el.uiLocation.add ? "+" : el.name;
    } else {
      productName = el.name;
      el={...el, uiLocation: {add: false}};
    }
    // const productName = el.name;
    console.log('creating element');
      return (
        <div key={productName} data-grid={el.uiLocation}>
          {el.uiLocation.add ? (
            <AddCard onClick={this.onAddItem} />
          
            // <span
            //   className="add text"
            //   onClick={this.onAddItem}
            //   title="You can add an item by clicking here, too."
            // >
            //   Add +
            // </span>
          ) : (
            <AdminProductDisplay 
            key={productName} 
            id={productName} 
            index={ind} 
            item={el} 
            {...this.props}>
            </AdminProductDisplay>
          )}
          {el.uiLocation.add ? (
            <span></span>
          ) : (
            <span
              className="remove"
              style={removeStyle}
              onClick={this.onRemoveItem.bind(this, productName)}
          >
            x
          </span>
          )}
        </div>
      );        
    }
  

  createAddElement(position) {
    console.log('MY POSITION IS ', position)
    console.log('MY col POSITION IS ', this.state.cols)
    console.log('MY X POSITION', (position) % (this.state.cols))
    const xPosition = (position) % (this.state.cols);
    return (
      <div key="add-Item" data-grid={{x:xPosition, y:Infinity, w:1, h:2 }}>
        <AddCard onClick={this.onAddItem} />
      </div>          
    );
  }


  onAddItem() {
    /*eslint no-console: 0*/
    console.log("adding", "n" + this.state.newCounter);
    console.log('x location', this.state.items.length % this.state.cols);
    console.log('items length', this.state.items.length);
    console.log('column ', this.state.cols);
    console.log('test', {x: this.state.items%this.state.cols})
    const addCart= this.state.items.pop();

    this.setState({
      // Add a new item. It must have a unique key!
      items: this.state.items.concat({ 
        name: "newProduct"+this.state.newCounter, 
        image: "", 
        // uiLocation: {x:(this.state.items.length * 2) % (this.state.cols || 12), y:Infinity, w:1, h:2 }, 
        uiLocation: {x:(this.state.items.length) % (this.state.cols || 12), y:Math.floor((this.state.items.length)/2), w:1, h:2 }, 
        price: "", 
        variants: [{}, {}]
      }
      // , {
      //   uiLocation: 
      //   {
      //     x: (this.state.items.length+1) % (this.state.cols || 12),
      //     y:Infinity,
      //     w:1,
      //     h:2, 
      //     add: true
      //   }
      // }

      
      ),
      // Increment the counter to ensure key is always unique.
      newCounter: this.state.newCounter + 1,
      itemsLoaded: true
    });

    console.log('ITEMS:', this.state.items);
  }


  // We're using the cols coming back from this to calculate where to add new items.
  onBreakpointChange(breakpoint, cols) {
    this.setState({
      breakpoint: breakpoint,
      cols: cols
    });
  }

  onLayoutChange(layout) {
    this.props.onLayoutChange(layout);
    this.setState({ layout: layout });
  }

  onRemoveItem(i) {
    console.log("removing", i);
    this.props.remove(i);
    // this.setState({ items: _.reject(this.state.items, { name: i }) });
    const items = this.adjustUiLocation2(i);
    console.log('INVESTINGATING REMOEING ITEMS', items);
    // this.setState({ items: this.adjustUiLocation(i) });
    this.setState(()=>({ items: items.unaffectedItems, affectedItems: items.affectedItems }));
  }

  adjustUiLocation2(i) {

    const addCart= this.state.items.pop();
    console.log('IMPORTANT STATE ITEMS', this.state.items);
    const droppedIndex = _.findIndex(this.state.items, { name: i });
    const unaffectedItems = _.slice(this.state.items, 0, droppedIndex);
    console.log('IMPORTANT UNAFFECTEDITEMS', unaffectedItems);
    const affectingItems = this.state.items[droppedIndex];
    console.log('IMPORTANT AFFECTINGITEMS', affectingItems);
    const affectedItems = _.drop(this.state.items, droppedIndex+1);
    console.log('IMPORTANT AFFECTEDITEMS', affectedItems);
    affectedItems.forEach((el)=> {
      if (el.uiLocation.x === 0) {
        el.uiLocation.y -= 1; // adjustUiLocationY
      } 
      el.uiLocation.x = Number(!el.uiLocation.x) // adjustUiLocationX
    }); 
    console.log('IMPORTANT AFFECTEDITEMS2222222222', affectedItems);

    console.log('IMPORTANT AFFECTEDITEMS', [...unaffectedItems, ...affectedItems]);
    return { unaffectedItems: [...unaffectedItems], affectedItems: [...affectedItems] };
  }

  
  adjustUiLocation(i) {

    const addCart= this.state.items.pop();
    console.log('IMPORTANT STATE ITEMS', this.state.items);
    const droppedIndex = _.findIndex(this.state.items, { name: i });
    const unaffectedItems = _.slice(this.state.items, 0, droppedIndex);
    console.log('IMPORTANT UNAFFECTEDITEMS', unaffectedItems);
    const affectingItems = this.state.items[droppedIndex];
    console.log('IMPORTANT AFFECTINGITEMS', affectingItems);
    const affectedItems = _.drop(this.state.items, droppedIndex+1);
    console.log('IMPORTANT AFFECTEDITEMS', affectedItems);
    affectedItems.forEach((el)=> {
      if (el.uiLocation.x === 0) {
        el.uiLocation.y -= 1; // adjustUiLocationY
      } 
      el.uiLocation.x = Number(!el.uiLocation.x) // adjustUiLocationX
    }); 
    console.log('IMPORTANT AFFECTEDITEMS2222222222', affectedItems);

    console.log('IMPORTANT AFFECTEDITEMS', [...unaffectedItems, ...affectedItems]);
    return [...unaffectedItems, ...affectedItems];
  }

  render() {
    return (
      <div>
        {/* <IconButton onClick={this.onAddItem} aria-label="add item">
          <Add />
        </IconButton> */}
        <input hidden name={`menuPage.pageId`} readOnly value={this.props.pageId} ref={this.props.register} />
        <ResponsiveReactGridLayout
        //   onLayoutChange={this.onLayoutChange}
          onBreakpointChange={this.onBreakpointChange}
          isDraggable={false}
          draggableCancel="input,textarea, button"
          isResizable={false}
          {...this.props}
        >
          {_.map(this.state.items, (el,ind) => this.createElement(el,ind))}
          {/* {_.map(_.concat(this.state.items,{uiLocation: {x: this.state.items.length % 2,y:Infinity,w:1,h:2, add: true}}), (el,ind) => this.createElement(el,ind))} */}

          {/* {_.map(this.state.items, (el,ind) => this.createElement(el,ind))} */}
          {/* {this.createAddElement(this.state.items.length)} */}
          {/* <div key="add-Item" data-grid={{x:1, y:Infinity, w:1, h:2 }}>
            <AddCard onClick={this.onAddItem} />
          </div>           */}


        </ResponsiveReactGridLayout>
      </div>
    )
  }
}

// import("./test-hook.jsx").then(fn => fn.default(AddRemoveLayout));
// export default makeLayout(AddRemoveLayout);
export default withHookHoc(AddRemoveLayout);