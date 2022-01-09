const { DYNAMODB } = process.env;

const { updateItem } = require("../ddb-helpers");

exports.handler = async event => {
  console.log("Event-", event);
  const blogDetails = event;
  const { id } = blogDetails;

  delete blogDetails.id;

  let updateExpression = "set";
  const ExpressionAttributeNames = {};
  const ExpressionAttributeValues = {};

  Object.keys(blogDetails).forEach(key => {
    updateExpression += ` #${key} = :${key} ,`;
    ExpressionAttributeNames[`#${key}`] = key;
    ExpressionAttributeValues[`:${key}`] = blogDetails[key];
  });

  updateExpression = updateExpression.slice(0, -1);

  const params = {
    TableName: DYNAMODB,
    Key: {
      id
    },
    UpdateExpression: updateExpression,
    ExpressionAttributeNames,
    ExpressionAttributeValues,
    ReturnValues: "UPDATED_NEW"
  };

  try {
    const data = await updateItem(params);

    if (!("Attributes" in data)) {
      return {
        statusCode: 404,
        body: "Blog not found"
      };
    }

    data.Attributes.id = id;

    return {
      statusCode: 200,
      body: data.Attributes
    };
  } catch (err) {
    console.log("err", err);
    return {
      statusCode: 500,
      body: err
    };
  }
};
