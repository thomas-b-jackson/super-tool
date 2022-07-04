
export async function queryPowerBI(accessToken, queryUri) {
  const headers = new Headers();
  const bearer = `Bearer ${accessToken}`;

  const query = {
    "queries": [
      {
        "query": "EVALUATE VALUES('segmentation')"
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

  // return fetch(queryUri, options)
  //     .then(response => response.json())
  //     .catch(error => console.log(error));
  // return [{"this": "that"}];

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({"data": [{"this": "that"}]});
    }, 1000);
  });
}