const Responses = require('../common/API_Responses');

exports.handler = async (event) => {
    console.log('event', event);

    if (!event.pathParameters || !event.pathParameters.ID) {
        // failed without an id
        return Responses._400({message: 'missing the id from path'});
    }

    let ID = event.pathParameters.ID;

    if (data[ID]) {
        // return the data
        return Responses._200(data[ID]);
    }

    // failed as ID was not in data

    return Responses._400({message: 'no id in data'});

};

const data = {
    1: {calculation: '5 + 8', date: Date.now()},
    2: {calculation: '6 + 9', date: Date.now()},
  };