import React, { Component } from "react";
import axios from "axios";
import Dropzone from "react-dropzone";
import "../style.css";

const LINK = "http://localhost:3222/";

export class FourFrames extends Component {
  state = {
    fourframes_title: ["", "", "", ""],
    fourframes_subtitle: ["", "", "", ""],
    fourframes_url: []
  };
  componentDidMount() {
    this.getAllState();
  }

  getAllState = async () => {
    this.setState({ isLoading: true });
    axios.get(`${LINK}getallhomestate`).then(response => {
 

      this.setState({
        fourframes_title: response.data[0].fourframes_title,
        fourframes_subtitle: response.data[0].fourframes_subtitle,
        fourframes_url: response.data[0].fourframes_url
      });
    });
  };

  postNewState = e => {
    e.preventDefault();
    let fourframes = {
      fourframes_title: this.state.fourframes_title,
      fourframes_subtitle: this.state.fourframes_subtitle,
      fourframes_url: this.state.fourframes_url
    };


    axios.post(`${LINK}postfourframes`, fourframes).then(response => {
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
            fourframes_url: [
              ...this.state.fourframes_url,
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
  handleChangeFourframes_title = index => e => {
    let newframe = this.state.fourframes_title;
    for(let i =0;i<4;i++){
      newframe[index] = e.target.value;
    }
    this.setState({ fourframes_title: newframe });
  };
  handleChangeFourframes_subtitle = index => e => {
    let newframe = this.state.fourframes_subtitle;
    
     for(let i =0;i<4;i++){
      newframe[index] = e.target.value;
    }

    this.setState({ fourframes_subtitle: newframe });
  };
  removePhoto = (e, index) => {
    this.setState(
      {
        fourframes_url: this.state.fourframes_url.filter(
          (stay, i) => index !== i
        )
      },
      () => {
        this.postNewState(e);
      }
    );
  };

  render() {
    const FOURFRAMES = ["", "", "", ""];
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
        <div className="">
          <div className="uk-container uk-margin-remove">
            <h3 className="uk-text-primary">Four Frames</h3>
            <div className="uk-flex uk-flex-center uk-flex-row uk-flex-between">
              {FOURFRAMES.map((el, index) => {
                return (
                  <div key={index}>
                    <div className="uk-margin-bottom">
                      <label
                        className="uk-form-label"
                        htmlFor="form-stacked-text"
                      >
                        Titre
                      </label>
                      <div className="uk-form-controls">
                        <input
                          className="uk-input uk-form-width-medium"
                          id="form-stacked-text"
                          type="text"
                          placeholder="..."
                          defaultValue={this.state.fourframes_title[index]}
                          onChange={this.handleChangeFourframes_title(index)}
                        />
                      </div>
                    </div>
                    <div className="uk-margin-bottom">
                      <label
                        className="uk-form-label "
                        htmlFor="form-stacked-text"
                      >
                        Sous-titre
                      </label>
                      <div className="uk-form-controls ">
                        <input
                          className="uk-input uk-form-width-medium"
                          id="form-stacked-text"
                          type="text"
                          placeholder="..."
                          defaultValue={this.state.fourframes_subtitle[index]}
                          onChange={this.handleChangeFourframes_subtitle(index)}
                        />
                      </div>
                    </div>
                    <div>
                      <Dropzone
                        onDrop={this.handleUploadImages}
                        multiple
                        accept="image/*"
                        className="uk-margin-bottom"
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
                                <strong className="uk-text-danger">
                                  ~ 1600 x 1066
                                </strong>
                              </div>
                              {isDragReject && (
                                <div>Unsupported file type...</div>
                              )}
                            </div>
                          );
                        }}
                      </Dropzone>
                    </div>
                  </div>);
              })}
              </div>
              <div className=" uk-flex uk-flex-row uk-margin-top uk-margin-bottom" >
             
                  {this.state.fourframes_url.map((url, idx) => {
                    return (
                      <div key={idx} className="uk-flex uk-flex-column ">
                      <div>
                        <img
                          src={url}
                          width="100"
                          alt=""
                          className="fixmargin uk-margin-medium-left"
                        /></div>

                        <div className="uk-text-center ">
                          <button
                            className="button-trash"
                            onClick={e => this.removePhoto(e, idx)}
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
    );
  }
}

export default FourFrames;
