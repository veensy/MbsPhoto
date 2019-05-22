import React, { Component } from "react";
import axios from "axios";
import "./style.css";
import { Link } from "react-router-dom";
import Dropzone from "react-dropzone";

const LINK = "http://localhost:3222/";

export class Categories extends Component {
  state = {
    categories_name: [""],
    files: [],
    categ_url: [
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      ""
    ]
  };
  componentDidMount() {
    this.getAllState();
  }

  getAllState = async () => {
    this.setState({ isLoading: true });
    axios.get(`${LINK}getallhomestate`).then(response => {
      this.setState({
        categories_name: response.data[0].categories_name,
        categ_url:response.data[0].categ_url
      });
    });
  };

  postNewState = e => {
    e.preventDefault();
    let categories = {
      categories_name: this.state.categories_name,
      categ_url: this.state.categ_url
    };
    axios.post(`${LINK}postcategory`, categories).then(response => {
      this.setState({ message: response.data });
    });
  };
  renderMessage = () => {
    if (this.state.message) {
      return <div>Enregistrement effetué</div>;
    }
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
  addFieldInput = e => {
    if (e.key === "Enter") {
      this.addInputLink();
    }
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

  handleUploadImages = index => images => {
    this.setState({
      files: images.map(file =>
        Object.assign(file, {
          preview: URL.createObjectURL(file)
        })
      )
    });
    const uploads = images.map(image => {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("secure", true);
      formData.append("tags", "LOGO"); // Add tags for the images - {Array}
      formData.append("upload_preset", "iophnmh1"); // Replace the preset name with your own
      formData.append("api_key", 989442267651864); // Replace API key with your own Cloudinary API key
      formData.append("timestamp", (Date.now() / 1000) | 0);

      return axios
        .post(
          `https://api.cloudinary.com/v1_1/ddpb7vvkt/image/upload`,
          formData,
          { headers: { "X-Requested-With": "XMLHttpRequest" } }
        )
        .then(response => {
          let unikTab = this.state.categ_url.slice();
          unikTab[index] = [...unikTab[index], response.data.secure_url];

          this.setState({
            categ_url: unikTab
          });
          console.log(this.state.categ_url);
        });
    });

    axios.all(uploads).then(() => {
      console.log("Images have all being uploaded");
    });
  };

  removeSlide = (e, index, index_url) => {
    e.persist();
    console.log(index);
    console.log(index_url);
    let test = this.state.categ_url;
    console.log(test);

    let newCateg_url = test[index].filter((stay, i) => index_url !== i);
    test[index] = newCateg_url;
    console.log(test);

    this.setState(
      {
        categ_url: test
      },
      () => {
        this.postNewState(e);
      }
    );
  };

  render() {
    const baseStyle = {
      width: 200,
      height: 200,
      borderWidth: 2,
      borderColor: "#666",
      borderStyle: "dashed",
      borderRadius: 5
    };
    const activeStyle = {
      borderStyle: "solid",
      borderColor: "#6c6",
      backgroundColor: "#eee"
    };
    const rejectStyle = {
      borderStyle: "solid",
      borderColor: "#c66",
      backgroundColor: "#eee"
    };
    return (
      <div>
        <div
          className="uk-heading-divider uk-section-primary uk-flex uk-flex-row"
          data-uk-sticky="sel-target: .uk-navbar-container; cls-active: uk-navbar-sticky"
        >
          <div className="uk-margin-left">
            <Link to={"/"}>
              <a href="/" data-uk-icon="home" />
            </Link>
          </div>
          <div className="uk-position-top-center">
            <strong>Categories</strong>
          </div>
        </div>
        <form
          onSubmit={this.postNewState}
          onKeyPress={e => {
            if (e.which === 13) {
              e.preventDefault();
            }
          }}
        >
          <div className="uk-section uk-section-muted  uk-text-center">
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
          <div className="uk-flex uk-flex-column uk-flex-wrap uk-text-center uk-section uk-section-muted ">
            {this.state.categories_name.map((category, index) => (
              <div className="uk-form-controls " key={index}>
                <input
                  className="uk-input uk-form-width-medium uk-margin-bottom"
                  id="form-stacked-text"
                  type="text"
                  placeholder="..."
                  value={category}
                  onChange={this.handleChangeCategory(index)}
                  ref={"category" + index}
                  name={category + index}
                  onKeyPress={e => this.addFieldInput(e)}
                />

                <div>
                  <section className="uk-flex uk-flex-center ">
                    <Dropzone
                      onDrop={this.handleUploadImages(index)}
                      multiple
                      accept="image/*"
                      className="uk-margin-right"
                    >
                      {({
                        getRootProps,
                        getInputProps,
                        isDragActive,
                        isDragAccept,
                        isDragReject,
                        acceptedFiles,
                        rejectedFiles
                      }) => {
                        let styles = { ...baseStyle };
                        styles = isDragActive
                          ? { ...styles, ...activeStyle }
                          : styles;
                        styles = isDragReject
                          ? { ...styles, ...rejectStyle }
                          : styles;

                        return (
                          <div {...getRootProps()} style={styles}>
                            <input {...getInputProps()} />
                            <div>
                              {isDragAccept ? "Drop" : "Drag"} picture here...{" "}
                            </div>
                            <div>
                              Taille requise{" "}
                              <strong className="uk-text-danger">
                                5760 × 3840
                              </strong>
                            </div>
                            {isDragReject && (
                              <div>Unsupported file type...</div>
                            )}
                          </div>
                        );
                      }}
                    </Dropzone>
                  </section>
                  <div className="uk-margin-top ">
                    <div
                      className="uk-flex uk-flex-row uk-flex-center uk-flex-wrap"
                      data-uk-margin
                    >
                      {this.state.categ_url[index] ? (
                        this.state.categ_url[index].map((slide, index_url) => {
                          return (
                            <div
                              key={index_url}
                              className="uk-flex uk-flex-column"
                            >
                              <div>
                                <img
                                  src={slide}
                                  width="100"
                                  alt=""
                                  className="uk-margin-right"
                                />
                              </div>
                              <div className="uk-text-center uk-margin-right">
                                <button
                                  className="button-trash"
                                  onClick={e =>
                                    this.removeSlide(e, index, index_url)
                                  }
                                >
                                  <span uk-icon="trash" />
                                </button>
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <div data-uk-spinner />
                      )}
                    </div>
                  </div>
                </div>

                <button
                  className="button-trash uk-text-danger uk-margin-top"
                  onClick={e => this.removeInput(e, index)}

                >
                  <span uk-icon="trash" />
                </button>

                <hr className="uk-divider-icon" />
              </div>
            ))}
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

export default Categories;
