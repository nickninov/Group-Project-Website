export const formatImageListURL = (list) => {
  return list.map(function (obj) {
    return {
      original: obj,
      thumbnail: obj,
    };
  });
};

export default formatImageListURL;
