export function getRevenueData(segment, salesperson, revenueDataInput) {

  // input revenue data to support unit testing, o.w. get
  // data from query
  // note: use structured clone to make a deep copy, including the accounts sub-array
  let revenueData = revenueDataInput ? structuredClone(revenueDataInput) : structuredClone(revenueDataQuery)
  
  // filter by segment
  let filteredBySegment = segment ? revenueData.filter( (item) => {
    return item.name == segment;
  }) : revenueData

  // filter accounts by salesperson
  filteredBySegment.forEach((item)=>{
    item.accounts = salesperson ?  item.accounts.filter( (account) => {
      return account.salesperson == salesperson;
    }) : item.accounts;
  })

  // filter segments that have empty accounts
  return filteredBySegment.filter( (item) => {
    return item.accounts.length > 0;
  });
};

// temporary canned data
const revenueDataQuery = [
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
        salesperson: "jane"
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
      }
    ]
  }
];