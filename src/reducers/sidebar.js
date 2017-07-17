import { SIDEBAR_STATE } from './types/sidebar'

const initialState = false;

export default function (state = initialState, action) {

    switch (action.type) {

        case SIDEBAR_STATE :
            return action.payload.toogle;
            break;

        default: return state;
    }
}