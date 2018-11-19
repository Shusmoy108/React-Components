const checker = require("../is-empty");

module.exports.mugStockInput = data => {
    let errors = {};
    if (!checker.isStringAndNotEmpty(data.type)) {
        errors.type = "Type field is required";
    }
    if (!checker.isStringAndNotEmpty(data.color)) {
        errors.color = "Color field is required";
    }
    if (!checker.isBoolean(data.available)) {
        errors.available = "Available field is required";
    }
    if (data.available && !checker.isNumber(data.stock)) {
        errors.stock = "Stock field is required";
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
