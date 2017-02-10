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
        case "EDIT_MAX_BDG_RANGE":
            var newState = JSON.parse(JSON.stringify(state))
            newState['bdgs_high_range'] = action.payload.value
            return newState
        case "EDIT_MIN_BDG_RANGE":
            var newState = JSON.parse(JSON.stringify(state))
            newState['bdgs_low_range'] = action.payload.value
            return newState
        case "EDIT_USER_NAME":
            var newState = JSON.parse(JSON.stringify(state))
            newState['first_name'] = action.payload.value
            return newState
        case "EDIT_PHOTO":
            var newState = JSON.parse(JSON.stringify(state))
            newState['photo'] = action.payload.value
            return newState
        default:
            return state;
    }
};

module.exports = {
    photoListReducer,
    userReducer
};
