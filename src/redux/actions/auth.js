import axios from "axios";
import jwtDecode from "jwt-decode";
import { decode } from "punycode";

export const SIGNUP = "SIGNUP";
// export const LOGIN = "LOGIN";
export const AUTHENTICATE = "AUTHENTICATE";
export const LOGOUT = "LOGOUT";

export const authenticate = (email, token) => {
  return (dispatch) => {
    // dispatch(setLogoutTimer(expiryTime));
    dispatch({
      type: AUTHENTICATE,
      email: email,

      token: token,
    });
  };
};

export const login = (email, password) => {
  return async (dispatch) => {
    const user = {
      email,
      password,
    };
    axios
      .post("https://notification-push.herokuapp.com/users/login", user)
      .then((res) => {
        console.log(res.data.token);
        const decodedToken = jwtDecode(res.data.token);
        console.log(decodedToken);
        dispatch(
          authenticate(
            decodedToken.email,

            res.data?.token
          )
          // resData.data.login.token,
        );
        const expirationDate = new Date(
          new Date().getTime() + parseInt(decodedToken.tokenExpiration) * 1000
        );
        saveDataToLocalStorage(res.data?.token);
      })
      .catch((err) => console.log(err));

    // const resData = await response.json();
    // // console.log(resData);
  };
};

export const logout = () => {
  //   clearLogoutTimer();
  localStorage.removeItem("userData");
  return { type: LOGOUT };
};

const saveDataToLocalStorage = (token) => {
  localStorage.setItem(
    "userData",
    JSON.stringify({
      token: token,
    })
  );
};

export const signIn = () => {
  return (dispatch) => {
    if (localStorage.getItem("userData")) {
      let tokenGot = localStorage.getItem("userData");
      let parsedToken = JSON.parse(tokenGot);
      // console.log(parsedToken?.token);
      const decodedToken = jwtDecode(tokenGot);

      // let token1 = JSON.parse(tokenGot);
      // console.log(token1);
      // console.log(tokenGot);

      if (decodedToken.exp * 1000 < Date.now()) {
        localStorage.removeItem("userData");
      } else {
        dispatch(
          authenticate(
            decodedToken.email,

            parsedToken?.token
          )
        );
      }
    }
  };
};

export const signup = (
  email,
  password,
  firstName,
  lastName,
  phoneNumber,
  address,
  j
) => {
  return async (dispatch, getState) => {
    const user = {
      email,
      password,
      firstName,
      lastName,
      phoneNumber,
      address,
      j,
    };
    axios
      .post("https://notification-push.herokuapp.com/add", user)
      .then((res) => {
        console.log(res.data);
        dispatch(login(email, password));
      })
      .catch((err) => console.log(err));
  };
};
