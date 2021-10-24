import {
	SET_ACTIVE_TAB,
} from "./constants";

export const setActiveTab = (tabId) => ({ 
	type: SET_ACTIVE_TAB,
	payload: tabId
});
