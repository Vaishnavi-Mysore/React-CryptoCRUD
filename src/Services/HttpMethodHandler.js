import axios from "axios";
import CryptoJS from "crypto-js";
import { ToastsStore } from "react-toasts";

const host = "https://api.cert.zerohash.com";
const apiKey = "Discover123";
const publicApiKey = "gEgdmwNo4pyqKNkLNL4tdG";
const secretApiKey = "dnxRjr0FfiLdRKQuN5AFmuwTaFMIKcmSTNk6+SzmxWk=";
let header = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

const axiosInstance = axios.create({
  headers: { ...header },
  // timeout: 15000,
});

/**
 * @function
 * @description POST request
 */
// axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
export const _POST = (url, data) => {
  return axios.get("https://api.cert.zerohash.com/time").then((response) => {
    let urlPayload = host + url;
    let timestamp = response.data && response.data.epoch;
    const payload = timestamp + "POST" + url + JSON.stringify(data);
    const secretByteArray = CryptoJS.enc.Base64.parse(secretApiKey);
    const signatureBytes = CryptoJS.HmacSHA256(payload, secretByteArray);
    const requestSignatureBase64String = CryptoJS.enc.Base64.stringify(
      signatureBytes
    );
    try {
      return axiosInstance.post(urlPayload, data, {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "X-SCX-API-KEY": publicApiKey,
          "X-SCX-SIGNED": requestSignatureBase64String,
          "X-SCX-TIMESTAMP": timestamp,
          "X-SCX-PASSPHRASE": apiKey,
        },
      });
    } catch (ex) {
      console.error(ex);
    }
  });
};

/**
 * @function
 * @description GET request
 */
export const _GET = (url) => {
  const body = {};
  return axios.get("https://api.cert.zerohash.com/time").then((response) => {
    let urlPayload = host + url;
    let timestamp = response.data && response.data.epoch;
    const payload = timestamp + "GET" + url + JSON.stringify(body);
    const secretByteArray = CryptoJS.enc.Base64.parse(secretApiKey);
    const signatureBytes = CryptoJS.HmacSHA256(payload, secretByteArray);
    const requestSignatureBase64String = CryptoJS.enc.Base64.stringify(
      signatureBytes
    );

    return axios.get(urlPayload, {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "X-SCX-API-KEY": publicApiKey,
        "X-SCX-SIGNED": requestSignatureBase64String,
        "X-SCX-TIMESTAMP": timestamp,
        "X-SCX-PASSPHRASE": apiKey,
      },
    });
  });
};

axiosInstance.interceptors.response.use(undefined, function(error) {
  debugger
  let errorMessage = ''
  if (error.response &&  error.response.data && error.response.data.error){
    errorMessage =error.response.data.error
  }
  if (error.response && error.response.data && error.response.data.errors){
    errorMessage =error.response.data.errors[0]
  }
 
  else{
    errorMessage = "Something went wrong"
  };
  
  //  let errorMessage = error.response
  //   ? error.response.data && error.response.data.errors ? error.response.data.errors[0] :error.response.data.error
  //   : "Something went wrong";
  ToastsStore.error(errorMessage, 5000);
  return Promise.reject(error);
});
