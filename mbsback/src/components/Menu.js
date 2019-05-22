import React, { Component } from "react";
import { Link } from "react-router-dom";

class Menu extends Component {
  render() {
    return (
      <div className="uk-flex uk-flex-center uk-position-center  ">
        <div className="uk-card uk-card-primary uk-card-body uk-card-hover">
          <h3 className="uk-card-title uk-text-center">Menu</h3>
          <hr className="uk-divider-icon" />
          <div className="uk-flex uk-flex-column uk-margin uk-flex-center uk-text-center">
            <Link to="/homepage">
              <button className="uk-button uk-button-danger  uk-margin-bottom">
                Home page{" "}
              </button>
            </Link>
            <Link to="/categories">
              <button className="uk-button uk-button-danger">
                Categories{" "}
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Menu;
