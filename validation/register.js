const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  // setting values to empty strings. as if user doesn't enters anything it wont be an empty string and in order for validator to work it must be a string
  data.name = !isEmpty(data.name) ? data.name : "";
  data.username = !isEmpty(data.username) ? data.username : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";
  data.department = !isEmpty(data.department) ? data.department : "";
  data.mobile = !isEmpty(data.mobile) ? data.mobile : "";
  data.joined = !isEmpty(data.joined) ? data.joined : "";

  if (!Validator.isLength(data.name, { min: 3, max: 30 })) {
    errors.name = "Name must be between 3 and 30 characters";
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }

  if (!Validator.isLength(data.username, { min: 3, max: 30 })) {
    errors.username = "Username must be between 3 and 30 characters";
  }

  if (Validator.isEmpty(data.username)) {
    errors.username = "Username field is required";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm Password field is required";
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords must match";
  }

  if (!Validator.isLength(data.department, { min: 2, max: 50 })) {
    errors.department = "Department must be between 2 and 50 characters";
  }

  if (Validator.isEmpty(data.department)) {
    errors.department = "Department field is required";
  }

  if (!Validator.isLength(data.mobile, { max: 10 })) {
    errors.mobile = "Mobile must be 10 digits";
  }

  if (Validator.isEmpty(data.mobile)) {
    errors.mobile = "Mobile field is required";
  }
  // isBefore(str [, date])
  if (!Validator.isLength(data.joined, { max: 10 })) {
    errors.joined = "Joining date must be before today's date";
  }

  if (Validator.isEmpty(data.joined)) {
    errors.joined = "Joining date  is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
