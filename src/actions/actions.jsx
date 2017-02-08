var getPhotoList = (photoList) => {
    return {
        type: "GET_PHOTO_LIST",
        payload: photoList
    };
};

var getUser = (user) => {
    return {
        type: "GET_USER",
        payload: user
    };
};



module.exports = {
    getPhotoList,
    getUser
};
