import React, { Component } from "react";
import axios from "axios";
import "../style.css";

const LINK = "http://localhost:3222/";

export class NavBar extends Component {
  state = {
    domain_name: "",
    categories_name: [""],
    message: "",
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
        categories_name: response.data[0].categories_name
      });
    });
  };

  postNewState = e => {
    e.preventDefault();
    let navbar = {
      domain_name: this.state.domain_name,
      categories_name: this.state.categories_name
    };
    axios.post(`${LINK}postnavbar`, navbar).then(response => {
      this.setState({ message: response.data });
    });
  };
  renderMessage = () => {
    if (this.state.message) {
      return <div>Enregistrement effetué</div>;
    }
  };
  handleChangeDomain = e => {
    this.setState({ domain_name: e.target.value });
  };
  handleChangeCategory = index => e => {
    const newCategory = this.state.categories_name.map((category, idx) => {
      if (index !== idx) {
        return category;
      } else {
        return e.target.value;
      }
    });
    this.setState({
      categories_name: newCategory
    });
  };

  addInputOnPress = e => {
    if (e.key === "Enter") {
      this.addInputLink();
    }
  };
  addInputLink = async () => {
    await this.setState(
      {
        categories_name: this.state.categories_name.concat([""])
      },
      () => {
        this.refs["category" + (this.state.categories_name.length - 1)].focus();
      }
    );
  };
  removeInput = (e, index) => {
    this.setState(
      {
        categories_name: this.state.categories_name.filter(
          (stay, i) => index !== i
        )
      },
      () => {
        this.postNewState(e);
      }
    );
  };

  render() {
    return (
      <div>
        <form
          onSubmit={this.postNewState}
          onKeyPress={e => {
            if (e.which === 13) {
              e.preventDefault();
            }
          }}
        >
          <div className="uk-section uk-section-muted ">
            <div className="uk-container uk-margin-remove">
              <h3 className="uk-text-primary">Navbar</h3>

              <div className="uk-margin">
                <label className="uk-form-label" htmlFor="form-stacked-text">
                  Nom du domaine
                </label>
                <div className="uk-form-controls">
                  <input
                    className="uk-input uk-form-width-medium"
                    id="form-stacked-text"
                    type="text"
                    placeholder="..."
                    defaultValue={this.state.domain_name}
                    onChange={this.handleChangeDomain}
                  />
                </div>
              </div>
              <div className="uk-margin">
                <label className="uk-form-label" htmlFor="form-stacked-text">
                  Categories
                </label>
                <div className="uk-flex uk-flex-row uk-flex-wrap ">
                  {this.state.categories_name.map((category, index) => (
                    <div className="uk-form-controls " key={index}>
                      <input
                        className="uk-input uk-form-width-medium"
                        id="form-stacked-text"
                        type="text"
                        placeholder="..."
                        value={category}
                        onKeyPress={e => this.addInputOnPress(e)}
                        onChange={this.handleChangeCategory(index)}
                        ref={"category" + index}
                        name={category + index}
                      />
                      <button
                        className="button-trash"
                        onClick={e => this.removeInput(e, index)}
                      >
                        <span uk-icon="trash" />
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  onClick={this.addInputLink}
                  type="button"
                  // eslint-disable-next-line
                  href="javascript:void"
                  className="button-add uk-text-danger"
                >
                  Ajouter une categorie{" "}
                </button>
              </div>
            </div>
            <div className="uk-flex uk-flex-center">
              <button type="submit" className="uk-button uk-button-danger ">
                Enregistrer
              </button>
            </div>
            <div className="uk-flex uk-flex-center uk-text-success uk-margin-top">
              {this.renderMessage()}
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default NavBar;
