import { powerBIQueryAPI } from "./authConfig";

export async function ExecuteQuery(accessToken) {
  const headers = new Headers();
  const bearer = `Bearer ${accessToken}`;

  const query = {
    "queries": [
      {
        "query": "EVALUATE VALUES('weekly person')"
      }
    ],
    "serializerSettings": {
      "includeNulls": true
    },
    // this field is required but is ignored by power bi
    "impersonatedUserName": "someuser@mycompany.com"
  }

  // console.log(accessToken)
  headers.append("Authorization", bearer);
  headers.append("Content-Type", "application/json");

  const options = {
      method: "POST",
      headers: headers,
      body: JSON.stringify(query)
  };

  return fetch(powerBIQueryAPI.executeQueryEndpoint, options)
      .then(response => response.json())
      .catch(error => console.log(error));
}

export function NormalizeData(rawResults) {

  let segmentSet = new Set()
  let effectiveDateSet = new Set()
  let salespersonSet = new Set()
  let normalizedData = {}

  let options = { year: 'numeric', month: 'long', day: 'numeric' };

  if (rawResults && rawResults.results[0] && rawResults.results[0].tables[0] &&
    rawResults.results[0].tables[0].rows) {

    normalizedData = rawResults.results[0].tables[0].rows.map((item) => {

      segmentSet.add(item["weekly person[Segmentation]"])
      salespersonSet.add(item["weekly person[Salesperson]"])
      let effectiveDate = item["weekly person[Effective Date]"] ? (new Date(item["weekly person[Effective Date]"])).toLocaleString('en-US',options) : null
      effectiveDateSet.add(effectiveDate)

      return {
        account: item["weekly person[Account]"],
        practice: item["weekly person[Practice]"],
        segment: item["weekly person[Segmentation]"],
        salesperson: item["weekly person[Salesperson]"],
        monthYear: item["weekly person[Month Year]"],
        revenue: item["weekly person[Revenue]"] ? parseInt(item["weekly person[Revenue]"]) : 0,
        targetRevenue: item["weekly person[Target Revenue]"] ? parseInt(item["weekly person[Target Revenue]"]) : 0,
        effectiveDate: effectiveDate
      }
    })

    return {
      data: normalizedData,
      allSegments: Array.from(segmentSet),
      allSalespersons: Array.from(salespersonSet),
      allEffectiveDates: Array.from(effectiveDateSet),
    }
  }
  else {
    return null
  }
}
