const Validator = require("validator");
const { isEmpty, isArray, isNumber, isMongoId } = require("./is-empty");

/* 
  ***Inserting a new product 
*/
module.exports.insertNewProduct = data => {
    let errors = {};
    data.name = !isEmpty(data.name) ? data.name : "";
    data.category = !isEmpty(data.category) ? data.category : "";
    data.imageLinkHover = !isEmpty(data.imageLinkHover)
        ? data.imageLinkHover
        : "";
    data.productPage = !isEmpty(data.productPage) ? data.productPage : "";

    data.profitMargin = !isEmpty(data.profitMargin) ? data.profitMargin : "";
    data.costing = !isEmpty(data.costing) ? data.costing : "";

    if (data.file === "") {
        errors.file = "No image has selected";
    }

    if (Validator.isEmpty(data.name)) {
        errors.name = "Name field is invalid";
    }

    if (Validator.isEmpty(data.category)) {
        errors.category = "Category field is invalid";
    }

    if (Validator.isEmpty(data.productPage)) {
        errors.productPage = "Product Page field is invalid";
    }

    if (typeof data.offerAvailable !== "boolean") {
        errors.offerAvailable = "Offer Available field is invalid";
    } else {
        if (data.offerAvailable) {
            if (
                !isNumber(data.offerPercentage) ||
                parseInt(data.offerPercentage, 10) < 0
            ) {
                errors.offerPercentage = "Offer Percentage field is invalid";
            }
        } else {
            if (data.offerPercentage) {
                errors.offerPercentage =
                    "Offer Percentage field not applicable";
            }
        }
    }

    if (!isNumber(data.profitMargin) || parseInt(data.profitMargin, 10) < 0) {
        errors.profitMargin = "Profit Margin field is invalid";
    }

    if (!isNumber(data.costing) || parseInt(data.costing, 10) < 0) {
        errors.costing = "Costing field is invalid";
    }

    if (
        (data.hitCount !== "" && !isNumber(data.hitCount)) ||
        parseInt(data.hitCount, 10) < 0
    ) {
        errors.hitCount = "Hit Count field is invalid";
    }

    if (
        (data.rating !== "" && !isNumber(data.rating)) ||
        parseInt(data.rating, 10) < 0
    ) {
        errors.rating = "Rating field is invalid";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};

/* 
  ***Update a  product Dimensions on Id 
*/
module.exports.updateProductDimensionsOnId = data => {
    let errors = {};

    data.profitMargin = !isEmpty(data.profitMargin) ? data.profitMargin : "";

    if (!isMongoId(data.id)) {
        errors.id = "Mongo Id field is invalid";
    }

    if (typeof data.offerAvailable !== "boolean") {
        errors.offerAvailable = "Offer Available field is invalid";
    } else {
        if (data.offerAvailable) {
            if (
                !isNumber(data.offerPercentage) ||
                parseInt(data.offerPercentage, 10) <= 0
            ) {
                errors.offerPercentage = "Offer Percentage field is invalid";
            }
        } else {
            if (data.offerPercentage) {
                errors.offerPercentage =
                    "Offer Percentage field not applicable";
            }
        }
    }

    if (!isNumber(data.profitMargin) || parseInt(data.profitMargin, 10) <= 0) {
        errors.profitMargin = "Profit Margin field is invalid";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};

/* 
  ***Update a  product details on Id*** 
*/
module.exports.updateProductDetailsOnId = data => {
    let errors = {};
    data.category = !isEmpty(data.category) ? data.category : "";

    if (!isMongoId(data.id)) {
        errors.id = "Mongo Id field is invalid";
    }
    if (typeof data.name !== "string") {
        errors.name = "Name field is invalid";
    }

    if (Validator.isEmpty(data.category)) {
        errors.category = "Category field is invalid";
    }

    if (!isArray(data.type) && data.type !== undefined) {
        errors.type = "Type field is invalid";
    }

    if (typeof data.productPage !== "string") {
        errors.productPage = "Product Page field is invalid";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};

/* 
  ***Update rating of a Product 
*/
module.exports.updateRatingOnProductId = data => {
    let errors = {};

    if (!isMongoId(data.id)) {
        errors.id = "Mongo Id field is invalid";
    }

    if (!isNumber(data.rating) || parseInt(data.rating, 10) < 0) {
        errors.rating = "Rating field is invalid";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};
