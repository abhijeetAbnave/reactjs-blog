import { SAVE, REMOVE } from "./types";
import store from "../../store/store";
import api from "../../services/api.js";
import { getEncodedJWTToken } from "../../services/utility";

export const save = (payload) => (dispatch) => {
  dispatch({ type: SAVE, payload });
};

export const remove = () => (dispatch) => {
  //clearUser();
  dispatch({ type: REMOVE });
};

// export const refreshUser = () => async (dispatch) => {
//   try {
//     const { user } = store.getState();

//     const data = {
//       user_mobile: user?.user_mobile,
//       country_code: user?.country_code,
//       school_id: user?.school_id,
//     };

//     const result = await api.postApi("user", data, {
//       headers: {
//         common: { Authorization: getEncodedJWTToken(data) },
//       },
//     });
//     // saveUserDataToLocalStorage(result);
//     dispatch({ type: SAVE, payload: { user: result } });
//     // window.location = '/selectsubject';
//   } catch (err) {
//     dispatch({ type: SAVE, payload: { user: {} } });
//   }
// };
