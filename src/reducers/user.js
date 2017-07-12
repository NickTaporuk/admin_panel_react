import { SET_CURRENT_USER, UNSET_CURRENT_USER, USER_NOT_AUTHORIZED } from './types/user'

const initialState = {
    isAuthenticated : false,
    user : {},
    token : null,
    message : null
};

export default function (state = initialState, action) {
    console.log('action:',action);
    switch (action.type) {

        case SET_CURRENT_USER :
            return {
                isAuthenticated: !!action.payload.user,
                user : action.payload.user,
                token : action.payload.token
            };
            break;
        case UNSET_CURRENT_USER : return initialState;break;
        case USER_NOT_AUTHORIZED : return {
            isAuthenticated : false,
            user : {},
            token : null,
            message : {
                type : 'error',
                event : USER_NOT_AUTHORIZED,
                text :  action.payload.message
            }
        };break;

        default: return state;
    }
}