import React from 'react';
import { Input } from 'reactstrap';

export default class NumberTextbox extends React.Component {
  onKeyPress = (event) => {
    let isMaxLengthExeeded = () => {
      let value = this.props.value
      if (value && !isNaN(value)) {
        value = value.toString()
      }
      let length = (value.length || 0)
      let maxLength = (this.props.maxLength && this.props.maxLength) || null
      if (maxLength !== null) {
        return (maxLength <= length)
      }
      return false
    }
    let isKeyPressedOtherThanNumberOrTabOrDot = '';
    //decimal allowed
    if (this.props.decimalAllowed) {
      isKeyPressedOtherThanNumberOrTabOrDot = () => {
        return (key !== 'Tab' && key !== '.' && !(parseInt(key) >= 0 && parseInt(key) <= 9))
      }
    }
    //decimal not allowed
    else {
      isKeyPressedOtherThanNumberOrTabOrDot = () => {
        return (key !== 'Tab' && !(parseInt(key) >= 0 && parseInt(key) <= 9))
      }
    }

    let key = event.key;
    if (isKeyPressedOtherThanNumberOrTabOrDot() || isMaxLengthExeeded()) {
      event.preventDefault();
      return
    }
  }

  render() {
    let value = parseFloat(this.props.value)
    value = !isNaN(value) ? value : ''
    return <Input
      id={this.props.id}
      value={value}
      onKeyPress={this.onKeyPress}
      onChange={this.props.onChange}
      max={this.props.max}
      min={this.props.min}
      name={this.props.name}
      placeholder={this.props.placeholder || ''}
      disabled={this.props.disabled}
      className={this.props.className}
      type='number'
    />
  }
}