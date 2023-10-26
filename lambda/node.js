exports.handler = async function (event) {
  console.log("request:", JSON.stringify(event, undefined, 2));

  json_data = {
    account: `${process.env.acctid.replace(/\d(?=\d{4})/g, "*")}`,
    region: `${process.env.region}`,
  };
  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(json_data),
  };
};
