const { DYNAMODB } = process.env;

const { getItem } = require("../ddb-helpers");

exports.handler = async event => {
  const params = {
    TableName: DYNAMODB,
    Key: {
      id: event.id
    }
  };

  try {
    const data = await getItem(params);

    if (!("Item" in data)) {
      return {
        statusCode: 404,
        body: "Blog not found"
      };
    }

    return {
      statusCode: 200,
      body: data.Item
    };
  } catch (err) {
    console.log("err", err);
    return {
      statusCode: 500,
      body: err
    };
  }
};
