import React, { useEffect, useState } from "react";
import MainNavigation from "../components/Navbar/MainNavigation";
import { Button } from "react-bootstrap";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@material-ui/core";
import axios from "axios";

const ListDevice = () => {
  const [devices, setDevices] = useState([]);

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
      <MainNavigation />
      <div style={{ marginTop: "20%" }}></div>
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
                    className={x.role === "1" || x.role === 1 ? "admin" : null}
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
                      <Button variant="primary" onClick={() => handleClick(x)}>
                        Notificate
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      ;
    </div>
  );
};

export default ListDevice;

const columnsListDevices = [
  "Index",
  "Email",
  "FirstName",
  "LastName",
  "Phone Number",
  "Adress",
  "Notification",
];
