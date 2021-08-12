import StateValidator from './stateValidator';

describe('StateValidatorUnique', () => {

  it('should pass if positive value is given', () => {
    let state = { length: 1 };
    let ruleMap = { length: 'positiveNumber' };

    let validator = new StateValidator(ruleMap);
    let result = validator.validateState(state);

    expect(result.valid).toBe(true);
  });

  it('should return false if value is not positive', () => {
    let state = { key: '-1' };
    let ruleMap = { key: 'positiveNumber' };

    let validator = new StateValidator(ruleMap);
    let result = validator.validateState(state);

    expect(result.valid).toBe(false);
  });

  it('should check non empty length', () => {
    let state = { length: 1 };
    let ruleMap = { length: 'notEmpty' };

    let validator = new StateValidator(ruleMap);
    let result = validator.validateState(state);

    expect(result.valid).toBe(true);
  });

  it('should check nonEmpty Length', () => {
    let state = { length: 1 };
    let ruleMap = { length: 'nonEmptyLength' };

    let validator = new StateValidator(ruleMap);
    let result = validator.validateState(state);

    expect(result.valid).toBe(true);
  })

  it('should check min bin value', () => {
    let state = { length: 6 };
    let ruleMap = { length: 'minbinValid' };

    let validator = new StateValidator(ruleMap);
    let result = validator.validateState(state);

    expect(result.valid).toBe(true);
  })
  it('should check max amount value', () => {
    let state = { length: 6 };
    let ruleMap = { length: 'maxAmountValid' };

    let validator = new StateValidator(ruleMap);
    let result = validator.validateState(state);

    expect(result.valid).toBe(true);
  })
  it('should check min amount value', () => {
    let state = { length: 6 };
    let ruleMap = { length: 'minAmount' };

    let validator = new StateValidator(ruleMap);
    let result = validator.validateState(state);

    expect(result.valid).toBe(true);
  })
  it('should check max bin value', () => {
    let state = { length: 6 };
    let ruleMap = { length: 'maxbinValid' };

    let validator = new StateValidator(ruleMap);
    let result = validator.validateState(state);

    expect(result.valid).toBe(true);
  })

  it('should add new validation rules', () => {
    let greaterThanTwo = (model, key) => {
      if (model[key] < 2) {
        return { key, message: 'Value should be more than 2' };
      }
      return null;
    };

    let state = { length: 1 };
    let ruleMap = { length: 'greaterThanTwo' };

    let validator = new StateValidator(ruleMap);
    validator.addRule('greaterThanTwo', greaterThanTwo);

    let result = validator.validateState(state);
    expect(result.valid).toBe(false);
    expect(result.errors['length']).toHaveLength(1);
  });

  it('should add new validation rules', () => {
    let greaterThanTwo = (model, key) => {
      if (model[key] < 10000000) {
        return { key, message: 'Value should be more than 2' };
      }
      return null;
    };

    let state = { length: 1 };
    let ruleMap = { length: 'greaterThanTwo' };

    let validator = new StateValidator(ruleMap);
    validator.addRule('greaterThanTwo', greaterThanTwo);

    let result = validator.validateState(state);
    expect(result.valid).toBe(false);
    expect(result.errors['length']).toHaveLength(1);
  });

});
