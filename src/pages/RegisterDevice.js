import React, { useState, useContext } from "react";

//utitilites
import "./Auth.scss";
import MainNavigation from "../components/Navbar/MainNavigation";

const RegisterDevice = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isError, setIsError] = useState(false);

  const [values, setValues] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    address: "",
  });
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

    // await fetch("http://localhost:8000/devices/add", {
    //   method: "POST",
    //   body: JSON.stringify(push),
    //   headers: {
    //     "content-type": "application/json",
    //   },
    // });
    return push;
  };

  const handleSubmit = async (e) => {
    console.log("SUbmit");

    e.preventDefault();
    let j = await function1();
    values.pushSubscription = j;
    await fetch("https://notification-push.herokuapp.com/devices/add", {
      method: "POST",
      body: JSON.stringify(values),
    });
    console.log(values);
  };

  return (
    <div>
      <MainNavigation />
      <div>
        <div></div>
        <div className="container">
          <div className="log-form">
            <form className="col-md-12">
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
                <button
                  type="button"
                  className="btn"
                  onClick={handleModeChange}
                >
                  Switch to {isLogin ? "Signup" : "Login"}
                </button>
                <button type="submit" className="btn" onClick={handleSubmit}>
                  Submit
                </button>
              </div>
            </form>
          </div>
          {/* )} */}
        </div>
      </div>
    </div>
  );
};

export default RegisterDevice;
