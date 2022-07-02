import {getSums} from './Report';

test('revenue summing', () => {
  let sums = getSums(accountData);
  expect(sums.Revenue==194).toBe(true);
});

test('target summing', () => {
  let sums = getSums(accountData);
  expect(sums.TargetRevenue==214).toBe(true);
});

const accountData = [
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