import { createSelector } from 'reselect';

export const isLoggedInSelector = createSelector(
    (state) => state?.user,
    (state) => state?.auth,
    (user, auth) => user?._id && auth?.isAuthenticated,
)