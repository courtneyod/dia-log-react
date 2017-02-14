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

var editUser = (user) => {
    return {
        type: "EDIT_USER",
        payload: user
    };
};

var editUserFirstName = (user) => {
    return {
        type: "EDIT_USER_FIRST_NAME",
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

var editPhoto = (data) => {
    return {
        type: "EDIT_PHOTO",
        payload: data
    };
};

var addCats = (category) => {
    return {
        type: "ADD_CATS",
        payload: category
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
    editUser,
    editMaxBdgRange,
    editMinBdgRange,
    editPhoto,
    postFile,
    addCats,
    editUserFirstName
};
