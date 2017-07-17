import { SPINNER_STATE } from './types/spinner'

const initialState = false;

export default function (state = initialState, action) {

    switch (action.type) {

        case SPINNER_STATE :
            return action.payload.toogle;
            break;

        default: return state;
    }
}