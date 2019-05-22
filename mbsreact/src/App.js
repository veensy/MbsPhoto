import React, { Component } from "react";
import Slider from "./components/Slider";
import AboutMe from "./components/AboutMe";
import FourFrames from "./components/FourFrames"
import LastPictures from "./components/LastPictures";
import Krea from "./components/Krea";

export default class App extends Component {
  render() {
    return (
      <div>
        <Slider />
        <AboutMe/>
        <FourFrames />
        <LastPictures/>
        <Krea/>
      </div>
    );
  }
}
