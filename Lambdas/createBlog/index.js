const ULID = require("ulid");

const { DYNAMODB } = process.env;
const { createItem } = require("../ddb-helpers");

exports.handler = async event => {
  const id = ULID.ulid();

  const params = {
    TableName: DYNAMODB,
    Item: {
      id,
      title: event.input.title,
      blogUrl: event.input.blogUrl,
      author: event.input.author,
      publicationDate: event.input.publicationDate
    }
  };

  try {
    await createItem(params);
    return {
      statusCode: 201,
      body: params.Item
    };
  } catch (err) {
    console.log("err-", err);
    return {
      statusCode: 500,
      body: JSON.stringify(err)
    };
  }
};
