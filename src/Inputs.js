import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Slider from '@mui/material/Slider';
import { useTheme } from '@mui/material/styles';
import {getSegments} from './Data';

function EffectiveDate() {
  const [effectiveDate, setEffectiveDate] = React.useState('');

  const handleChange = (event) => {
   setEffectiveDate(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 150 }}>
      <FormControl fullWidth>
        <InputLabel id="effective-date-label">Effective Date</InputLabel>
        <Select
          labelId="effective-date-label"
          id="effective-date"
          value={effectiveDate}
          label="Effective Date"
          onChange={handleChange}
        >
          <MenuItem value={10}>Dec</MenuItem>
          <MenuItem value={20}>Jan</MenuItem>
          <MenuItem value={30}>Feb</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

function Salesperson(props) {

  return (
    <Box sx={{ minWidth: 150 }}>
      <FormControl fullWidth>
        <InputLabel id="salesperson-label">Salesperson</InputLabel>
        <Select
          labelId="salesperson-label"
          id="salesperson"
          label="Salesperson"
          onChange={props.changer}
          value={props.value}
        >
          <MenuItem value=""><em>None</em></MenuItem>
          <MenuItem value="jane">jane</MenuItem>
          <MenuItem value="joe">joe</MenuItem>
          <MenuItem value="ben">ben</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(segment, segments, theme) {

  return {
    fontWeight:
      segments.indexOf(segment) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightBold,
  };
}

function Segmentation(props) {

  const theme = useTheme()

  return (
    <Box sx={{ minWidth: 150 }}>
      <FormControl fullWidth>
        <InputLabel id="segmentation-label">Segmentation</InputLabel>
        <Select
          labelId="segmentation-label"
          id="segmentation"
          label="Segmentation"
          multiple
          onChange={props.changer}
          value={props.value}
          MenuProps={MenuProps}
        >
          {getSegments().map((segment) => (
            <MenuItem
              key={segment}
              value={segment}
              style={getStyles(segment, props.value, theme)}
            >
              {segment}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

const marks = [
  {
    value: 0,
    label: '0',
  },
  {
    value: 100,
    label: '100',
  },
];

function valuetext(value) {
  return `${value}%`;
}

export default function PercentIncrease(props) {
  return (
    <Box sx={{ width: 30 , display: 'inline-block'}}>
      <Slider
        aria-label="Always visible"
        value={props.value}
        defaultValue={props.default}
        getAriaValueText={valuetext}
        step={5}
        marks={marks}
        valueLabelDisplay="auto"
        onChange={props.changer}
      />
    </Box>
  );
}

export {Salesperson,EffectiveDate,Segmentation,PercentIncrease}