import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./NavBar.css";

const LINK = "http://localhost:3222/";

export class FourFrames extends Component {
  state = {
    fourframes_title: [],
    fourframes_subtitle: [],
    fourframes_url: [],
    fourframes: []
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
          fourframes_title: response.data[0].fourframes_title,
          fourframes_subtitle: response.data[0].fourframes_subtitle,
          fourframes_url: response.data[0].fourframes_url
        });
      })
      .then(() => {
        let test = [];
        for (let i = 0; i < this.state.fourframes_url.length; i++) {
          test[i] = [
            this.state.fourframes_title[i],
            this.state.fourframes_subtitle[i],
            this.state.fourframes_url[i]
          ];
        }

        this.setState({ fourframes: test });
      });
  };

  renderframe = () => {
    if (this.state.fourframes) {
      return this.state.fourframes.map((el, index) => {
        return (
          <div key={index}>
            <Link to={el[0]}>
              <div
                key={index}
                className="uk-card uk-card-default uk-card-hover uk-card-body"
              >
                <div
                  className="uk-height-large uk-background-cover uk-overflow-hidden uk-light uk-flex uk-flex-top"
                  style={{ backgroundImage: `url(${el[2]})` }}
                >
                  <div className="uk-width-1-2@m uk-text-center uk-margin-auto uk-margin-auto-vertical">
                    <h1 data-uk-parallax="opacity: 0,1; y: -100,0; scale: 2,1; viewport: 0.5;">
                      {el[0]}
                    </h1>

                    <p data-uk-parallax="opacity: 0,1; y: 100,0; scale: 0.5,1; viewport: 0.5;">
                      {el[1]}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        );
      });
    }
  };
  render() {
    return (
      <div>
        <div className="categorie ">
          <div
            className=" uk-child-width-1-2@s uk-grid-match uk-margin "
            data-uk-grid
          >
            {this.renderframe()}
          </div>
        </div>
      </div>
    );
  }
}

export default FourFrames;
