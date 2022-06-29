import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ReportTabs from './ReportTabs';

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

export default function DateTabs(props) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function getMonthYears(startDateTime, stopDateTime) {
    let monthYearDateTimeArray = [];
    let currentDateTime = new Date(startDateTime);
    while (currentDateTime <= stopDateTime) {
      monthYearDateTimeArray.push(new Date(currentDateTime));
      currentDateTime = new Date(currentDateTime.setMonth(currentDateTime.getMonth()+1));
    }

    // reduce month array to strings 
    return monthYearDateTimeArray.map((item) => {
      return `${item.toLocaleString('default', { month: 'short' })} ${item.getFullYear()}`
    });
  }

  console.log(`${props.startDate} ${props.endDate}`)
  console.log(getMonthYears(props.startDate,props.endDate))
  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="inner-tabs">
          {getMonthYears(props.startDate,props.endDate).map((row, index) => (
              <Tab key={row} label={row} {...a11yProps(index)}/>
            ))}          
        </Tabs>
      </Box>
      {getMonthYears(props.startDate,props.endDate).map((row, index) => (
        <TabPanel key={row} value={value} index={index}>
          <ReportTabs key={props.segments} date={row} segments={props.segments} salesperson={props.salesperson} />
        </TabPanel>
      ))}
    </Box>
  );
}
