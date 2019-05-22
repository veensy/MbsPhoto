import React, { Component } from "react";
import axios from "axios";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import "./NavBar.css";

const LINK = "http://localhost:3222/";
export class Slider extends Component {
  state = {
    slider_url: "",
    isLoading: false,
    index: 0,
    direction: null
  };

  componentDidMount() {
    this.getAllState();
  }

  getAllState = async () => {
    this.setState({ isLoading: true });
    axios.get(`${LINK}getallhomestate`).then(response => {
      this.setState({
        slider_url: response.data[0].slider_url
      });
    });
  };

  renderSlider = () => {
    if (this.state.slider_url) {
      return this.state.slider_url.map((slide, index) => {
        return (
          <div key={index}>
            <img src={slide} alt="" />
            <div className="uk-position-center uk-position-small uk-text-center uk-light">
              <h2
                className="abrev"
                data-uk-parallax="opacity: 0,1,1; x: -100,0,0; x: 100,100,0; scale: 2,1,1; viewport: 0.5"
              >
                MBS
              </h2>
              <p data-uk-parallax="opacity: 0,1,1; x: 100,0,0; x: -100,-100,0; scale: 0.5,1,1; viewport: 0.5;">
                Photography
              </p>
            </div>
          </div>
        );
      });
    }
  };

  render() {
    return (
      <div className="slide">
        <Carousel
          autoPlay={true}
          showStatus={false}
          showThumbs={false}
          infiniteLoop={true}
          transitionTime={500}
          dynamicHeight={false}
          selectedItem={0}
          
        >
          {this.renderSlider()}
        </Carousel>
      </div>
    );
  }
}

export default Slider;
