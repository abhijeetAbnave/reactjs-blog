import { LOGIN, LOGOUT } from "./types";

const INITIAL_STATE = {
  isAuthenticated: false,
  token: null,
};

export default function (state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case LOGIN: {
      return {
        ...state,
        isAuthenticated: true,
        token: payload.user.token,
      };
    }
    case LOGOUT: {
      return {
        ...state,
        ...INITIAL_STATE,
      };
    }
    default:
      return state;
  }
}
