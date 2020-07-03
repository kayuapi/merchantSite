import React, {Component} from 'react';
import {Tabs, DragTabList, DragTab} from 'react-tabtab';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import {simpleSwitch} from '../../src/helpers/move';
import { createStructuredSelector } from 'reselect';
import {arrayMove} from 'react-sortable-hoc';
import md2 from './styling';
import { compose } from 'redux';
// import { makeSelectSMOCategoryTabs } from './selectors';
import { makeSelectCategories } from '../CategoryTabs/selectors'
import { initTabs, rearrangeTabs } from './actions';

export class CategoryTabsSortModeOn extends Component {
  constructor(props) {
    super(props);
    this.handleTabChange = this.handleTabChange.bind(this);
    this.handleTabSequenceChange = this.handleTabSequenceChange.bind(this);
    const tabs = this.props.categories;
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
    this.props.rearrangeCategories(updateTabs);
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
          customStyle={md2}>
        <DragTabList>
          {tabsTemplate}
        </DragTabList>
      </Tabs>
    )
  }
}

CategoryTabsSortModeOn.propTypes = {
  categories: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  rearrangeCategories: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  categories: makeSelectCategories(),
});

function mapDispatchToProps(dispatch) {
  return {
    initCategories: categories => dispatch(initTabs(categories)),
    rearrangeCategories: categories => dispatch(rearrangeTabs(categories)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
)

export default compose(withConnect)(CategoryTabsSortModeOn);