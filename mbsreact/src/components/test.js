import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./NavBar.css";

const LINK = "http://localhost:3222/";

export class FourFrames extends Component {
  state = {
    fourframes_title: [],
    fourframes_subtitle: [],
    fourframes_url: []
  };
  componentDidMount() {
    this.getAllState();
  }

  getAllState = async () => {
    this.setState({ isLoading: true });
    axios.get(`${LINK}getallhomestate`).then(response => {
      console.log(response);

      this.setState({
        fourframes_title: response.data[0].fourframes_title,
        fourframes_subtitle: response.data[0].fourframes_subtitle,
        fourframes_url: response.data[0].fourframes_url
      });
    });
  };
  render() {
    
   return(
       <div>
               <div class="categorie">
          <div>
            {this.state.fourframes_title.map((title, index) => {
              return (
                <Link to={title}>
                  <div class="uk-card uk-card-default uk-card-hover uk-card-body">
                    {this.state.fourframes_url.map((url, idx) => {
                      return (
                        <div
                          class="uk-height-large uk-background-cover uk-overflow-hidden uk-light uk-flex uk-flex-top"
                          style={`background-image: url('${url}');`}
                        >
                          <div class="uk-width-1-2@m uk-text-center uk-margin-auto uk-margin-auto-vertical">
                            <h1 uk-parallax="opacity: 0,1; y: -100,0; scale: 2,1; viewport: 0.5;">
                              Maternité
                            </h1>
                            <p uk-parallax="opacity: 0,1; y: 100,0; scale: 0.5,1; viewport: 0.5;">
                              Grossese & Nouveau-né
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
       </div>
   )
  }
}

export default FourFrames;
