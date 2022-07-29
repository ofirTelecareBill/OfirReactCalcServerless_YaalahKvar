const Responses = require('../common/API_Responses');
const Dynamo = require('../common/Dynamo');

const tableName = process.env.DYNAMODB_TABLE;

exports.handler = async (event) => {
    console.log('event', event);

    const allCalculations = await Dynamo.getAllItems(tableName).catch(err => {
        console.log("error in Dynamo getAllItems", err);
        return null;
    })

    if (!allCalculations) {
        return Responses._400({message: 'Failed to get all calculations'});
    }

    return Responses._200(allCalculations);

};