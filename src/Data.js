export function getAccountData(segments, salesperson, accountDataForTest) {

  // input revenue data to support unit testing, o.w. get
  // data from query
  let revenueData = accountDataForTest ? accountDataForTest.slice() : accountDataQuery.slice()
  
  // filter by segment and salesperson
  if (segments && segments.length > 0 && salesperson) {
    return revenueData.filter( (item) => {
      return segments.includes(item.name) && item.salesperson === salesperson;
    })
  } else if (segments && segments.length > 0 && !salesperson) {
    return revenueData.filter( (item) => {
      return segments.includes(item.name);
    })
  } else if ((!segments || (segments && segments.length === 0)) && salesperson) {
    return revenueData.filter( (item) => {
      return item.salesperson === salesperson;
    })
  } else {
    return revenueData
  }
};

export function getSegments(segments, salesperson, accountDataForTest) {
  let uniqueSegments = new Set()

  let revenueData = accountDataForTest ? getAccountData(segments, salesperson, accountDataForTest)
                                       : getAccountData(segments, salesperson)

  revenueData.forEach(item => {
    uniqueSegments.add(item.name)
  })

  return Array.from(uniqueSegments)
}

// temporary canned data
const accountDataQuery = [
  {
    account: 'atlas',
    name: "T-Mobile",
    revenue: 10,
    targetRevenue: 13,
    salesperson: "jane",
    practice: "digital transformation"
  },
  {
    account: 'expert assist',
    name: "T-Mobile",
    revenue: 52,
    targetRevenue: 60,
    salesperson: "jane",
    practice: "digital transformation"
  },
  {
    account: 'digital marketing',
    name: "Microsoft",
    revenue: 19,
    targetRevenue: 18,
    salesperson: "joe",
    practice: "advanced analytics"
  },
  {
    account: 'azure analytics',
    name: "Microsoft",
    revenue: 6,
    targetRevenue: 8,
    salesperson: "joey",
    practice: "advanced analytics"
  },
  {
    account: 'myaccount re-arch',
    name: "Sempra",
    revenue: 99,
    targetRevenue: 105,
    salesperson: "ben",
    practice: "digital transformation"
  },
  {
    account: 'digital fortress',
    name: "Sempra",
    revenue: 4,
    targetRevenue: 5,
    salesperson: "ben",
    practice: "digital transformation"
  }
];