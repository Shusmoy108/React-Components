const checker = require("../is-empty");

module.exports.mugInput = data => {
    let errors = {};
    if (!checker.isStringAndNotEmpty(data.type)) {
        errors.detailstype = "Details Type field is required";
    }
    if (!checker.isStringAndNotEmpty(data.color)) {
        errors.color = "Color field is required";
    }
    if (!checker.isStringAndNotEmpty(data.mugPicture)) {
        errors.mugPicture = "Mug Picture field is required";
    }
    if (!checker.isStringAndNotEmpty(data.design)) {
        errors.design = "Design field is required";
    }
    return {
        errors,
        isValid: checker.isEmpty(errors)
    };
};

module.exports.designInput = data => {
    let errors = {};

    if (!checker.isStringAndNotEmpty(data.mugPicture)) {
        errors.mugPicture = "Mug Picture field is required";
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
    if (!checker.isStringAndNotEmpty(data.color)) {
        errors.detailscolor = "Color field is required";
    }

    return {
        errors,
        isValid: checker.isEmpty(errors)
    };
};
