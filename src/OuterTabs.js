import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import {Salesperson,Segmentation,MonthYearPicker} from './Inputs';
import DateTabs from './DateTabs';
import {TabPanel,a11yProps} from './TabPanel'
import RawDataTable from "./components/RawDataTable";

export default function OuterTabs(props) {

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
  };

  const [endDate, setEndDate] = React.useState(new Date());

  const handleEndDateChange = (endDate) => {
    setEndDate(endDate);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="By Accounts" {...a11yProps(0)} />
          <Tab label="By People" {...a11yProps(1)} />
          <Tab label="Raw Data" {...a11yProps(2)} />
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
            <DateTabs startDate={startDate} 
                      endDate={endDate} 
                      accountData={props.accountData} 
                      segments={segments} 
                      salesperson={salesperson}/>
          </Stack>
        </Stack>
      </TabPanel>
      <TabPanel value={value} index={1}>
        TBD
      </TabPanel>
      <TabPanel value={value} index={2}>
        <RawDataTable rows={props.accountData} />
      </TabPanel>
    </Box>
  );
}