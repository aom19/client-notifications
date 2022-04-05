import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import logo from "./logo.svg";
import "./App.css";
import RegisterDevice from "./pages/RegisterDevice";
import ListDevice from "./pages/ListDevice";
import Home from "./pages/Home";

function App() {
  const function1 = async () => {
    let sw = await navigator.serviceWorker.ready;
    let push = await sw.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey:
        "BHcJ6sw5Ay67VobEVIhlEVrfvHqDFMnyzOLG9Vz8d1CRCYBdyCzt9aoVYdZq1feEwll9gG67g15uYMe-ghN7cVU",
    });

    await fetch("http://localhost:8000/devices/add", {
      method: "POST",
      body: JSON.stringify(push),
      headers: {
        "content-type": "application/json",
      },
    });
  };
  useEffect(() => {}, []);

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/list" component={ListDevice} />
        <Route path="/create" component={RegisterDevice} />
      </Switch>
    </Router>
  );
}

export default App;
