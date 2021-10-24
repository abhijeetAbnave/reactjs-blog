import store from "../../store/store";
import { save as saveUser } from "../../reducers/user/actions";

export async function getUserProfileData() {
  var { user } = store.getState();

  if (user) {
    return user;
  }
  return null;
}

export async function saveUserDataToLocalStorage(data) {
  if (data) {
    store.dispatch(saveUser({ user: data }));
  }
}