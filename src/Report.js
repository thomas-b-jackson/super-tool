import * as React from 'react';
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

function getSums(segmentData) {

  let sums = {}

  // sum revenue
  sums["Revenue"] = segmentData.reduce( (sum, item) => {
    return item.accounts.reduce( (sum, account ) => {
      return sum + account.revenue
    }, 0)}, 0)

  // sum adjusted revenue
  sums["AdjustedRevenue"] = segmentData.reduce( (sum, segment) => {

    // calc adjusted revenue accross accounts
    let summedAdjustedRevenue = segment.accounts.reduce( (sum, account ) => {
      let accountIncreaseValue = getPersistedValue(segment.name, account.account)
      // console.log(`${segment.name}/${account.account} increase: ${accountIncreaseValue}`)
      return sum + parseInt(getAdjustedRevenue(account.revenue,accountIncreaseValue)) 
    }, 0)

    // console.log(`${segment.name} adjusted rev: ${summedAdjustedRevenue}`)

    // next apply to segment
    let segmentIncreaseValue = getPersistedValue(segment.name)
    return sum + parseInt(getAdjustedRevenue(summedAdjustedRevenue,segmentIncreaseValue))
  }, 0);

  // sum target revenue 
  sums["TargetRevenue"] =segmentData.reduce( (sum, item) => {
    return item.accounts.reduce( (sum, account ) => {
      return sum + account.targetRevenue
    }, 0)}, 0)

  return sums
}

function SegmentRow(props) {

  let row = props.row;

  // for segment sliders
  const [segmentIncreaseValue, setSegmentIncreaseValue] = React.useState(getPersistedValue(row.name,""));

  const handleSegmentChange = (event, newValue) => {
    setSegmentIncreaseValue(newValue);

    // persist changes
    persistState(row.name,"",newValue)

    // trigger a refresh of the totals based on this new increase value
    props.summaryTrigger(newValue)
  };

  let sums = getSums([row])

  return (
    <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
      <TableCell>
        <IconButton
          aria-label="expand row"
          size="small"
          onClick={() => props.setOpen(!(props.open))}
        >
          {props.open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </IconButton>
      </TableCell>
      <TableCell component="th" scope="row">{row.name}</TableCell>
      <TableCell align="right">{sums.Revenue}</TableCell>
      <TableCell align="right"><PercentIncrease value={segmentIncreaseValue} changer={handleSegmentChange} default={segmentIncreaseValue}/></TableCell>
      <TableCell align="right">{sums.AdjustedRevenue}</TableCell>
      <TableCell align="right">{sums.TargetRevenue}</TableCell>
      <TableCell align="right">{sums.KeyboardArrowDownIconAdjustedRevenue-sums.TargetRevenue}</TableCell>
    </TableRow>
  )
}

function AccountRow(props) {

  let segment = props.segment
  let accountRow = props.row

  // for account sliders
  const [accountIncreaseValue, setAccountIncreaseValue] = React.useState(getPersistedValue(segment,accountRow.account));

  const handleAccountChange = (event, newValue) => {
    setAccountIncreaseValue(newValue);
    persistState(segment,accountRow.account,newValue)
    props.summaryTrigger(newValue)
  };

  return (
    <TableRow key={props.segment-accountRow.account}>
      <TableCell component="th" scope="row">{accountRow.account}</TableCell>
      <TableCell>{accountRow.revenue}</TableCell>
      <TableCell align="right"><PercentIncrease value={accountIncreaseValue} changer={handleAccountChange} default={accountIncreaseValue}/></TableCell>
      <TableCell align="right">{getAdjustedRevenue(accountRow.revenue,accountIncreaseValue)}</TableCell>
      <TableCell align="right">{accountRow.targetRevenue}</TableCell>
      <TableCell align="right">{getAdjustedRevenue(accountRow.revenue,accountIncreaseValue)-accountRow.targetRevenue}</TableCell>
    </TableRow>
  )
}

function TotalsRow(props) {

  let revenueData = getRevenueData(props.segments, props.salesperson)

  let sums = getSums(revenueData)

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell/>
        <TableCell component="th" scope="row">Totals</TableCell>
        <TableCell align="right">{sums.Revenue}</TableCell>
        <TableCell align="right">n/a</TableCell>
        <TableCell align="right">{sums.AdjustedRevenue}</TableCell>
        <TableCell align="right">{sums.TargetRevenue}</TableCell>
        <TableCell align="right">{sums.AdjustedRevenue-sums.TargetRevenue}</TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const getAdjustedRevenue = (revenue, increasePercent) => {
  return increasePercent ? (revenue * (1+increasePercent/100)).toFixed(): revenue;
};

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <SegmentRow row={row} open={open} setOpen={setOpen} summaryTrigger={props.summaryTrigger}/>
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
                  {row.accounts.map((accountRow) => (
                    <AccountRow row={accountRow} segment={row.name} summaryTrigger={props.summaryTrigger}/>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
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
            <TableCell align="center" colSpan={9}>
              <Typography>date tabs</Typography>
            </TableCell>
          </TableRow>
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
          {getRevenueData(props.segments,props.salesperson).map((row) => (
            <Row key={row.name} row={row} summaryTrigger={setTrigger}/>
          ))}
          <TotalsRow segments={props.segments} salesperson={props.salesperson} trigger={trigger}/>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
