import { createSelector } from "reselect";
import { UserTypes } from "services/Constants";
export const isPrimaryGradeSelector = createSelector(
  (state) => state?.user,
  (user) => ["1", "2", "3", "4", "5"].includes(user?.grade_name)
);

export const isContentUserSelector = createSelector(
  (state) => state?.user,
  (user) => ["content_editor", "content_approver"].includes(user?.user_type)
);

export const isContentEditorSelector = createSelector(
  (state) => state?.user,
  (user) => user?.user_type === "content_editor"
);

export const isContentApproverSelector = createSelector(
  (state) => state?.user,
  (user) => user?.user_type === "content_approver"
);
export const isStudentReviewerSelector = createSelector(
  (user) => user,
  (user) => user?.user_type === UserTypes.student_reviewer
);
export const isTeacherSelector = createSelector(
  (state) => state?.user,
  (user) => user?.user_type === UserTypes.teacher
);
export const isUserTypeSelector = createSelector(
  (state) => state?.user,
  (userType) => userType,
  (user, userType) => user?.user_type === userType
);
