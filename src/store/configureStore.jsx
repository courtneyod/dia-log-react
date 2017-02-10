import {
    createStore,
    applyMiddleware,
    compose,
    combineReducers
} from "redux";

import {
    photoListReducer,
    userReducer,
    fileReducer
} from "../reducers/reducers";
// import promise from "redux-promise";


export var configure = (initialState = {loggedIn: null}) => {
    var reducers = combineReducers({
        photos: photoListReducer,
        user: userReducer,
        file: fileReducer
    });

    // var createStoreWithMiddleware = applyMiddleware(promise)(createStore);

    var store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

	return store;
}

// module.exports = configure;
