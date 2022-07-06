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

export function ReduceData(rawResults) {

  if (rawResults && rawResults.results[0] && rawResults.results[0].tables[0] &&
    rawResults.results[0].tables[0].rows) {

      return rawResults.results[0].tables[0].rows.map((item) => {

        return {
          account: item["weekly person[Account]"],
          practice: item["weekly person[Practice]"],
          segment: item["weekly person[Segmentation]"],
          salesperson: item["weekly person[Salesperson]"],
          monthYear: item["weekly person[Month Year]"],
          revenue: parseInt(item["weekly person[Revenue]"]),
          targetRevenue: item["weekly person[Target Revenue]"] ? parseInt(item["weekly person[Target Revenue]"]) : 0
        }
      })
    }
    else {
      return null
    }
  }

/**
 * Renders information about the user obtained from MS Graph
 * @param props 
 */
 export const RevenueData = (props) => {

  if (props.accountData) {
    return (
      <table>
        <tbody>
          <tr>
            <th>Account</th>
            <th>Practice</th>
            <th>Segment</th>
            <th>Salesperson</th>
            <th>Month Year</th>
            <th>Revenue</th>
            <th>Target Revenue</th>
          </tr>
          {props.accountData.map( item => {
            return (
              <tr>
                <td>{item.account}</td>
                <td>{item.practice}</td>
                <td>{item.segment}</td>
                <td>{item.salesperson}</td>
                <td>{item.monthYear}</td>
                <td>{item.revenue}</td>
                <td>{item.targetRevenue}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    )

  } else {
    return (
      <h3>sad trombone - looks like you don't have read privies on the dataset</h3>
    )
  }
};