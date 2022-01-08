const { DYNAMODB } = process.env;
const { deleteItem } = require("../ddb-helpers");

exports.handler = async event => {
  const params = {
    TableName: DYNAMODB,
    Key: {
      id: event.id
    }
  };

  try {
    await deleteItem(params);
    return {
      statusCode: 204,
      body: `Blog with ID - ${event.id} is deleted successfully`
    };
  } catch (err) {
    console.log("err", err);
    return {
      statusCode: 500,
      body: err
    };
  }
};
