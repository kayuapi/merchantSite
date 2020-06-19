
  componentDidUpdate(prevProps, prevState) {
    console.log('INVESTIGATE prev props', prevProps);
    console.log('INVESTIGATE this props', this.props);

    console.log('INVESTIGATE prev state', prevState);
    console.log('INVESTIGATE this state', this.state);


    if (this.state.affectedItems) {
      console.log('HEREHEREHERE', [...this.state.items, ...this.state.affectedItems]);
      this.setState({items: [...this.state.items, ...this.state.affectedItems], affectedItems: null})
    }

    if (!this.state.items[this.state.items.length-1] || !this.state.items[this.state.items.length-1].uiLocation || !this.state.items[this.state.items.length-1].uiLocation.add) {
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
      this.setState(state => ({
        items: 
          [...state.items, {
            uiLocation: 
            {
              x: state.items.length % 2,
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
        newCounter: state.newCounter + 1,
        itemsLoaded: true
      }));}





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
