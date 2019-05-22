import React, { Component } from "react";
import axios from "axios";
import "./NavBar.css";

const LINK = "http://localhost:3222/";

export class Categories extends Component {
  state = { categ_url: [] };
  componentDidMount() {
    this.getAllState();
  }

  getAllState = async () => {
    this.setState({ isLoading: true });
    axios.get(`${LINK}getallhomestate`).then(response => {
      this.setState({
        categ_url: response.data[0].categ_url[this.props.match.params.id]
      });
      console.log(this.state.categ_url);
    });
  };

  renderCategory = () => {
    if (this.state.categ_url.length > 0) {
      return this.state.categ_url.map((url, index) => (
        <li key={index}>
          <img className="uk-position-center category_url" src={url} alt="" />
        </li>
      ));
    }
  };
  render() {
    return (
      <div
        className="  uk-position-relative "
        data-uk-slideshow="animation: fade"
      >
        <ul className=" uk-slideshow-items uk-visible-toggle uk-dark">
          {this.renderCategory()}
        </ul>
        <div className=" uk-slidenav-container uk-margin-medium-bottom">
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a
            className="uk-position-center-left uk-position-small uk-slidenav-large"
            href="#"
            data-uk-slidenav-previous
            data-uk-slideshow-item="previous"
          >
            <span
              className="chevron uk-text-emphasis"
              data-uk-icon="icon: chevron-left; ratio: 3.5"
            />
          </a>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a
            className="uk-position-center-right uk-position-small uk-slidenav-large"
            href="#"
            data-uk-slidenav-next
            data-uk-slideshow-item="next"
          >
            <span
              className="chevron uk-text-emphasis"
              data-uk-icon="icon: chevron-right; ratio: 3.5"
            />
          </a>
        </div>

        <div className="divider " />

        <div
          className="thum uk-container-small uk-position-bottom-center uk-position-small uk-visible-toggle uk-dark "
          data-uk-slider="sets: true"
        >
          <ul className="uk-slider-items  ">
            {this.state.categ_url.map((url, index) => (
              <li key={index} data-uk-slideshow-item={`"${index}"`}>
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a href="#">
                  <img className="thumb-categ_url uk-margin-right" src={url} alt="" />
                </a>
              </li>
            ))}
          </ul>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a
            className="uk-position-left uk-slidenav-large "
            href="#"
            data-uk-slidenav-previous
            data-uk-slider-item="previous"
          >
            <span
              className="chevron uk-text-emphasis "
              data-uk-icon="icon: chevron-left; ratio: 3.5"
            />
          </a>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a
            className="uk-position-right  uk-slidenav-large "
            href="#"
            data-uk-slidenav-next
            data-uk-slider-item="next"
          >
            <span
              className="chevron uk-text-emphasis"
              data-uk-icon="icon: chevron-right; ratio: 3.5"
            />
          </a>
        </div>
      </div>
    );
  }
}

export default Categories;
