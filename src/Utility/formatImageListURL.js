
export const formatImageListURL = list => {
    return list.map(function (obj) {
        return {
            original: obj.url,
            thumbnail: obj.url,
        }
    });
}

export default formatImageListURL;