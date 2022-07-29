const Responses = require('../common/API_Responses');

module.exports.handler = async (event) => {
    console.log(`calculate Handler: Event: ${event}`);

    const { operand1, operand2, operator } = JSON.parse(event.body);
    console.log('operand1', operand1);
    console.log('operand2', operand2);
    console.log('operator', operator);

    let calculation = JSON.parse(event.body);
    console.log('Calulation from event.body:', calculation);
    if (!calculation){
        return Responses._400({message: 'No Calculation in body'});
    }

    let result = 0;

    switch (operator)
    {
        case "+":
            result = operand1 + operand2;
            break;
        case "-":
            result = operand1 - operand2;
            break;
        case "*":
        case "X":
        case "x":
            result = operand1 * operand2;
            break;
        case "/":
            if (operand2 === "0") {
                result = "Can't divide with 0";
            }
            else {
                result = operand1 / operand2;
            }
            break;
    }

    calculation.result = result;

    return Responses._200(calculation);
};