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

var editMaxBdgRange = (data) => {
    return {
        type: "EDIT_MAX_BDG_RANGE",
        payload: data
    };
};

var editMinBdgRange = (data) => {
    return {
        type: "EDIT_MIN_BDG_RANGE",
        payload: data
    };
};

var editUserName = (data) => {
    return {
        type: "EDIT_USER_NAME",
        payload: data
    };
};

var editPhoto = (data) => {
    return {
        type: "EDIT_PHOTO",
        payload: data
    };
};

var addCats = (data) => {
    return {
        type: "ADD_CATS",
        payload: data
    };
};

var postFile = (data) => {
    return {
        type: "POST_FILE",
        payload: data
    };
};



module.exports = {
    getPhotoList,
    getUser,
    editMaxBdgRange,
    editMinBdgRange,
    editUserName,
    editPhoto,
    postFile,
    addCats
};
