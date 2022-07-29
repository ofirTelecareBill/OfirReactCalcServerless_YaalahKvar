const Responses = require('../common/API_Responses');
const Dynamo = require('../common/Dynamo');

const tableName = process.env.DYNAMODB_TABLE;

exports.handler = async (event) => {
    console.log('event', event);

    if (!event.pathParameters || !event.pathParameters.ID) {
        // failed without an id
        return Responses._400({message: 'missing the id from path'});
    }

    let ID = event.pathParameters.ID;

    const calculation = await Dynamo.get(ID, tableName).catch(err => {
        console.log("error in Dynamo get", err);
        return null;
    })

    if (!calculation) {
        return Responses._400({message: 'Failed to get calculation by ID'});
    }

    return Responses._200(calculation);

};