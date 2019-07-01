// import {combineReducers} from 'redux';
// import user from './user_reducer';

// const rootReducer=combineReducers({
// 	user
// });

// export default rootReducer;



import { combineReducers } from 'redux';
import user from './user_reducer';
import products from './products_reducer';
import site from './site_reducer';//for site info

const rootReducer = combineReducers({
    user,
    products,
    site
});

export default rootReducer;