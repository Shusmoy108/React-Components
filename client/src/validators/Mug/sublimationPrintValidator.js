const checker = require("../is-empty");

module.exports.sublimationPrintInput = data => {
    let errors = {};
    if (!checker.isStringAndNotEmpty(data.product)) {
        errors.product = "Product field is required";
    }
    if (!checker.isArrayAndNotEmpty(data.costs)) {
        errors.costs = "Cost field is required";
    } else {
        data.costs.forEach(cost => {
            if (!checker.isNumber(cost.value)) {
                errors.costs = "Cost Value field must be a number";
            }
            if (!checker.isNumber(cost.price)) {
                errors.costs = "Cost Price field must be a number";
            }
        });
    }
    return {
        errors,
        isValid: checker.isEmpty(errors)
    };
};
module.exports.sublimationPrintupdateInput = data => {
    let errors = {};
    if (!checker.isArrayAndNotEmpty(data.costs)) {
        errors.costs = "Cost field is required";
    } else {
        data.costs.forEach(cost => {
            if (!checker.isNumber(cost.value)) {
                errors.costs = "Cost Value field must be a number";
            }
            if (!checker.isNumber(cost.price)) {
                errors.costs = "Cost Price field must be a number";
            }
        });
    }
    return {
        errors,
        isValid: checker.isEmpty(errors)
    };
};