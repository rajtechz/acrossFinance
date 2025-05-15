import { SET_INVOICE } from './actions';

const initialState = {
    invoice: null, // Initially, no invoice
};

const invoiceReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_INVOICE:
            return { ...state, invoice: action.payload };
        default:
            return state;
    }
};

export default invoiceReducer;
