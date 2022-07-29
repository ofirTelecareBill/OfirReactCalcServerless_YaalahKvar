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
    let calculation = JSON.parse(event.body);
    console.log('Calulation from event.body:', calculation);
    calculation.ID = ID;
    console.log('Calulation after setting ID:', calculation);

    console.log(`New Calulation: ${calculation}`);

    const newCalculation = await Dynamo.write(calculation, tableName).catch(err => {
        console.log('error in Dynamo write', err);
        return null;
    })
    

    if (!newCalculation) {
        return Responses._400({message: 'Failed to write calculation by ID'});
    }

    return Responses._200(newCalculation);
};