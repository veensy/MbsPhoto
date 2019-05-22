import React, { Component } from "react";
import axios from "axios";
import Dropzone from "react-dropzone";
import "../style.css";

const LINK = "http://localhost:3222/";
export class AboutMe extends Component {
  state = {
    aboutme_title: "",
    aboutme_url: "",
    aboutme_subject: "",
    aboutme_paragraph_1: "",
    aboutme_paragraph_2: "",
    aboutme_signature: ""
  };

  componentDidMount() {
    this.getAllState();
  }

  getAllState = async () => {
    this.setState({ isLoading: true });
    axios.get(`${LINK}getallhomestate`).then(response => {
      this.setState({
        aboutme_title: response.data[0].aboutme_title,
        aboutme_url: response.data[0].aboutme_url,
        aboutme_subject: response.data[0].aboutme_subject,
        aboutme_paragraph_1: response.data[0].aboutme_paragraph_1,
        aboutme_paragraph_2: response.data[0].aboutme_paragraph_2,
        aboutme_signature: response.data[0].aboutme_signature
      });
    });
  };

  postNewState = e => {
    e.preventDefault();
    let aboutme = {
      aboutme_title: this.state.aboutme_title,
      aboutme_url: this.state.aboutme_url,
      aboutme_subject: this.state.aboutme_subject,
      aboutme_paragraph_1: this.state.aboutme_paragraph_1,
      aboutme_paragraph_2: this.state.aboutme_paragraph_2,
      aboutme_signature: this.state.aboutme_signature
    };
    axios.post(`${LINK}postaboutme`, aboutme).then(response => {
      this.setState({ message: response.data });
    });
  };

  renderMessage = () => {
    if (this.state.message) {
      return <div>Enregistrement effetué</div>;
    }
  };

  handleChangeAboutme_title = e => {
    this.setState({
      aboutme_title: e.target.value
    });
  };

  handleChangeAboutme_subject = e => {
    this.setState({ aboutme_subject: e.target.value });
  };

  handleChangeAboutme_paragraph_1 = e => {
    this.setState({ aboutme_paragraph_1: e.target.value });
  };

  handleChangeAboutme_paragraph_2 = e => {
    this.setState({ aboutme_paragraph_2: e.target.value });
  };

  handleChangeAboutme_signature = e => {
    this.setState({ aboutme_signature: e.target.value });
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
            aboutme_url: response.data.secure_url
          });
        });
    });

    axios.all(uploads).then(() => {
      console.log("Images have all being uploaded");
    });
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
      <div className="uk-section uk-section-muted ">
        <form
          onSubmit={this.postNewState}
          onKeyPress={e => {
            if (e.which === 13) {
              e.preventDefault();
            }
          }}
        >
          <div className="uk-flex uk-flex-row uk-flex-middle">
            <div className="uk-container uk-margin-remove">
              <h3 className="uk-text-primary">About Me</h3>

              <div className="uk-margin">
                <label className="uk-form-label" htmlFor="form-stacked-text">
                  Titre
                </label>
                <div className="uk-form-controls">
                  <input
                    className="uk-input uk-form-width-medium"
                    id="form-stacked-text"
                    type="text"
                    placeholder="..."
                    defaultValue={this.state.aboutme_title}
                    onChange={this.handleChangeAboutme_title}
                  />
                </div>
              </div>

              <div className="uk-margin">
                <label className="uk-form-label" htmlFor="form-stacked-text">
                  Sujet
                </label>
                <div className="uk-form-controls">
                  <input
                    className="uk-input uk-form-width-medium"
                    id="form-stacked-text"
                    type="text"
                    placeholder="..."
                    defaultValue={this.state.aboutme_subject}
                    onChange={this.handleChangeAboutme_subject}
                  />
                </div>
              </div>

              <div className="uk-margin">
                <label className="uk-form-label" htmlFor="form-stacked-text">
                  Paragraphe n°1
                </label>
                <div className="uk-form-controls">
                  <textarea
                    type="text"
                    className="uk-textarea uk-form-width-large"
                    rows="5"
                    placeholder="..."
                    value={this.state.aboutme_paragraph_1}
                    onChange={this.handleChangeAboutme_paragraph_1}
                  />
                </div>
              </div>

              <div className="uk-margin">
                <label className="uk-form-label" htmlFor="form-stacked-text">
                  Paragraphe n°2
                </label>
                <div className="uk-form-controls">
                  <textarea
                    className="uk-textarea uk-form-width-large"
                    rows="5"
                    placeholder="..."
                    value={this.state.aboutme_paragraph_2}
                    onChange={this.handleChangeAboutme_paragraph_2}
                  />
                </div>
              </div>

              <div className="uk-margin">
                <label className="uk-form-label" htmlFor="form-stacked-text">
                  Signature
                </label>
                <div className="uk-form-controls">
                  <input
                    className="uk-input uk-form-width-medium"
                    id="form-stacked-text"
                    type="text"
                    placeholder="..."
                    defaultValue={this.state.aboutme_signature}
                    onChange={this.handleChangeAboutme_signature}
                  />
                </div>
              </div>
            </div>
            <section className="uk-flex uk-flex-right ">
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
                        {isDragAccept ? "Drop" : "Drag"} photo here...{" "}
                      </div>
                      <div>
                        Taille requise{" "}
                        <strong className="uk-text-danger">286 × 289</strong>
                      </div>
                      {isDragReject && <div>Unsupported file type...</div>}
                    </div>
                  );
                }}
              </Dropzone>
              <div className="uk-margin-left ">
                <div className="uk-flex uk-flex-center" data-uk-margin>
                  <div className="uk-flex uk-flex-column">
                    <img
                      src={this.state.aboutme_url}
                      width="100"
                      alt=""
                      className="uk-margin-right"
                    />
                  </div>
                </div>
              </div>
            </section>
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

export default AboutMe;
