const checker = require("../is-empty");

module.exports.keyRingPrintCostInput = data => {
    let errors = {};
    if (!checker.isStringAndNotEmpty(data.product)) {
        errors.product = "product field is required";
    }
    if (!checker.isStringAndNotEmpty(data.type)) {
        errors.type = "type field is required";
    }


    // if (!checker.isDate(data.createdAt)) {
    //     errors.createdAt = "createdAt field should be date";
    // }


    if (!checker.isArrayAndNotEmpty(data.costs)) {
        errors.costs = "Costs should be array";

    }
    if (checker.isArrayAndNotEmpty(data.costs)) {
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
