export function getRevenueData(segments, salesperson, revenueDataInput) {

  // input revenue data to support unit testing, o.w. get
  // data from query
  // note: use structured clone to make a deep copy, including the accounts sub-array
  let revenueData = revenueDataInput ? structuredClone(revenueDataInput) : structuredClone(revenueDataQuery)
  
  // filter by segment
  let filteredBySegment = segments.length > 0 ? revenueData.filter( (item) => {
    return segments.includes(item.name);
  }) : revenueData

  // filter accounts by salesperson
  filteredBySegment.forEach((item)=>{
    item.accounts = salesperson ?  item.accounts.filter( (account) => {
      return account.salesperson === salesperson;
    }) : item.accounts;
  })

  // filter segments that have empty accounts
  return filteredBySegment.filter( (item) => {
    return item.accounts.length > 0;
  });
};

export function getSegments() {
  return [
    "T-Mobile",
    "Microsoft",
    "Sempra"
  ]
}

// temporary canned data
const revenueDataQuery = [
  {
    "name": "T-Mobile",
    "accounts": [
      {
        account: 'atlas',
        revenue: 10,
        targetRevenue: 13,
        salesperson: "jane",
        practice: "digital transformation"
      },
      {
        account: 'expert assist',
        revenue: 52,
        targetRevenue: 60,
        salesperson: "jane",
        practice: "digital transformation"
      }
    ]
  },
  {
    "name": "Microsoft",
    "accounts": [
      {
        account: 'digital marketing',
        revenue: 19,
        targetRevenue: 18,
        salesperson: "joe",
        practice: "advanced analytics"
      },
      {
        account: 'azure analytics',
        revenue: 6,
        targetRevenue: 8,
        salesperson: "joey",
        practice: "advanced analytics"
      }
    ]
  },
  {
    "name": "Sempra",
    "accounts": [
      {
        account: 'myaccount re-arch',
        revenue: 99,
        targetRevenue: 105,
        salesperson: "ben",
        practice: "digital transformation"
      },
      {
        account: 'digital fortress',
        revenue: 4,
        targetRevenue: 5,
        salesperson: "ben",
        practice: "digital transformation"
      }
    ]
  }
];