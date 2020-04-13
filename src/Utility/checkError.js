export const checkError = (errors, property) => {
  let p = property; // target property
  // if errors exists
  if (errors != null) {
    let msg = "";
    errors.forEach((e) => {
      // get all properties
      let names = Object.getOwnPropertyNames(e);
      names.forEach((f) => {
        // for each property, check if it is target property
        if (p == f) {
          // make the message the parget property
          msg = e[p];
        }
      });
    });
    // return message
    return msg;
  } else {
    return "";
  }
};

export default checkError;
