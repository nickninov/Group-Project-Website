export const formatDate = date => {
  var nDate = new Date(date);
  return (
    nDate.getDate() + "/" + (nDate.getMonth() + 1) + "/" + nDate.getFullYear()
  );
};
