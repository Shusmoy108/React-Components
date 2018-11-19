const checker = require("../is-empty");

module.exports.penInput = data => {
    let errors = {};
    if (!checker.isStringAndNotEmpty(data.type)) {
        errors.type = "Type field is required";
    }
    if (!checker.isStringAndNotEmpty(data.design)) {
        errors.design = "Design field is required";
    }
    if (!checker.isStringAndNotEmpty(data.penPicture)) {
        errors.penPicture = "Pen Picture field is required";
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
        data.costs.map(cost => {
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
module.exports.designInput = data => {
    let errors = {};

    if (!checker.isStringAndNotEmpty(data.penPicture)) {
        errors.penPicture = "Pen Picture field is required";
    }
    if (!checker.isStringAndNotEmpty(data.design)) {
        errors.design = "Design field is required";
    }

    return {
        errors,
        isValid: checker.isEmpty(errors)
    };
};
