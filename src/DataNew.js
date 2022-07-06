export function getAccountData(segments, salesperson, accountDataForTest) {

  // input revenue data to support unit testing, o.w. get
  // data from query
  let revenueData = accountDataForTest ? accountDataForTest.slice() : accountDataQuery.slice()
  
  // filter by segment and salesperson
  return revenueData.filter( (item) => {
      return (segmentFilter(item, segments) && salesPersonFilter(item, salesperson));
  })
};

function segmentFilter(item, segments) {
  if (segments && segments.length && segments.includes(item.segment)) {
    return true
  } else if (!segments || (segments && segments.length === 0)) {
    return true
  } else {
    return false
  }
}

function salesPersonFilter(item, salesperson) {
  if (salesperson && item.salesperson === salesperson) {
    return true
  } else if (!salesperson) {
    return true
  } else {
    return false
  }
}

export function getSegments(segments, salesperson, accountDataForTest) {
  let uniqueSegments = new Set()

  let revenueData = accountDataForTest ? getAccountData(segments, salesperson, accountDataForTest)
                                       : getAccountData(segments, salesperson)

  revenueData.forEach(item => {
    uniqueSegments.add(item.segment)
  })

  return Array.from(uniqueSegments)
}
