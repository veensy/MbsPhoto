import React, { Component } from "react";
import axios from "axios";
import "../style.css";

const LINK = "http://localhost:3222/";

export class Contact extends Component {
  state = {
    contact_name: "",
    contact_email: "",
    contact_phone: "",
    contact_social_name: ["FACEBOOK", "INSTAGRAM", "PINTEREST"],
    contact_social_url: ["", "", ""],
    contact_social_icon: []
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
        contact_social_icon: response.data[0].contact_social_icon
      });
    });
  };

  postNewState = e => {
    e.preventDefault();
    let contact = {
      contact_name: this.state.contact_name,
      contact_email: this.state.contact_email,
      contact_phone: this.state.contact_phone,
      contact_social_icon: [
        "https://res.cloudinary.com/ddpb7vvkt/image/upload/v1552151091/iconfinder_social_media_applications_1-facebook_4102573.png",
        "https://res.cloudinary.com/ddpb7vvkt/image/upload/v1552151091/iconfinder_social_media_applications_3-instagram_4102579.png",
        "https://res.cloudinary.com/ddpb7vvkt/image/upload/v1552151091/iconfinder_social_media_applications_4-pinterest_4102576.png"
      ],
      contact_social_name: ["FACEBOOK", "INSTAGRAM", "PINTEREST"],
      contact_social_url: this.state.contact_social_url
    };

    axios.post(`${LINK}postfooter`, contact).then(response => {
      this.setState({ message: response.data });
    });
  };

  renderMessage = () => {
    if (this.state.message) {
      return <div>Enregistrement effetué</div>;
    }
  };

  handleChangeContactName = e => {
    this.setState({ contact_name: e.target.value });
  };
  handleChangeContactEmail = e => {
    this.setState({ contact_email: e.target.value });
  };
  handleChangeContactPhone = e => {
    this.setState({ contact_phone: e.target.value });
  };
  handleChangeContactSocialUrl = index => e => {
    let newContactSocialUrl = this.state.contact_social_url.slice();
    newContactSocialUrl[index] = [
      ...newContactSocialUrl[index],
      e.target.value
    ];
    this.setState({
      contact_social_url: newContactSocialUrl
    });
  };

  render() {
    return (
      <div className="uk-section uk-section-muted ">
        <form
          onSubmit={this.postNewState}
          onKeyPress={e => {
            if (e.which === 13) {
              e.preventDefault();
            }
          }}
        >
          <h3 className="uk-text-primary uk-margin-medium-left">Footer</h3>
          <div className="uk-flex uk-flex-row uk-flex-middle">
            <div className="uk-container uk-margin-remove">
              <div className="uk-margin">
                <label className="uk-form-label" htmlFor="form-stacked-text">
                  Nom
                </label>
                <div className="uk-form-controls">
                  <input
                    className="uk-input uk-form-width-medium"
                    id="form-stacked-text"
                    type="text"
                    placeholder="..."
                    defaultValue={this.state.contact_name}
                    onChange={this.handleChangeContactName}
                  />
                </div>
              </div>

              <div className="uk-margin">
                <label className="uk-form-label" htmlFor="form-stacked-text">
                  Email
                </label>
                <div className="uk-form-controls">
                  <input
                    className="uk-input uk-form-width-medium"
                    id="form-stacked-text"
                    type="text"
                    placeholder="..."
                    defaultValue={this.state.contact_email}
                    onChange={this.handleChangeContactEmail}
                  />
                </div>
              </div>

              <div className="uk-margin">
                <label className="uk-form-label" htmlFor="form-stacked-text">
                  Tèl
                </label>
                <div className="uk-form-controls">
                  <input
                    className="uk-input uk-form-width-medium"
                    id="form-stacked-text"
                    type="text"
                    placeholder="..."
                    defaultValue={this.state.contact_phone}
                    onChange={this.handleChangeContactPhone}
                  />
                </div>
              </div>
            </div>
            <div className="uk-flex uk-flex-column uk-container uk-margin-remove ">
              <div className="uk-margin">
                {this.state.contact_social_name.map((name, index) => (
                  <div className="uk-margin-bottom" key={index}>
                    <label
                      className="uk-form-label"
                      htmlFor="form-stacked-text"
                    >
                      {name}
                    </label>
                    <div className="uk-form-controls">
                      <input
                        className="uk-input uk-form-width-medium"
                        id="form-stacked-text"
                        type="text"
                        placeholder="..."
                        defaultValue={this.state.contact_social_url[index]}
                        onChange={this.handleChangeContactSocialUrl(index)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="uk-flex uk-flex-center uk-margin">
            <button
              type="button"
              className="uk-button uk-button-danger "
              onClick={this.postNewState}
            >
              Enregistrer
            </button>
          </div>
          <div>
            <div className="uk-flex uk-flex-center uk-text-success uk-margin-top">
              {this.renderMessage()}
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default Contact;
