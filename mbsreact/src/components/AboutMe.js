import React, { Component } from "react";
import axios from "axios";
import "./NavBar.css";

const LINK = "http://localhost:3222/";

export class AboutMe extends Component {
  state = {
    aboutme_title: "",
    aboutme_url: "",
    aboutme_subject: "",
    aboutme_paragraph_1: "",
    aboutme_paragraph_2: "",
    aboutme_signature: ""
  };

  componentDidMount() {
    this.getAllState();
  }

  getAllState = async () => {
    this.setState({ isLoading: true });
    axios.get(`${LINK}getallhomestate`).then(response => {
      this.setState({
        aboutme_title: response.data[0].aboutme_title,
        aboutme_url: response.data[0].aboutme_url,
        aboutme_subject: response.data[0].aboutme_subject,
        aboutme_paragraph_1: response.data[0].aboutme_paragraph_1,
        aboutme_paragraph_2: response.data[0].aboutme_paragraph_2,
        aboutme_signature: response.data[0].aboutme_signature
      });
    });
  };
  render() {
    return (
      <div>
        <div id="moi" />
        <h1 className="uk-text-lead titre-moi">{this.state.aboutme_title}</h1>

        <div
          className="whatYouDo uk-flex uk-flex-center uk-margin-xlarge-left uk-margin-xlarge-right uk-card uk-card-default"
          data-uk-grid
        >
          <div className="uk-width-1-3@m  uk-flex-first ">
            <img
              src={this.state.aboutme_url}
              width="275"
              height="200"
              alt="photographe"
            />
          </div>

          <div className="uk-width-2-3@m ">
            <p>
              <br />
              <span>" {this.state.aboutme_subject} "</span>{" "}
              {this.state.aboutme_paragraph_1}
            </p>
            <p>" {this.state.aboutme_paragraph_2} "</p>
            <h2>{this.state.aboutme_signature}</h2>
          </div>
        </div>
      </div>
    );
  }
}

export default AboutMe;
