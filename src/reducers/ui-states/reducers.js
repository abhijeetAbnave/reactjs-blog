import { SET_UI_STATES, CLEAR_UI_STATES } from './types';

const INITIAL_STATE = {
    theme: "light",
};

export default function (state = INITIAL_STATE, { type, payload }) {
    switch (type) {
        case SET_UI_STATES: {
            return {
                ...state,
                ...payload,
            };
        }
        case CLEAR_UI_STATES: {
            return INITIAL_STATE;
        }
        default: return state;
    }
};