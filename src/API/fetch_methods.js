export const _fetch = async req => {
  var res = {};

  await fetch(req)
    .then(raw => {
      res.ok = raw.ok;
      res.status = raw.status;
      res.statusText = raw.statusText;
      return raw.json();
    })
    .then(json => {
      res.body = json;
    })
    .catch(err => {
      res = err;
    });

  return res;
};

export const fetchRequest = async (reqMethod, apiUrl, body, token) => {
  let request = new Request(apiUrl, {
    method: reqMethod,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: token
    },
    body: body != null ? JSON.stringify(body) : null
  });

  return await _fetch(request);
};
