import React, { Component } from "react";
import axios from "axios";
import Dropzone from "react-dropzone";
import "../style.css";
require("dotenv").config();

const LINK = "http://localhost:3222/";
export default class Slides extends Component {
  state = { files: [], slider_title: [], slider_url: [] };
  componentDidMount() {
    this.getAllState();
  }

  getAllState = async () => {
    this.setState({ isLoading: true });
    axios.get(`${LINK}getallhomestate`).then(response => {
      this.setState({
        slider_url: response.data[0].slider_url
      });
    });
  };

  handleUploadImages = images => {
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
          this.setState({
            slider_url: [...this.state.slider_url, response.data.secure_url]
          });
        });
    });

    axios.all(uploads).then(() => {
      console.log("Images have all being uploaded");
    });
  };

  removeSlide = (e, index) => {
    this.setState(
      {
        slider_url: this.state.slider_url.filter((stay, i) => index !== i)
      },
      () => {
        this.postNewState(e);
      }
    );
  };

  postNewState = e => {
    e.persist();
    let slider = { slider_url: this.state.slider_url };
    this.setState({ isLoading: true });
    axios.post(`${LINK}postslider`, slider).then(response => {
      this.setState({ message: response.data });
    });
  };
  renderMessage = () => {
    if (this.state.message) {
      return <div>Enregistrement effetué</div>;
    }
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
        <div className="uk-section uk-section-muted ">
          <div className="uk-container uk-margin-remove">
            <h3 className="uk-text-primary">Slider</h3>
          </div>
          <div >
            <section className="uk-flex uk-flex-center ">
              <Dropzone
                onDrop={this.handleUploadImages}
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
                        <strong className="uk-text-danger">5760 × 3840</strong>
                      </div>
                      {isDragReject && <div>Unsupported file type...</div>}
                    </div>
                  );
                }}
              </Dropzone>
            </section>
            <div className="uk-margin-top ">
              <div
                className="uk-flex uk-flex-row uk-flex-center"
                data-uk-margin
              >
                {this.state.slider_url.map((slide, index) => {
                  return (
                    <div key={index} className="uk-flex uk-flex-column">
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
                          onClick={e => this.removeSlide(e, index)}
                        >
                          <span uk-icon="trash" />
                        </button>
                      </div>
                    </div>
                  );
                })}
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
        </div>
      </div>
    );
  }
}
