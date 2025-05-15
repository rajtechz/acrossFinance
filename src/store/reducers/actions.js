// // action - account reducer
// export const LOGIN = '@auth/LOGIN';
// export const LOGOUT = '@auth/LOGOUT';
// export const REGISTER = '@auth/REGISTER';



// action - account reducer
export const LOGIN = '@auth/LOGIN';
export const LOGOUT = '@auth/LOGOUT';
export const REGISTER = '@auth/REGISTER';

// action - invoice reducer
export const SET_INVOICE = '@invoice/SET_INVOICE';

// Action Creator
export const setInvoice = (invoice) => ({
    type: SET_INVOICE,
    payload: invoice
});
