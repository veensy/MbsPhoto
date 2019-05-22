import React, { Component } from "react";
import axios from "axios";
import "./NavBar.css";

const LINK = "http://localhost:3222/";

export class LastPictures extends Component {
  state = {
    lastpicture_title: "",
    lastpicture_url: [],
    lastpicture_story: [],
    lastpicture_date: [],
    lastpictures: []
  };
  componentDidMount() {
    this.getAllState();
  }

  getAllState = async () => {
    this.setState({ isLoading: true });
    axios
      .get(`${LINK}getallhomestate`)
      .then(response => {
        this.setState({
          lastpicture_title: response.data[0].lastpicture_title,
          lastpicture_url: response.data[0].lastpicture_url,
          lastpicture_story: response.data[0].lastpicture_story,
          lastpicture_date: response.data[0].lastpicture_date
        });
      })
      .then(() => {
        let test = [];
        for (let i = 0; i < this.state.lastpicture_url.length; i++) {
          test[i] = [
            this.state.lastpicture_url[i],
            this.state.lastpicture_story[i],
            this.state.lastpicture_date[i]
          ];
          this.setState({ lastpictures: test });
     
        }
      });
  };

  render() {
    return (
      <div>
        <h1 id="publi" className="uk-text-lead  publication uk-margin-medium-top">
          {this.state.lastpicture_title} ...
        </h1>
        <div data-uk-slider=" sets: true ">
          <div className="slide_pub uk-position-relative">
            <ul className="uk-slider-items uk-child-width-1-2@s uk-child-width-1-3@m uk-grid ">
              {this.state.lastpictures.map((picture, index) => (
                <li key={index}>
                  <div className="uk-card uk-card-default uk-card-hover">
                    <div className="uk-card-media-top">
                      <img src={picture[0]} alt="" />
                    </div>
                    <div className="uk-card-body">
                      <h3 className="tile uk-card-title">{picture[1]}</h3>
                      <p className="date">{picture[2]}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          
            <a class="uk-position-center-left uk-position-small  uk-slidenav-large" href="#"
                data-uk-slidenav-previous data-uk-slider-item="previous"><span className="chevron " data-uk-icon="icon: chevron-left; ratio: 3.5"></span></a>
            <a class="uk-position-center-right uk-position-small  uk-slidenav-large" href="#"
                data-uk-slidenav-next uk-slider-item="next"><span className="chevron" data-uk-icon="icon: chevron-right; ratio: 3.5"></span></a>
          </div>
        </div>
      </div>
    );
  }
}

export default LastPictures;
