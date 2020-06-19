import styled from 'styled-components';
import { styled as styledTabTab } from 'react-tabtab';

let {TabListStyle, ActionButtonStyle, TabStyle, PanelStyle} = styledTabTab;

TabListStyle = styled(TabListStyle)`

  background-color: #3f51b5;
  box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 1px 5px 0 rgba(0,0,0,0.12), 0 3px 1px -2px rgba(0,0,0,0.2);
  border: 0;
  ul {
    display: flex;
  }
`;

TabStyle = styled(TabStyle)`
  color: #ffffff;
  transition: color .28s ease;
  display: flex;
  height: 59px;
  padding: 9px 12px 6px 12px;
  align-items: center;
  border: 0;
  ${props => props.active && !props.vertical ?
    `
      border-bottom: 2px solid #283593;
    `
  : null}
  &:hover {
    background-color: transparent;
    color: #283593;
    border-bottom: 2px solid #283593;
  }
`;

ActionButtonStyle = styled(ActionButtonStyle)`
  background-color: transparent;
  border-radius: 0;
  &:hover {
    background-color: #eee;
  }
`;

PanelStyle = styled(PanelStyle)`
  border-left: 1px solid rgba(0,0,0,0.12);
  border-right: 1px solid rgba(0,0,0,0.12);
  border-bottom: 1px solid rgba(0,0,0,0.12);
  padding: 30px 30px;
  transition: box-shadow .25s, -webkit-box-shadow .25s;
  border-radius: 2px;
`;

export default {
  TabList: TabListStyle,
  ActionButton: ActionButtonStyle,
  Tab: TabStyle,
  Panel: PanelStyle
}
// module.exports = {
//     TabList: TabListStyle,
//     ActionButton: ActionButtonStyle,
//     Tab: TabStyle,
//     Panel: PanelStyle
// }