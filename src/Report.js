import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {PercentIncrease} from './Inputs';
import {getRevenueData} from './Data';
import {persistState,getPersistedValue} from './store';

function AccountRow(accountRow, segment) {

  // for account sliders
  const [accountIncreaseValue, setAccountIncreaseValue] = React.useState(getPersistedValue(segment,accountRow.account));

  const handleAccountChange = (event, newValue) => {
    setAccountIncreaseValue(newValue);
    persistState(segment,accountRow.account,newValue)
  };

  return (
    <TableRow key={accountRow.account}>
      <TableCell component="th" scope="row">{accountRow.account}</TableCell>
      <TableCell>{accountRow.revenue}</TableCell>
      <TableCell align="right"><PercentIncrease changer={handleAccountChange} default={accountIncreaseValue}/></TableCell>
      <TableCell align="right">{getAdjustedRevenue(accountRow.revenue,accountIncreaseValue)}</TableCell>
      <TableCell align="right">{accountRow.targetRevenue}</TableCell>
      <TableCell align="right">{getAdjustedRevenue(accountRow.revenue,accountIncreaseValue)-accountRow.targetRevenue}</TableCell>
    </TableRow>
  )
}

const getAdjustedRevenue = (revenue, increasePercent) => {
  return increasePercent ? (revenue * (1+increasePercent/100)).toFixed(): revenue;
};

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  // for segment sliders
  const [segmentIncreaseValue, setSegmentIncreaseValue] = React.useState(getPersistedValue(row.name,""));

  const handleSegmentChange = (event, newValue) => {
    setSegmentIncreaseValue(newValue);

    // persist changes
    persistState(row.name,"",newValue)

    // trigger a refresh of the totals based on this new increase value
    props.summaryTrigger(newValue)
  };

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">{row.name}</TableCell>
        <TableCell align="right">{row.revenue}</TableCell>
        <TableCell align="right"><PercentIncrease id={row.name} changer={handleSegmentChange} default={segmentIncreaseValue}/></TableCell>
        <TableCell align="right">{getAdjustedRevenue(row.revenue,segmentIncreaseValue)}</TableCell>
        <TableCell align="right">{row.targetRevenue}</TableCell>
        <TableCell align="right">{getAdjustedRevenue(row.revenue,segmentIncreaseValue)-row.targetRevenue}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                By Account
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Account</TableCell>
                    <TableCell>Current Revenue</TableCell>
                    <TableCell align="right">Revenue Increase%</TableCell>
                    <TableCell align="right">Adjusted Revenue</TableCell>
                    <TableCell align="right">Target Revenue</TableCell>
                    <TableCell align="right">Over/Under</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.accounts.map((accountRow) => (AccountRow(accountRow, row.name)))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

function SummaryRow(props) {

  let revenueData = getRevenueData(props.segment)

  console.log("summary called")

  let summedRevenue = revenueData.reduce( (sum, item ) => {
    return sum + item.revenue
  }, 0);

  let summedAdjustedRevenue = revenueData.reduce( (sum, item ) => {
    let segmentIncreaseValue = getPersistedValue(item.name)

    return sum + parseInt(getAdjustedRevenue(item.revenue,segmentIncreaseValue))
  }, 0);

  let summedTarget = revenueData.reduce( (sum, item ) => {
    return sum + item.targetRevenue
  }, 0);

  let summedAOverUnder = revenueData.reduce( (sum, item ) => {
    let segmentIncreaseValue = getPersistedValue(item.name)

    return sum + parseInt(getAdjustedRevenue(item.revenue,segmentIncreaseValue)) - item.targetRevenue
  }, 0);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell/>
        <TableCell component="th" scope="row">Totals</TableCell>
        <TableCell align="right">{summedRevenue}</TableCell>
        <TableCell align="right">n/a</TableCell>
        <TableCell align="right">{summedAdjustedRevenue}</TableCell>
        <TableCell align="right">{summedTarget}</TableCell>
        <TableCell align="right">{summedAOverUnder}</TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function SummaryReport(props) {

  // for triggering refreshes of the totals row based on slider changes
  const [trigger, setTrigger] = React.useState(0);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Segmentation</TableCell>
            <TableCell align="right">Current Revenue</TableCell>
            <TableCell align="right">Revenue Increase%</TableCell>
            <TableCell align="right">Adjusted Revenue</TableCell>
            <TableCell align="right">Target Revenue</TableCell>
            <TableCell align="right">Revenue Over/Under</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {getRevenueData(props.segment,props.salesperson).map((row) => (
            <Row key={row.name} row={row} summaryTrigger={setTrigger}/>
          ))}
          <SummaryRow segment={props.segment} trigger={trigger}/>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
