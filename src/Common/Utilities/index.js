export default function noErrorsExist(errors) {
  for (let key in errors) {
    if (typeof errors[key] !== 'object') {
      return false
    }
    if (!noErrorsExist(errors[key])) {
      return false
    }
  }
  return true
}

export function calculateString (string) {
  if(string && string.length > 25){
   return string.substr(0, 25) + '...';
  }
 return string;
}
