import React, { useState, useContext } from "react";
import { useDispatch } from "react-redux";

//utitilites
import "./Auth.scss";
import image1 from "../assets/bg_6.jpeg";

//actions
import * as authActions from "../redux/actions/auth";

//components
import Section from "../components/Section/Section";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isError, setIsError] = useState(false);

  const [values, setValues] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    address: "",
    pushSubscription: "",
  });

  const dispatch = useDispatch();

  const handleModeChange = () => {
    setIsLogin(!isLogin);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };
  const function1 = async () => {
    let sw = await navigator.serviceWorker.ready;
    let push = await sw.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey:
        "BHcJ6sw5Ay67VobEVIhlEVrfvHqDFMnyzOLG9Vz8d1CRCYBdyCzt9aoVYdZq1feEwll9gG67g15uYMe-ghN7cVU",
    });

    return push;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = values.email;
    const password = values.password;
    const firstName = values.firstName;
    const lastName = values.lastName;
    const phoneNumber = values.phoneNumber;
    const address = values.address;
    console.log("Handle Submit");
    let j = await function1();
    // let j = {
    //   endpoint:
    //     "https://fcm.googleapis.com/fcm/send/fZCK7jSs_Ds:APA91bGzzAaaWGuR81PbZSqQs8fQOd0ZTy1F8d93kR8uQfpvT8NltwRQhZRMOiLRAaYaXVIRZwngWS1jXjaH_1IqSSynacbOWf6jmklT2ULPeXNq1_SWbJAmWQdqWxJBeWt5F6lB_LfR",
    //   expirationTime: null,
    //   keys: {
    //     p256dh:
    //       "BLezMwVTGHcvqDzmoFfeWIrQoxFkRZz0YzK7e6YdnD7hXiyIgr-h98ktGOt83Pd1FaNpio7UDj5nJtWEoUwphEw",
    //     auth: "IluYNXLOyUI_mlcgQub3rg",
    //   },
    // };
    if (!isLogin) {
      let action = authActions.signup(
        email,
        password,
        firstName,
        lastName,
        phoneNumber,
        address,
        j
      );
      try {
        await dispatch(action);
        // await dispatch(bookingActions.fetchBookings());
        // props.navigation.navigate('Shop');
      } catch (err) {
        console.log(err.message);
      }
    } else {
      // dispatch(login({ email: email, password: password }));
      let action = authActions.login(email, password);
      try {
        await dispatch(action);

        // props.navigation.navigate('Shop');
      } catch (err) {
        console.log(err.message);
      }
    }
  };
  return (
    <div>
      <div>
        <Section
          image={image1}
          page={!isLogin ? "Sign Up" : "Sign In"}
          name={!isLogin ? "Sign Up" : "Sign In"}
        />
      </div>
      <div className="container">
        <div className="log-form">
          <form className="col-md-12" onSubmit={handleSubmit}>
            <h2>{isLogin ? "Please  Sign In" : "Please Sign Up"}</h2>
            <hr className="divisor" />
            {isLogin ? (
              <>
                <div className="form-control">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="email"
                    value={values.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-control">
                  {/* <label htmlFor="password"> Password </label> */}
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="password"
                    value={values.password}
                    onChange={handleChange}
                  />
                </div>
              </>
            ) : (
              <>
                <div className="form-control">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="email"
                    value={values.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-control">
                  {/* <label htmlFor="password"> Password </label> */}
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="password"
                    value={values.password}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-control">
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    placeholder="First Name"
                    value={values.firstName}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-control">
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    placeholder="Last Name"
                    value={values.lastName}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-control">
                  <input
                    type="text"
                    id="phoneNumber"
                    name="phoneNumber"
                    placeholder="Phone Number"
                    value={values.phoneNumber}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-control">
                  <input
                    type="text"
                    id="addresss"
                    name="address"
                    placeholder="Address"
                    value={values.address}
                    onChange={handleChange}
                  />
                </div>
              </>
            )}
            <div className="form-actions">
              <button type="button" className="btn" onClick={handleModeChange}>
                Switch to {isLogin ? "Signup" : "Login"}
              </button>
              <button type="submit" className="btn">
                Submit
              </button>
            </div>
          </form>
        </div>
        {/* )} */}
      </div>
    </div>
  );
};

export default AuthPage;
