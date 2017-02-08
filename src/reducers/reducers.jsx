var photoListReducer = (state = [], action) => {
    Object.freeze(state);

    switch (action.type) {
        case "GET_PHOTO_LIST":
            return action.payload;
        default:
            return state;
    }
};

var userReducer = (state = [], action) => {
    Object.freeze(state);

    switch (action.type) {
        case "GET_USER":
            return action.payload;
        default:
            return state;
    }
};

module.exports = {
    photoListReducer,
    userReducer
};
