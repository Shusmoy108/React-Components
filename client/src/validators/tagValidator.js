const checker = require("./is-empty");

module.exports.tagInput = data => {
    let errors = {};
    //console.log(Validator.isInt(data.offerPercentage));
    //console.log(Validator.isBoolean(data.offerAvailable));
    // console.log(data);

    // console.log(typeof data.offerAvailable);
    // console.log(
    //     data.offerAvailable,
    //     checker.isNumber(data.offerPercentage),
    //     checker.isNumber(data.profitMargin),
    //     data.profitMargin
    // );
    // console.log(checker.isBoolean(data.offerAvailable));

    if (!checker.isBoolean(data.offerAvailable)) {
        errors.offerAvailable = "OfferAvailable field is required";
    }

    // console.log(checker.isNumber(data.offerPercentage));
    if (
        data.offerAvailable &&
        (!checker.isNumber(data.offerPercentage) ||
            parseInt(data.offerPercentage, 10) <= 0)
    ) {
        errors.offerPercentage = "OfferPercentage field is required";
    }
    // console.log(parseInt(data.profitMargin, 10) <= 0, "parseint");

    if (
        !checker.isNumber(data.profitMargin) ||
        parseInt(data.profitMargin, 10) < 0
    ) {
        errors.profitMargin = "ProfitMargine field is required";
    }

    if (!checker.isStringAndNotEmpty(data.name)) {
        errors.name = "Name field is required";
    }
    //console.log(errors);
    return {
        errors,
        isValid: checker.isEmpty(errors)
    };
};
