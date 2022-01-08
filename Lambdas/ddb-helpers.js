const AWS = require("aws-sdk");

const ddb = new AWS.DynamoDB.DocumentClient();

async function createItem(params) {
  try {
    return ddb.put(params).promise();
  } catch (err) {
    return err;
  }
}

async function getItem(params) {
  try {
    return ddb.get(params).promise();
  } catch (err) {
    return err;
  }
}

async function updateItem(params) {
  try {
    return ddb.update(params).promise();
  } catch (err) {
    return err;
  }
}

async function deleteItem(params) {
  try {
    return ddb.delete(params).promise();
  } catch (err) {
    return err;
  }
}

module.exports = {
  createItem,
  getItem,
  updateItem,
  deleteItem
};
