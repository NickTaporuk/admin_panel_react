const initialState = null;

export default function (state = initialState, action) {

    switch (action.type) {
        case 'ADD_TOKEN': return [
            ...state,
            action.payload
        ];

        case 'ADD_TOKEN' : return action.payload;
        case 'DELETE_TOKEN' : return initialState;

        default: return state;
    }
}