import React, { Component } from "react";
import axios from "axios";
import "./NavBar.css";

const LINK = "http://localhost:3222/";

export class Footer extends Component {
  state = {
    contact_name: "",
    contact_email: "",
    contact_phone: "",
    contact_social_name: [],
    contact_social_url: [],
    contact_social_icon: [],
    categories_name: []
  };
  componentDidMount() {
    this.getAllState();
  }

  getAllState = async () => {
    this.setState({ isLoading: true });
    axios.get(`${LINK}getallhomestate`).then(response => {
      this.setState({
        contact_name: response.data[0].contact_name,
        contact_email: response.data[0].contact_email,
        contact_phone: response.data[0].contact_phone,
        contact_social_name: response.data[0].contact_social_name,
        contact_social_url: response.data[0].contact_social_url,
        contact_social_icon: response.data[0].contact_social_icon,
        categories_name: response.data[0].categories_name
      });
    });
  };
  renderIcon = () => {};

  render() {
    const firshalf = this.state.categories_name.slice(
      0,
      this.state.categories_name.length / 2
    );
    const secohalf = this.state.categories_name.slice(
      this.state.categories_name.length / 2
    );

    return (
      <div>
        <div className="uk-flex uk-flex-row uk-flex-center uk-flex-around firstrow ">
          <div className=" uk-flex uk-flex-column uk-text-center firstcolumn uk-margin-top">
            <h3 className="contact_titre">Contact</h3>
            <p>
              <span className="uk-margin-right" uk-icon="user" />
              {this.state.contact_name}
            </p>
            <p>
              <span className="uk-margin-right" uk-icon="mail" />
              {this.state.contact_email}
            </p>
            <p>
              <span className="uk-margin-right" uk-icon="receiver" />
              {this.state.contact_phone}
            </p>
          </div>
          <div className="uk-flex uk-flex-column uk-text-center secondecolumn uk-margin-top">
            <h3 className="contact_titre">Réseaux sociaux</h3>
            <div className="uk-flex uk-flex-row uk-flex-center ">
              {this.state.contact_social_url.map((url, index) => {
                if (url) {
                  return (
                    <a href={url} key={index} target="blank">
                      <img
                        src={this.state.contact_social_icon[index]}
                        alt="icone-reseau-sociaux"
                        width="22rem"
                        className="uk-margin-right"
                      />
                    </a>
                  );
                }
              })}
            </div>
          </div>
          <div className="uk-flex uk-flex-column third column uk-text-center uk-margin-top">
            <h3 className="contact_titre">Catégories</h3>
            <div className="uk-flex uk-flex-row uk-flex-around ">
              <div>
                {firshalf
                  ? firshalf.map((category, index) => (
                      <p key={index}>{category}</p>
                    ))
                  : ""}
              </div>
              <div>
                {firshalf
                  ? secohalf.map((category, index) => (
                      <p key={index}>{category}</p>
                    ))
                  : ""}
              </div>
            </div>
          </div>
        </div>
        <div className="uk-flex uk-flex-row uk-flex-center seconderow ">
          <p className="">© copyright 2018 / BksDev</p>
        </div>
      </div>
    );
  }
}
export default Footer;
