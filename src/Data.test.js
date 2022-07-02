import {getAccountData, getSegments} from './Data';

test('segment filtering works', () => {
  let data = getAccountData("Microsoft","",revenueData);
  expect(data.length==2).toBe(true);
});

test('empty segment returns all data', () => {
  let data = getAccountData("",null,revenueData);
  expect(data.length==7).toBe(true);
});

test('salesperson filtering works', () => {
  let data = getAccountData(null,"janey",revenueData);
  expect(data.length==1).toBe(true);
});

test('multi-segment salesperson filtering works', () => {
  let data = getAccountData("","jane",revenueData);
  expect(data.length==2).toBe(true);
});

test('segment+salesperson filtering works', () => {
  let data = getAccountData("T-Mobile","jane",revenueData);
  expect(data[0].name == "T-Mobile" && data.length==1).toBe(true);
});

test('get all segments works', () => {
  let data = getSegments([], "", revenueData);
  expect(data.length==3).toBe(true);
});

test('get 2 segments works', () => {
  let data = getSegments(["Microsoft","T-Mobile"], "", revenueData);
  expect(data.length==2).toBe(true);
});

test('get segments associated with a single salesperson', () => {
  let data = getSegments([], "ben", revenueData);
  console.log(data)
  expect(data.length==1).toBe(true);
});

const revenueData = [
  {
    name: "T-Mobile",
    account: 'atlas',
    revenue: 10,
    targetRevenue: 13,
    salesperson: "jane"
  },
  {
    name: "T-Mobile",
    account: 'expert assist',
    revenue: 52,
    targetRevenue: 60,
    salesperson: "janey"
  },
  {
    name: "Microsoft",
    account: 'digital marketing',
    revenue: 19,
    targetRevenue: 18,
    salesperson: "joe"
  },
  {
    name: "Microsoft",
    account: 'azure analytics',
    revenue: 6,
    targetRevenue: 8,
    salesperson: "joey"
  },
  {
    name: "Sempra",
    account: 'myaccount re-arch',
    revenue: 99,
    targetRevenue: 105,
    salesperson: "ben"
  },
  {
    name: "Sempra",
    account: 'digital fortress',
    revenue: 4,
    targetRevenue: 5,
    salesperson: "ben"
  },
  {
    name: "Sempra",
    account: 'digital fortress part two',
    revenue: 4,
    targetRevenue: 5,
    salesperson: "jane"
  }
];