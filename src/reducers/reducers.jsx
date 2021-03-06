var photoListReducer = (state = [], action) => {
    Object.freeze(state);

    switch (action.type) {
        case "GET_PHOTO_LIST":
            return action.payload;
        case "ADD_CATS":
            var newState = JSON.parse(JSON.stringify(state))
            var update = newState[action.payload.index]['category']
            update.push(action.payload.value[0])
            newState[action.payload.index]['category'] = update
            return newState
        default:
            return state;
    }
};

var fileReducer = (state = [], action) => {
    Object.freeze(state);

    switch (action.type) {
        case "POST_FILE":
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
            console.log(action.payload.value, 'high bdgs')
            newState['bdgs_high_range'] = action.payload.value
            return newState
        case "EDIT_USER":
            var newState = JSON.parse(JSON.stringify(state))
            newState['bdgs_high_range'] = action.payload.value.bdgs_high_range
            newState['bdgs_low_range'] = action.payload.value.bdgs_low_range
            newState['photo'] = action.payload.value.photo
            newState['first_name'] = action.payload.value.first_name
            return newState
        case "EDIT_MIN_BDG_RANGE":
            var newState = JSON.parse(JSON.stringify(state))
            newState['bdgs_low_range'] = action.payload.value
            return newState
        case "EDIT_USER_FIRST_NAME":
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
    userReducer,
    fileReducer
};
