import { SAVE, REMOVE } from "./types";

const INITIAL_STATE = {};

export default function (state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case SAVE: {
      return {
        ...state,
        ...payload.user,
      };
    }
    case REMOVE: {
      return INITIAL_STATE;
    }
    default:
      return state;
  }
}
