import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import HomePage from "./component/HomePage";
import FirstPage from './component/FirstPage'
import AdminLogin from './component/AdminLogin'

export const AppRouter = () => {
  return (
    <Router>
      <div>
        {/* <Route exact path="/" component={HomePage} /> */}
        <Route exact path="/" component={FirstPage}/>
        <Route path="/admin" component={AdminLogin}/>
        <Route path="/other" component={HomePage}/>
      </div>
    </Router>
  );
};
