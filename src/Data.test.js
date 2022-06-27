import {getRevenueData} from './Data';

test('segment filtering works', () => {
  let data = getRevenueData("Microsoft","",revenueData.slice(0,1));
  expect(data.length==1);
});

test('empty segment returns all data', () => {
  let data = getRevenueData("",null,revenueData);
  expect(data.length==3);
});

test('salesperson filtering works', () => {
  let data = getRevenueData("","janey",revenueData);
  console.log(data)
  expect(data.length==1 && data[0].accounts.length==1);
});

test('multi-segment salesperson filtering works', () => {
  let data = getRevenueData("","jane",revenueData);
  expect(data.length==2 && data[0].accounts.length==1  && data[1].accounts.length==1);
});

test('segment+salesperson filtering works', () => {
  let data = getRevenueData("T-Mobile","jane",revenueData);
  expect(data.length==1 && data[0].name == "T-Mobile" && data[0].accounts.length==1);
});

const revenueData = [
  {
    "name": "T-Mobile",
    "revenue": 159,
    "targetRevenue": 170,
    "accounts": [
      {
        account: 'atlas',
        revenue: 10,
        targetRevenue: 13,
        salesperson: "jane"
      },
      {
        account: 'expert assist',
        revenue: 52,
        targetRevenue: 60,
        salesperson: "janey"
      }
    ]
  },
  {
    "name": "Microsoft",
    "revenue": 237,
    "targetRevenue": 250,
    "accounts": [
      {
        account: 'digital marketing',
        revenue: 19,
        targetRevenue: 18,
        salesperson: "joe"
      },
      {
        account: 'azure analytics',
        revenue: 6,
        targetRevenue: 8,
        salesperson: "joey"
      }
    ]
  },
  {
    "name": "Sempra",
    "revenue": 262,
    "targetRevenue": 166,
    "accounts": [
      {
        account: 'myaccount re-arch',
        revenue: 99,
        targetRevenue: 105,
        salesperson: "ben"
      },
      {
        account: 'digital fortress',
        revenue: 4,
        targetRevenue: 5,
        salesperson: "ben"
      },
      {
        account: 'digital fortress part two',
        revenue: 4,
        targetRevenue: 5,
        salesperson: "jane"
      }
    ]
  }
];