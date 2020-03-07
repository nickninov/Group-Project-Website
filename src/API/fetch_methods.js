export const _fetch = async req => {
  let res;

  await fetch(req)
    .then(res => res.json())
    .then(json => {
      res = json;
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
