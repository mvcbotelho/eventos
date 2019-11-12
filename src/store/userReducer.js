/* eslint-disable no-undef */
const INITIAL_STATE = {
  userMail: "",
  userStatus: 0
};

function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "LOG_IN":
      return { ...state, userMail: action.userMail, userStatus: 1 };
    case "LOG_OUT":
      return { ...state, userMail: "", userStatus: 0 };
    default:
      return state;
  }
}

export default userReducer;
