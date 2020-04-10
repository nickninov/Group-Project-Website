export const checkError = (errors, property) => {
  let p = property;
  if (errors != null) {
    let msg = "";
    errors.forEach((e) => {
      let names = Object.getOwnPropertyNames(e);
      names.forEach((f) => {
        if (p == f) {
          msg = e[p];
        }
      });
    });
    return msg;
  } else {
    return "";
  }
};

export default checkError;
