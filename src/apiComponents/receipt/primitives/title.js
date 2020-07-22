import styled from 'styled-components';
import { grid } from '../themes/constants';
import purple from '@material-ui/core/colors/purple';

// $ExpectError - not sure why
export default styled.h4`
  padding: ${grid}px;
  transition: background-color ease 0.2s;
  flex-grow: 1;
  margin: 0px;
  user-select: none;
  position: relative;
  &:focus {
    outline: 2px solid ${purple[100]};
    outline-offset: 2px;
  }
`;