import React from 'react';

export default function (props) {
  if (!props.errors) {
    return null;
  }

  function renderErrors(errors) {
    return ((Array.isArray(errors)) && <React.Fragment>
      {errors.map(errorMessage => <div className='errorMsg'>{errorMessage}</div>)}
    </React.Fragment>) || null;
  }

  let keys = [];
  if (props.errorKey) {
    keys = props.errorKey.split('.');
  }
  let errors = props.errors;
  let key = props.errorKey;
  if (keys.length === 1) {
    return props.errors[key] ? renderErrors(errors[key]) : null;
  }
  for (let keyIndex in keys) {
    if (keys[keyIndex] in errors && keyIndex < keys.length - 1) {
      errors = errors[keys[keyIndex]];
      continue;
    }
    if (keys[keyIndex] in errors) {
      return errors[keys[keyIndex]] ? renderErrors(errors[keys[keyIndex]]) : null;
    }
  }
  return null;
}