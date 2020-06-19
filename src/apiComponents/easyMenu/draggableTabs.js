import React, {Component} from 'react';
import {Tabs, DragTabList, DragTab} from 'react-tabtab';
// import {simpleSwitch} from '../../src/helpers/move';
import {arrayMove} from 'react-sortable-hoc';

export default class Drag extends Component {
  constructor(props) {
    super(props);
    this.handleTabChange = this.handleTabChange.bind(this);
    this.handleTabSequenceChange = this.handleTabSequenceChange.bind(this);
    // const tabs = makeData(3, 'DragTab');
    const tabs = ['DRAG1', 'DRAG2', 'DRAG3'];
    console.log('TABS', tabs);
    this.state = {
      activeIndex: 0,
      tabs
    }
  }

  handleTabChange(index) {
    this.setState({activeIndex: index});
  }

  handleTabSequenceChange({oldIndex, newIndex}) {
    const {tabs} = this.state;
    const updateTabs = arrayMove(tabs, oldIndex, newIndex);
    this.setState({tabs: updateTabs, activeIndex: newIndex});
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
            customStyle={this.props.customStyle}>
        <DragTabList>
          {tabsTemplate}
        </DragTabList>
      </Tabs>
    )
  }
}