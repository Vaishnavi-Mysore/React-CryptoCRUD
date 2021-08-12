

/* eslint-disable */
let method = '';
export class DataProvider {
  constructor() {
    this._baseUrl = process.env.REACT_APP_API_URL || "http://10.10.17.118:8005";
  }

  async requestFunction(url, addAuthHeader, method, isBodyRequired, data, isTransaction = false) {
    if (url.includes('api')) {
    }
    var headers = { "Content-Type": "application/json" };
    try {
      let response = null;
      if (isBodyRequired) {
        response = await fetch(this.manageUrl(url), {
          method: method,
          headers: headers,
          mode: 'cors',
          body: JSON.stringify(data)
        });
      }
      else {
        response = await fetch(this.manageUrl(url), {
          mode: 'cors',
          headers: headers,
          timeout: 1,
          method: method
        })
      }

      return this.commonResponse(response);
    }
    catch (e) {
      return ""
    }
  }
  async GetData(url, addAuthHeader = true) {
    let isBodyRequired = false;
    let data = null;
    return this.requestFunction(url, addAuthHeader, method = "GET", isBodyRequired, data);
  }
  
  async PostData(url, data, addAuthHeader = true) {
    let isBodyRequired = true;
    return this.requestFunction(url, addAuthHeader, method = "POST", isBodyRequired, data);
  }
  async PutData(url, data, addAuthHeader = true) {
    let isBodyRequired = true;
    return this.requestFunction(url, addAuthHeader, method = "PUT", isBodyRequired, data);
  }
  async deleteData(url, addAuthHeader = true) {
    let isBodyRequired = false;
    let data = null;
    return this.requestFunction(url, addAuthHeader, method = "DELETE", isBodyRequired, data);
  }

  manageUrl(url) {
    if (url.indexOf('http') >= 0)
      return url;
    let furl = `${this._baseUrl}/${url}`;
    return furl;
  }

  async commonResponse(response) {
    const responsedata = await response.json();
    if (response.status >= 400 && response.status < 600) {
      if (response.status === 403) {
        window.location.reload();
        return;
      }
      return Object.assign(Object.assign({ success: false, status: response.status }, response), { data: responsedata });
    }
    else {
      return { success: true, status: response.status, data: responsedata };
    }
  }
}
