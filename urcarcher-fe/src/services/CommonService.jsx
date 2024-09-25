export function options(api, method, request) {
    let options = {
      url: api,
      method: method
    };
  
    if (request) {
      options.data = request;
    }
  
    return options;
}

export function options_GET(api, request) {
    return options(api, "GET", request);
}

export function options_POST(api, request) {
    return options(api, "POST", request);
}