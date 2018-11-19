// const Validator = require("validator");
const checker = require("./is-empty");

module.exports.loginUsername = data => {
	let errors = {};


	if (!checker.isStringAndNotEmpty(data.username)) {
		errors.username = "Username field is not correct";
	}

	if (!checker.isStringAndNotEmpty(data.password)) {
		errors.password = "Password field is required";
	}

	return {
		errors,
		isValid: checker.isEmpty(errors)
	};
};

module.exports.changePassword = data => {
	let errors = {};

	if (!checker.isStringAndNotEmpty(data.username)) {
		errors.username = "Username field is not correct";
	}

	if (!checker.isStringAndNotEmpty(data.oldPassword)) {
		errors.oldPassword = "Old Password field is required";
    }
    
    if (!checker.isStringAndNotEmpty(data.newPassword)) {
		errors.newPassword = "New Password field is required";
	}

	return {
		errors,
		isValid: checker.isEmpty(errors)
	};
};
