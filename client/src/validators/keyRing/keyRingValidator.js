const checker = require("../is-empty");

module.exports.keyRingInput = data => {
    let errors = {};
    if (!checker.isStringAndNotEmpty(data.type)) {
        errors.detailstype = "Details Type field is required";
    }
    if (!checker.isStringAndNotEmpty(data.shape)) {
        errors.shape = "Shape field is required";
    }

    if (!checker.isStringAndNotEmpty(data.keyRingPicture)) {
        errors.keyRingPicture = "KeyRing Picture field is required";
    }
    if (!checker.isStringAndNotEmpty(data.design)) {
        errors.design = "Design field is required";
    }
    if (!checker.isBoolean(data.both)) {
        errors.both = "Both should be boolean";
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
        errors.detailstype = "Details Type field is required";
    }
    if (!checker.isStringAndNotEmpty(data.shape)) {
        errors.shape = "Shape field is required";
    }

    if (!checker.isBoolean(data.both)) {
        errors.both = "Both should be boolean";
    }

    return {
        errors,
        isValid: checker.isEmpty(errors)
    };
};
