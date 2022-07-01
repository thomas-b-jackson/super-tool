import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import {Salesperson,Segmentation,MonthYearPicker} from './Inputs';
import DateTabs from './DateTabs';
// import { addDays } from 'date-fns';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function OuterTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // for segments pick list
  const [segments, setSegments] = React.useState([]);

  const handleSegmentChange = (event) => {
    const {
      target: { value },
    } = event;
    setSegments(value);
  };

  // for salesperson pick
  const [salesperson, setSalesperson] = React.useState('');

  const handleSalespersonChange = (event) => {
    setSalesperson(event.target.value);
  };

  // for date picks
  const [startDate, setStartDate] = React.useState(new Date());

  const handleStartDateChange = (startDate) => {
    setStartDate(startDate);
    console.log(`start: ${startDate}`)
  };

  const [endDate, setEndDate] = React.useState(new Date());

  const handleEndDateChange = (endDate) => {
    setEndDate(endDate);
    console.log(`end: ${endDate}`)
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="By Accounts" {...a11yProps(0)} />
          <Tab label="By People" {...a11yProps(1)} />
          <Tab label="Data" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Stack direction="row" spacing={2}>
          <Stack spacing={2}>
            <Segmentation changer={handleSegmentChange} value={segments}/>
            <Salesperson changer={handleSalespersonChange} value={salesperson}/>
          </Stack>
          <Stack spacing={2}>
            <Stack direction="row" spacing={2}>
              <MonthYearPicker label="Start Date" date={startDate} setDate={handleStartDateChange} minDate={new Date()}/>
              <MonthYearPicker label="End Date" date={endDate} setDate={handleEndDateChange} minDate={startDate}/>
            </Stack>
            <DateTabs startDate={startDate} endDate={endDate} segments={segments} salesperson={salesperson}/>
          </Stack>
        </Stack>
      </TabPanel>
      <TabPanel value={value} index={1}>
        TBD
      </TabPanel>
      <TabPanel value={value} index={2}>
        TBD
      </TabPanel>
    </Box>
  );
}
