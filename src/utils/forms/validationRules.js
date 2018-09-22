const validation = (value, rules, form) => {
  let valid = true;
  for (const rule in rules) {
    switch (rule) {
      case 'isRequired':
        valid = valid && validateRequired(value);
        break;
      case 'isEmail':
        valid = valid && validateEmail(value);
        break;
      case 'minLength':
        valid = valid && validateMinLength(value, rules[rule]);
        break;
      case 'confirmPassword':
        valid =
          valid &&
          validateConfirmPassword(value, form[rules.confirmPass].value);
        break;
      default:
        valid = true;
    }
  }
  return valid;
};

const validateConfirmPassword = (confirmPassword, password) => {
  if (confirmPassword === password) {
    return true;
  }
  return false;
};

const validateMinLength = (value, ruleValue) => {
  if (value.length >= ruleValue) {
    return true;
  }
  return false;
};

const validateRequired = value => {
  if (value !== '') {
    return true;
  }
  return false;
};

const validateEmail = email => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export default validation;
