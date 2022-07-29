const AWS = require('aws-sdk');

const documentClient = new AWS.DynamoDB.DocumentClient();

const Dynamo = {
    async get (ID, TableName) {
        const params = {
            TableName,
            Key: {
                ID
            }
        };

        const data = await documentClient
        .get(params)
        .promise()

        if (!data || !data.Item) {
            throw Error (`There was an error fetching the data for ID of ${ID} from ${TableName}`)
        }

        console.log(data);

        return data.Item;
    },

    async write (data, TableName) {
        if (!data.ID) {
            throw Error('no ID on the data');
        }

        const params = {
            TableName,
            Item: data
        };

        const res = await documentClient.put(params).promise();

        if (!res) {
            throw Error(`There was an error inserting ID of ${data.id} in table ${TableName}`)
        }

        return data;
    },

    async getAllItems(TableName) {
        const params = {
            TableName
        };

        const data = await documentClient.scan(params).promise();
        if (!data || !data.Items) {
            throw Error (`There was an error with Scan from ${TableName}`)
        }

        console.log(data.items);

        return data.Items;
    }

};

module.exports = Dynamo;