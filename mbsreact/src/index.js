import React from "react";
import ReactDOM from "react-dom";
import Root from "./Root";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import App from "./App";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Categories from "./components/Categories";

ReactDOM.render(
  <Root>
    <BrowserRouter>
      <div>
        <NavBar />
        <Switch>
          <Route exact path="/" component={App} />
          <Route exact path="/category/:name/:id" component={Categories} />
        </Switch>
        <Footer />
      </div>
    </BrowserRouter>
  </Root>,
  document.querySelector("#root")
);
