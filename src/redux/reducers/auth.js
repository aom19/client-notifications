import {
  AUTHENTICATE,
  LOGOUT,
  SIGNUP,
  // LOGIN,
} from "../actions/auth";

const initialState = {
  email: null,

  token: null,
  userId: null,

  //   didTryAutoLogin: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        email: action.email,

        token: action.token,
      };

    case LOGOUT:
      return {
        ...initialState,
        didTryAutoLogin: true,
      };
    case SIGNUP:
      return {
        email: action.email,

        token: action.token,
      };

    default:
      return state;
  }
};
