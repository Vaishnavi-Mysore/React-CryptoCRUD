const STRING = "string";
const OBJECT = "object";

const positiveNumber = (model, key) => {
  if (model[key] === undefined || model[key] === "" || model[key] === null) {
    return { key, message: "Enter an amount to continue" };
  }
  if (parseInt(model[key]) <= 0) {
    return { key, message: "The amount entered should be greater than $0" };
  }
  return null;
};

const zipCodeValidation = (model, key) => {
  let regex = new RegExp(/^(?!0+$)\d{5}$/);
  if (model[key] && !regex.test(model[key])) {
    return { key, message: "This field must contain a valid zip code" };
  }
  return null;
};

const minbinValid = (model, key) => {
  let minBin = key === "minBin" ? model[key] : null;
  let maxBin = model["maxBin"];
  if (parseInt(minBin) > parseInt(maxBin)) {
    return model[key] ? { key, message: "Value must be less than Max" } : null;
  }
  if (minBin && minBin.toString().length !== 6) {
    return model[key] ? { key, message: "Enter a valid Bin" } : null;
  }
  return null;
};
const maxbinValid = (model, key) => {
  let minBin = model["minBin"];
  let maxBin = key === "maxBin" ? model[key] : null;
  if (parseInt(maxBin) < parseInt(minBin)) {
    return model[key] ? { key, message: "Value must be more than Min" } : null;
  }
  if (maxBin && maxBin.toString().length !== 6) {
    return model[key] ? { key, message: "Enter a valid Bin" } : null;
  }
  return null;
};
const minAmountValid = (model, key) => {
  let minAmount = key === "minAmount" ? parseInt(model[key]) : null;
  let maxAmount = parseInt(model["maxAmount"]);
  if (minAmount > maxAmount) {
    return model[key] ? { key, message: "Value must be less than Max" } : null;
  }
  return null;
};
const maxAmountValid = (model, key) => {
  let minAmount = parseInt(model["minAmount"]);
  let maxAmount = key === "maxAmount" ? parseInt(model[key]) : null;
  if (maxAmount < minAmount) {
    return model[key] ? { key, message: "Value must be more than Min" } : null;
  }
  return null;
};
const validEmail = (model, key) => {
  let regex = new RegExp(
    "^[a-zA-Z0-9_]+(?:[.-][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+(?:[.-][a-zA-Z0-9_]+)*(?:\\.[a-zA-Z0-9_]{2,3})+$"
  );
  if (
    model[key] &&
    (typeof model[key] !== "string" || !regex.test(model[key]))
  ) {
    return { key, message: "This field must contain a valid email" };
  } else {
    return null;
  }
};
const nonEmptyLength = (model, key) => {
  let subject = null;
  if (model) subject = model[key];
  if (subject === undefined || subject === " " || subject === null) {
    return { key, message: "This field is required" };
  }
  if (typeof subject === STRING) {
    return subject.trim().length < 1
      ? { key, message: "This field is required" }
      : null;
  }
  if (Array.isArray(subject) && subject.length < 1) {
    return { key, message: "List cannot be empty" };
  }
  return null;
};

class StateValidator {
  constructor(stateRuleMap) {
    this.ruleMap = stateRuleMap;
    this.rules = {
      positiveNumber,
      nonEmptyLength,
      minbinValid,
      maxbinValid,
      minAmountValid,
      maxAmountValid,
      zipCodeValidation,
      validEmail
    };
  }

  addRule(ruleName, ruleFunction) {
    this.rules[ruleName] = ruleFunction;
  }

  validateField(state, field) {
    let isValid = true;
    let fieldErrors = {};
    let validationRules = this.ruleMap[field]
      ? this.ruleMap[field].split(",")
      : [];
    for (let ruleIndex = 0; ruleIndex < validationRules.length; ruleIndex++) {
      let ruleName = validationRules[ruleIndex].trim();
      let ruleFunction = this.rules[ruleName];
      if (ruleFunction === undefined) {
        continue;
      }
      let error = ruleFunction(state, field);

      if (error === null) {
        continue;
      }
      if (!fieldErrors[error.key]) {
        fieldErrors[error.key] = [];
      }
      fieldErrors[error.key].push(error.message);
      isValid = false;
    }
    return isValid
      ? { valid: isValid }
      : { valid: isValid, errors: fieldErrors };
  }

  validateState(state) {
    let validationErrors = {};
    let isValid = true;
    for (let stateField in this.ruleMap) {
      if (typeof this.ruleMap[stateField] === STRING) {
        let fieldResults = this.validateField(state, stateField);
        if (fieldResults.valid) {
          continue;
        }
        isValid = false;
        validationErrors = { ...validationErrors, ...fieldResults.errors };
        continue;
      }

      if (Array.isArray(this.ruleMap[stateField])) {
        let subRules = this.ruleMap[stateField][0];
        let subValidator = new StateValidator(subRules);
        for (let subStateIndex in state[stateField]) {
          let subState = state[stateField][subStateIndex];
          let subFieldResultsForIndex = subValidator.validateState(subState);
          if (subFieldResultsForIndex.valid) {
            continue;
          }
          isValid = false;
          if (!validationErrors[stateField]) {
            validationErrors[stateField] = {};
          }
          validationErrors[stateField][subStateIndex] =
            subFieldResultsForIndex.errors;
        }
        continue;
      }

      if (typeof this.ruleMap[stateField] === OBJECT) {
        if (stateField in state) {
          let subRules = this.ruleMap[stateField];
          let subState = state[stateField];
          let subValidator = new StateValidator(subRules);
          let subFieldResults = subValidator.validateState(subState);
          if (subFieldResults.valid) {
            continue;
          }
          isValid = false;
          validationErrors[stateField] = subFieldResults.errors;
        }
        continue;
      }
    }

    return isValid
      ? { valid: isValid, errors: {} }
      : { valid: isValid, errors: validationErrors };
  }
}

export default StateValidator;
