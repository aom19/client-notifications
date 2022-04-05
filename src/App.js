import React, { useEffect } from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

//pages
import Admin from "./pages/Admin";
import Home from "./pages/Home";
import Partners from "./pages/Partners";
import Contact from "./pages/Contact";
import AuthPage from "./pages/AuthPage";

//components
import Navbar from "./components/navigation/MainNavigation";

import { signIn } from "./redux/actions/auth";

import "./App.css";
import ListDevice from "./pages/ListDevice";

function App() {
  const dispatch = useDispatch();

  useEffect(async () => {
    await dispatch(signIn());
  }, []);

  const token = useSelector((state) => state.user);
  console.log(token);

  return (
    <BrowserRouter>
      <>
        <Navbar />
        <>
          <Switch>
            {token?.token && <Redirect from="/login" to="/" exact />}
            <Route path="/" component={Home} exact />

            <Route path="/partners" component={Partners} exact />
            <Route path="/contact" component={Contact} exact />
            <Route path="/login" component={AuthPage} exact />
            <Route path="/admin" component={Admin} exact />
            <Route path="/list" component={ListDevice} exact />
            {/* {token?.token && <Route path="/admin" component={Admin} exact />} */}
          </Switch>
        </>
      </>
    </BrowserRouter>
  );
}

export default App;
