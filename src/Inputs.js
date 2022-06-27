import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Slider from '@mui/material/Slider';

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

function Segmentation(props) {

  return (
    <Box sx={{ minWidth: 150 }}>
      <FormControl fullWidth>
        <InputLabel id="segmentation-label">Segmentation</InputLabel>
        <Select
          labelId="segmentation-label"
          id="segmentation"
          label="Segmentation"
          onChange={props.changer}
          value={props.value}
        >
          <MenuItem value=""><em>None</em></MenuItem>
          <MenuItem value="T-Mobile">T-Mobile</MenuItem>
          <MenuItem value="Microsoft">Microsoft</MenuItem>
          <MenuItem value="Sempra">Sempra</MenuItem>
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
        defaultValue={0}
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