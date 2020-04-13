export const _fetch = async (req) => {
  // declaration of variable used for function return
  var res = {};

  await fetch(req)
    .then((raw) => {
      // add header data
      res.ok = raw.ok;
      res.status = raw.status;
      res.statusText = raw.statusText;
      return raw.json();
    })
    .then((json) => {
      // add body data
      res.body = json;
    })
    .catch((err) => {
      res = err;
    });

  return res;
};

export const fetchRequest = async (reqMethod, apiUrl, body, token) => {
  // from framework, create new request
  let request = new Request(apiUrl, {
    method: reqMethod,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: token,
    },
    // if body necessary (for updates, etc.), format and include in request
    body: body != null ? JSON.stringify(body) : null,
  });

  // pack request into local function _fetch
  return await _fetch(request);
};

