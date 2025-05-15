// // third-party
// import { combineReducers } from 'redux';
// // project import
// import menu from './menu';
// // ==============================|| COMBINE REDUCERS ||============================== //
// const reducers = combineReducers({ menu });
// export default reducers;




// third-party
import { combineReducers } from 'redux';

// project imports
import menu from './menu';
import invoiceReducer from './invoiceReducer'; // Import invoice reducer

// ==============================|| COMBINE REDUCERS ||============================== //
const reducers = combineReducers({
    menu,           // Existing menu reducer
    invoice: invoiceReducer // New invoice reducer
});

export default reducers;
