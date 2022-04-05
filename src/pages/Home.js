import React, { useState, useEffect } from "react";
import MainNavigation from "../components/Navbar/MainNavigation";
import { Button } from "react-bootstrap";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@material-ui/core";
const Home = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isError, setIsError] = useState(false);
  const [devices, setDevices] = useState([]);

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
    e.preventDefault();
    console.log("SUbmit");

    let j = await function1();
    values.pushSubscription = await j;

    // await axios
    //   .post("https://notification-push.herokuapp.com/devices/add", {
    //     data,
    //   })
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => console.log(err));

    axios.post("https://notification-push.herokuapp.com/devices/add", {
      values,
    });

    console.log(values);
  };
  const fetchDevices = async () => {
    // await fetch("http://localhost:8000/devices/")
    //   .then((response) => response.json())
    //   .then((data) => setDevices(data));
    await fetch("https://notification-push.herokuapp.com/devices")
      .then((response) => response.json())
      .then((data) => setDevices(data));
  };
  useEffect(() => {
    fetchDevices();
  }, []);
  const handleClick = async (x) => {
    console.log(x);
    axios.post(
      `https://notification-push.herokuapp.com/devices/notificate/${x._id}`,
      {
        id: x._id,
      }
    );
  };
  return (
    <div>
      <div>
        <div>
          <MainNavigation />

          <div></div>

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
                  <button
                    type="button"
                    className="btn"
                    onClick={handleModeChange}
                  >
                    Switch to {isLogin ? "Signup" : "Login"}
                  </button>
                  <button
                    type="submit"
                    className="btn"
                    onClick={(e) => handleSubmit(e)}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div style={{ marginTop: "40%" }}></div>
        <h1>Device List </h1>
        <TableContainer style={{ width: "90%", margin: "5%" }}>
          <Table>
            <TableHead className="table-head">
              <TableRow>
                {columnsListDevices.map((x, id) => (
                  <TableCell key={id}>{x}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {devices
                // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((x, index) => {
                  return (
                    <TableRow
                      className={
                        x.role === "1" || x.role === 1 ? "admin" : null
                      }
                      hover
                      tabIndex={-1}
                      key={x.id}
                    >
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{x.email}</TableCell>

                      <TableCell>{x.firstName}</TableCell>
                      <TableCell>{x.lastName}</TableCell>
                      <TableCell>{x.phoneNumber}</TableCell>
                      <TableCell>{x.address}</TableCell>
                      <TableCell>
                        <Button
                          variant="primary"
                          onClick={() => handleClick(x)}
                        >
                          Notificate
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

const columnsListDevices = [
  "Index",
  "Email",
  "FirstName",
  "LastName",
  "Phone Number",
  "Adress",
  "Notification",
];

export default Home;
