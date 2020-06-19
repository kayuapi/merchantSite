import React, {Component} from 'react';
import {Tabs, DragTabList, DragTab} from 'react-tabtab';
// import {simpleSwitch} from '../../src/helpers/move';
import {arrayMove} from 'react-sortable-hoc';
import md2 from './styling';

export default class Drag extends Component {
  constructor(props) {
    super(props);
    this.handleTabChange = this.handleTabChange.bind(this);
    this.handleTabSequenceChange = this.handleTabSequenceChange.bind(this);
    // const tabs = makeData(3, 'DragTab');
    const tabs = props.tabs.data;
    console.log('TABS', tabs);
    this.state = {
      activeIndex: 0,
      tabs
    }
    console.log('CUSTOM STYLE', md2);
  }

  handleTabChange(index) {
    this.setState({activeIndex: index});
  }

  handleTabSequenceChange({oldIndex, newIndex}) {
    const {tabs} = this.state;
    const updateTabs = arrayMove(tabs, oldIndex, newIndex);
    this.setState({tabs: updateTabs, activeIndex: newIndex});
    this.props.setPageNames2(prevState => ({
      ...prevState,
      data: updateTabs
    }));
  }

  render() {
    const {tabs, activeIndex} = this.state;
    const tabsTemplate = [];
    tabs.forEach((tab, index) => {
      tabsTemplate.push(<DragTab key={index} label={'abc'}>{tab}</DragTab>)
    })
    return (
      <Tabs activeIndex={activeIndex}
            onTabChange={this.handleTabChange}
            onTabSequenceChange={this.handleTabSequenceChange}
            customStyle={md2}>
        <DragTabList>
          {tabsTemplate}
        </DragTabList>
      </Tabs>
    )
  }
}