import React, { Component } from "react";
import axios from "axios";
import Dropzone from "react-dropzone";
import "../style.css";

const LINK = "http://localhost:3222/";

export class Krea extends Component {
  state = {
    krea_title: "",
    krea_url: [],
    krea_signature: ""
  };
  componentDidMount() {
    this.getAllState();
  }

  getAllState = async () => {
    this.setState({ isLoading: true });
    axios.get(`${LINK}getallhomestate`).then(response => {
 

      this.setState({
        krea_title: response.data[0].krea_title,
        krea_url: response.data[0].krea_url,
        krea_signature: response.data[0].krea_signature
      });
    });
  };

  postNewState = e => {
    e.preventDefault();
    let krea = {
      krea_title: this.state.krea_title,
      krea_url: this.state.krea_url,
      krea_signature: this.state.krea_signature
    };
    console.log(krea);

    axios.post(`${LINK}postkrea`, krea).then(response => {
      this.setState({ message: response.data });
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
            krea_url: [
              ...this.state.krea_url,
              response.data.secure_url
            ]
          });
        });
    });

    axios.all(uploads).then(() => {
      console.log("Images have all being uploaded");
    });
  };
  renderMessage = () => {
    if (this.state.message) {
      return <div>Enregistrement effetué</div>;
    }
  };

  handleChangeKrea_title =(e)=>{
    this.setState({ krea_title:e.target.value })
  }
  handleChangeKrea_signature =(e)=>{
    this.setState({ krea_signature:e.target.value })
  }
  removeKreaUrl = (e, index) => {
    this.setState(
      {
        krea_url: this.state.krea_url.filter((stay, i) => index !== i)
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
            <h3 className="uk-text-primary">Krea</h3>
            <div className="uk-margin ">
            <label className="uk-form-label" htmlFor="form-stacked-text">
                  Titre
                </label>
                <div className="uk-form-controls">
                  <input
                    className="uk-input uk-form-width-medium"
                    id="form-stacked-text"
                    type="text"
                    placeholder="..."
                    defaultValue={this.state.krea_title}
                    onChange={this.handleChangeKrea_title}
                  />
                </div>
            
            </div>
            <div className="uk-margin ">
            <label className="uk-form-label" htmlFor="form-stacked-text">
                  Signature
                </label>
                <div className="uk-form-controls">
                  <input
                    className="uk-input uk-form-width-medium"
                    id="form-stacked-text"
                    type="text"
                    placeholder="..."
                    defaultValue={this.state.krea_signature}
                    onChange={this.handleChangeKrea_signature}
                  />
                </div>
                </div>
                <div className="uk-margin ">
                
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
                        <strong className="uk-text-danger">carré (max 7 photos)</strong>
                      </div>
                      {isDragReject && <div>Unsupported file type...</div>}
                    </div>
                  );
                }}
              </Dropzone>
                
                </div>

                <div className="uk-margin uk-flex uk-flex-row">
                 {this.state.krea_url.map((url, index) => {
                  return (
                    <div key={index} className="uk-flex uk-flex-column">
                      <div>
                        <img
                          src={url}
                          width="100"
                          alt=""
                          className="uk-margin-right"
                        />
                      </div>
                      <div className="uk-text-center uk-margin-right">
                        <button
                          className="button-trash"
                          onClick={e => this.removeKreaUrl(e, index)}
                        >
                          <span uk-icon="trash" />
                        </button>
                      </div>
                    </div>
                  );
                })}
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
            </form>
            </div>
    );
  }
}

export default Krea;
