import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Menu from "./components/Menu";
import HomePage from "./components/HomePage";
import Categories from "./components/Categories";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Menu} />
      <Route exact path="/homepage" component={HomePage} />
      <Route exact path="/categories" component={Categories} />
    </Switch>
  </BrowserRouter>,

  document.querySelector("#root")
);
