import {getRelevantAccountData, getRelevantSegments} from './DataNew';

test('segment filtering works', () => {
  let data = getRelevantAccountData(revenueData, "Microsoft","");
  expect(data.length).toBe(2);
});

test('empty segment returns all data', () => {
  let data = getRelevantAccountData(revenueData, "",null);
  expect(data.length).toBe(7);
});

test('salesperson filtering works', () => {
  let data = getRelevantAccountData(revenueData, null,"janey");
  expect(data.length).toBe(1);
});

test('multi-segment salesperson filtering works', () => {
  let data = getRelevantAccountData(revenueData, "","jane");
  expect(data.length).toBe(2);
});

test('segment+salesperson filtering works', () => {
  let data = getRelevantAccountData(revenueData, "T-Mobile","jane");
  expect(data[0].segment == "T-Mobile" && data.length==1).toBe(true);
});

test('get all segments works', () => {
  let data = getRelevantSegments(revenueData, [], "");
  expect(data.length).toBe(3);
});

test('get 2 segments works', () => {
  let data = getRelevantSegments(revenueData, ["Microsoft","T-Mobile"], "");
  expect(data.length).toBe(2);
});

test('get segments associated with a single salesperson', () => {
  let data = getRelevantSegments(revenueData, [], "ben");
  expect(data.length).toBe(1);
});

const revenueData = [
  {
    segment: "T-Mobile",
    account: 'atlas',
    revenue: 10,
    targetRevenue: 13,
    salesperson: "jane"
  },
  {
    segment: "T-Mobile",
    account: 'expert assist',
    revenue: 52,
    targetRevenue: 60,
    salesperson: "janey"
  },
  {
    segment: "Microsoft",
    account: 'digital marketing',
    revenue: 19,
    targetRevenue: 18,
    salesperson: "joe"
  },
  {
    segment: "Microsoft",
    account: 'azure analytics',
    revenue: 6,
    targetRevenue: 8,
    salesperson: "joey"
  },
  {
    segment: "Sempra",
    account: 'myaccount re-arch',
    revenue: 99,
    targetRevenue: 105,
    salesperson: "ben"
  },
  {
    segment: "Sempra",
    account: 'digital fortress',
    revenue: 4,
    targetRevenue: 5,
    salesperson: "ben"
  },
  {
    segment: "Sempra",
    account: 'digital fortress part two',
    revenue: 4,
    targetRevenue: 5,
    salesperson: "jane"
  }
];