import React, { Component } from "react";
import axios from "axios";
import "./NavBar.css";

const LINK = "http://localhost:3222/";
export class Krea extends Component {
  state = {
    krea_title: "",
    krea_url: [],
    krea_signature: ""
  };
  componentDidMount() {
    this.getAllState();
  }

  getAllState = async () => {
    this.setState({ isLoading: true });
    axios.get(`${LINK}getallhomestate`).then(response => {

      this.setState({
        krea_title: response.data[0].krea_title,
        krea_url: response.data[0].krea_url,
        krea_signature: response.data[0].krea_signature
      });
    });
  };
  render() {
    return (
      <div className="uk-margin-large-bottom">
        <h1 id="publi" class="uk-text-lead  publication">
          {this.state.krea_title} ...
        </h1>
        <div class="krea_back uk-flex uk-flex-center uk-flex-row uk-flex-nowrap" data-uk-grid>
          {this.state.krea_url.map((url, index) => (
            <div class="krea  " key={index}>
              <div class="uk-cover-container uk-grid-small">
                <img src={url} alt="" />
              </div>
            </div>
          ))}
        </div>
        <div className=" publication">
          <span class="krea_text uk-text-bottom  publication">
            " {this.state.krea_signature} "
          </span>
        </div>
      </div>
    );
  }
}

export default Krea;
