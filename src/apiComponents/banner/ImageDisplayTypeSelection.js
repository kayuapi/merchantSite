import React from 'react';
import FormatAlignLeftIcon from '@material-ui/icons/FormatAlignLeft';
import FormatAlignCenterIcon from '@material-ui/icons/FormatAlignCenter';
import FormatAlignRightIcon from '@material-ui/icons/FormatAlignRight';
import FormatAlignJustifyIcon from '@material-ui/icons/FormatAlignJustify';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

export default function ToggleButtons(props) {
  const {imageDisplayType, setImageDisplayType} = props;
  const handleImageDisplayType = (event, newImageDisplayType) => {
    setImageDisplayType(newImageDisplayType);
  };

  return (
    <ToggleButtonGroup
      value={imageDisplayType}
      exclusive
      onChange={handleImageDisplayType}
      aria-label="image display type"
    >
      <ToggleButton value="contain" aria-label="left aligned">
        A: contain
      </ToggleButton>
      <ToggleButton value="cover" aria-label="centered">
        B: cover
      </ToggleButton>
      <ToggleButton value="fill" aria-label="right aligned">
        C: fill
      </ToggleButton>
    </ToggleButtonGroup>
  );
}