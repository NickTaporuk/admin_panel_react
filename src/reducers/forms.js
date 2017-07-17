import { VALIDATE_EMAIL_INPUT_LOGIN_FORM, VALIDATE_PASSWORD_INPUT_LOGIN_FORM } from './types/form';

import validator from 'validate.js';

const initialState = {
    email : {
        value : null,
        validate : false
    }
};

export default function (state = initialState, action) {

    switch (action.type) {

        case  VALIDATE_EMAIL_INPUT_LOGIN_FORM : {
            var constraints = {
                email: {
                    email: true
                }
            };

            return { ...state, ...action.payload } ;
        };
        break;

        default: return state;
    }
}