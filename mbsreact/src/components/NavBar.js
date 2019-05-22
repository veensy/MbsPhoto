import React, { Component } from "react";
import "./NavBar.css";
import axios from "axios";
import { Link } from "react-router-dom";

const LINK = "http://localhost:3222/";
export class NavBar extends Component {
  state = {
    domain_name: "",
    categories_name: [""],
    contact_navbar_name: "Contact",
    aboutme_navbar_name: "Moi",
    isLoading: false
  };
  componentDidMount() {
    this.getAllState();
  }

  getAllState = async () => {
    this.setState({ isLoading: true });
    axios.get(`${LINK}getallhomestate`).then(response => {
      this.setState({
        domain_name: response.data[0].domain_name,
        categories_name: response.data[0].categories_name,
        aboutme_navbar_name: response.data[0].aboutme_navbar_name,
        contact_navbar_name: response.data[0].contact_navbar_name
      });
    });
  };
  render() {
    return (
      <div>
        <header>
          <div className="uk-position-relative uk-position-top">
            <div className="posi uk-position-small uk-overlay uk-overlay-default">
              <nav
                className=" uk-navbar-container uk-navbar-transparent"
                data-uk-navbar
              >
                <div className="uk-navbar-left">
                  <ul className="uk-navbar-nav">
                    <li className="uk-parent">
                      {/* eslint-disable-next-line jsx-a11y/anchor-has-content */}
                      <a href="/" data-uk-icon="home" />
                    </li>
                    <li>
                      <a href="index.html" data-uk-scroll>
                        <strong>{this.state.domain_name.slice(0, 3)}</strong>
                        {this.state.domain_name.slice(3)}
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="uk-navbar-right ">
                  <ul className="uk-navbar-nav uk-visible@m uk-navbar-dropdown-nav">
                    {this.state.categories_name.map((category, index) => {
                      return (
                        <li key={index} className="uk-parent">
                          <Link to={`/category/${category}/${index}`}>
                          
                            {category}
                          </Link>
                        </li>
                      );
                    })}

                    <li className="uk-parent">
                      <a href="#moi" data-uk-scroll>
                        {this.state.aboutme_navbar_name}
                      </a>
                    </li>
                    <li className="uk-parent">
                      <a href="#contact" data-uk-scroll>
                        {this.state.contact_navbar_name}
                      </a>
                    </li>
                  </ul>

                  {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                  {/* eslint-disable-next-line jsx-a11y/anchor-has-content */}
                  <a
                    href="#"
                    className="uk-navbar-toggle uk-hidden@m"
                    data-uk-navbar-toggle-icon
                    data-uk-toggle="target: #sidenav"
                  />
                </div>
              </nav>
            </div>
          </div>
        </header>

        <div id="sidenav" uk-offcanvas="flip: true" className="uk-offcanvas">
          <div className="uk-offcanvas-bar">
            <ul className="uk-nav uk-nav-parent-icon" data-uk-nav>
              {this.state.categories_name.map((category, index) => {
                return (
                  <li className="uk-active" key={index}>
                    <a href="art.html">{category}</a>
                  </li>
                );
              })}

              <li>
                <a href="#moi" data-uk-scroll>
                  {this.state.aboutme_navbar_name}
                </a>
              </li>
              <li>
                <a href="#contact">{this.state.contact_navbar_name}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default NavBar;
