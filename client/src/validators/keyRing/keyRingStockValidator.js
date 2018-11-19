const checker = require("../is-empty");

module.exports.keyRingStockInput = data => {
    let errors = {};
    if (!checker.isStringAndNotEmpty(data.type)) {
        errors.type = "Type field is required";
    }
    if (!checker.isStringAndNotEmpty(data.shape)) {
        errors.shape = "Shape field is required";
    }


    if (data.available && !checker.isNumber(data.stock)) {
        errors.stock = "Stock field should be number";
    }

    if (!checker.isBoolean(data.available)) {
        errors.availablle = "Available should be boolean";
    }
    if (!checker.isArrayAndNotEmpty(data.costs)) {
        errors.costs = "Costs should be array and not empty";

    }
    if (checker.isArray(data.costs)) {
        if (data.costs.length > 0) {
            for (var i = 0; i < data.costs.length; i++) {
                if (!checker.isNumber(data.costs[i].value) || !checker.isNumber(data.costs[i].price)) {
                    errors.costs = "All elements Costs should be number";

                }
            }
        }

    }
    return {
        errors,
        isValid: checker.isEmpty(errors)
    };
};


module.exports.idInput = id => {
    let errors = {};

    if (!checker.isMongoId(id)) {
        errors.id = "Mongo Id field is invalid";
    }

    return {
        errors,
        isValid: checker.isEmpty(errors)
    };
};

module.exports.designInput = data => {
    let errors = {};

    if (!checker.isStringAndNotEmpty(data.keyRingPicture)) {
        errors.keyRingPicture = "Key Ring Picture field is required";
    }
    if (!checker.isStringAndNotEmpty(data.design)) {
        errors.design = "Design field is required";
    }


    return {
        errors,
        isValid: checker.isEmpty(errors)
    };
};

module.exports.specificationInput = data => {
    let errors = {};
    if (!checker.isStringAndNotEmpty(data.type)) {
        errors.shape = "Details Type field is required";
    }
    if (!checker.isStringAndNotEmpty(data.color)) {
        errors.type = "Color field is required";
    }

    if (!checker.isBoolean(data.both)) {
        errors.both = "Both should be boolean";
    }

    return {
        errors,
        isValid: checker.isEmpty(errors)
    };
};
