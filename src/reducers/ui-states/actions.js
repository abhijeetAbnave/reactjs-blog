import { SET_UI_STATES, CLEAR_UI_STATES } from './types';

export const setUiStates = (payload) => (dispatch) => {
    dispatch({ type: SET_UI_STATES, payload });
};

export const clearUiStates = () => (dispatch) => {
    dispatch({ type: CLEAR_UI_STATES });
};