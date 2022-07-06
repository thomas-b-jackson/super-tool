export function getRelevantAccountData(revenueData,
                                        segments, 
                                        salesperson, 
                                        monthYear,
                                        effectiveDate) {

  return revenueData ? revenueData.filter( (item) => {
                  return (segmentCheck(item, segments) && 
                          salesPersonCheck(item, salesperson) &&
                          monthYearCheck(item, monthYear))
                }) : null
};

function segmentCheck(item, segments) {
  if (segments && segments.length && segments.includes(item.segment)) {
    return true
  } else if (!segments || (segments && segments.length === 0)) {
    return true
  } else {
    return false
  }
}

function salesPersonCheck(item, salesperson) {
  if (salesperson && item.salesperson === salesperson) {
    return true
  } else if (!salesperson || salesperson=="") {
    return true
  } else {
    return false
  }
}

function monthYearCheck(item, monthYear) {
  if (monthYear && item.monthYear === monthYear) {
    return true
  } else if (!monthYear || monthYear=="") {
    return true
  } else {   
    return false
  }
}

function effectiveDateCheck(item, effectiveDate) {
  if (effectiveDate && item.effectiveDate === effectiveDate) {
    return true
  } else if (!effectiveDate) {
    return true
  } else {
    return false
  }
}

export function getRelevantSegments(accountData, 
                            segments, 
                            salesperson, 
                            monthYear,
                            effectiveDate) {

  let uniqueSegments = new Set()

  let revenueData = getRelevantAccountData(accountData, 
                                           segments, 
                                           salesperson, 
                                           monthYear,
                                           effectiveDate)

  revenueData.forEach(item => {
    uniqueSegments.add(item.segment)
  })

  return Array.from(uniqueSegments)
}
