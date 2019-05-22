import React, { Component } from "react";
import NavBar from "./homepage/NavBar";
import Slider from "./homepage/Slider";
import { Link } from "react-router-dom";
import AboutMe from "./homepage/AboutMe";
import FourFrames from "./homepage/FourFrames";
import LastPicture from "./homepage/LastPicture";
import Krea from "./homepage/Krea";
import Contact from "./homepage/Contact";
import "./style.css"

export default class HomePage extends Component {
  render() {
    return (
      <div >
        <div className="uk-heading-divider uk-section-primary uk-flex uk-flex-row" data-uk-sticky="sel-target: .uk-navbar-container; cls-active: uk-navbar-sticky">
          <div className="uk-margin-left">
            <Link to={"/"}>
              <a href="/" data-uk-icon="home" />
            </Link>
          </div>
          <div className="uk-position-top-center">
            <strong>HOME PAGE</strong>
          </div>
        </div>
        <NavBar />
        <hr className="uk-divider-icon" />
        <Slider />
        <hr className="uk-divider-icon" />
        <AboutMe />
        <hr className="uk-divider-icon" />
        <FourFrames />
        <hr className="uk-divider-icon" />
        <LastPicture />
        <hr className="uk-divider-icon" />
        <Krea/>
        <hr className="uk-divider-icon" />
        <Contact/>
      </div>
    );
  }
}
