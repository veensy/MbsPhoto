import React, { Component } from "react";
import axios from "axios";
import "../style.css";
import Dropzone from "react-dropzone";

const LINK = "http://localhost:3222/";

export class LastPicture extends Component {
  state = {
    lastpicture_url: [],
    lastpicture_story: [],
    lastpicture_date: [],
    dropzone: [],
    trashbutton: []
  };

  componentDidMount() {
    this.getAllState();
  }

  getAllState = async () => {
    this.setState({ isLoading: true });
    axios.get(`${LINK}getallhomestate`).then(response => {
      this.setState({
        lastpicture_title: response.data[0].lastpicture_title,
        lastpicture_url: response.data[0].lastpicture_url,
        lastpicture_story: response.data[0].lastpicture_story,
        lastpicture_date: response.data[0].lastpicture_date,
        dropzone:response.data[0].lastpicture_story,
        trashbutton:response.data[0].lastpicture_story,

      });
    });
  };
  postNewState = e => {
    e.preventDefault();
    let lastpictures = {
      lastpicture_url: this.state.lastpicture_url,
      lastpicture_story: this.state.lastpicture_story,
      lastpicture_date: this.state.lastpicture_date
    };
    axios.post(`${LINK}postlastpictures`, lastpictures).then(response => {
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
            lastpicture_url: [
              ...this.state.lastpicture_url,
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
  addColumnInput = e => {
    if (e.key === "Enter") {
      this.addColumn();
    }
  };
  addColumn = async () => {
    await this.setState(
      {
        lastpicture_story: this.state.lastpicture_story.concat([""]),
        lastpicture_date: this.state.lastpicture_date.concat([""]),
        dropzone: this.state.dropzone.concat([""]),
        trashbutton: this.state.trashbutton.concat([""])
      },
      () => {
        this.refs["story" + (this.state.lastpicture_story.length - 1)].focus();
      }
    );
  };

  handleChangeStory = index => e => {
    const newStory = this.state.lastpicture_story.map((story, idx) => {
      if (index !== idx) {
        return story;
      } else {
        return e.target.value;
      }
    });
    this.setState({
      lastpicture_story: newStory
    });
  };

  handleChangeDate = index => e => {
    const newDate = this.state.lastpicture_date.map((date, idx) => {
      if (index !== idx) {
        return date;
      } else {
        return e.target.value;
      }
    });
    this.setState({
      lastpicture_date: newDate
    });
  };
  removeColumn = (e, index) => {
    this.setState(
      {
        lastpicture_story: this.state.lastpicture_story.filter(
          (stay, i) => index !== i
        ),
        lastpicture_url: this.state.lastpicture_url.filter(
          (stay, i) => index !== i
        ),
        lastpicture_date: this.state.lastpicture_date.filter(
          (stay, i) => index !== i
        ),
        dropzone: this.state.dropzone.filter((stay, i) => index !== i),
        trashbutton: this.state.trashbutton.filter((stay, i) => index !== i)
      },
      () => {
        this.postNewState(e);
      }
    );
  };
  render() {
    

    const baseStyle = {
      width: 126,
      height: 126,
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
              <h3 className="uk-text-primary">Last Pictures</h3>

              <div className="uk-flex uk-flex-column ">
                <button
                  onClick={this.addColumn}
                  type="button"
                  // eslint-disable-next-line
                  href="javascript:void"
                  className="button-add-plus uk-text-danger"
                >
                  <span uk-icon="plus-circle" />
                </button>

                <div className="uk-margin uk-flex uk-flex-row  uk-flex-wrap">
                  <label
                    className="uk-form-label uk-margin-right label-title"
                    htmlFor="form-stacked-text"
                  >
                    Histoire
                  </label>

                  {this.state.lastpicture_story.map((story, index) => (
                    <div key={index} className="uk-form-controls ">
                      <textarea
                        type="text"
                        className="uk-textarea uk-form-width-small uk-margin-right "
                        rows="5"
                        placeholder="..."
                        defaultValue={story}
                        onKeyPress={e => this.addColumnInput(e)}
                        onChange={this.handleChangeStory(index)}
                        ref={"story" + index}
                        name={story + index}
                      />
                    </div>
                  ))}
                </div>

                <div className="uk-margin  uk-flex uk-flex-row  uk-flex-wrap">
                  <label
                    className="uk-form-label uk-margin-right label-title"
                    htmlFor="form-stacked-text"
                  >
                    Date
                  </label>
                  {this.state.lastpicture_date.map((date, index) => (
                    <div key={index} className="uk-form-controls">
                      <input
                        className="uk-input uk-form-width-small uk-margin-right"
                        id="form-stacked-text"
                        type="text"
                        placeholder="..."
                        defaultValue={date}
                        onKeyPress={e => this.addColumnInput(e)}
                        onChange={this.handleChangeDate(index)}
                        ref={"date" + index}
                        name={date + index}
                      />
                    </div>
                  ))}
                </div>

                <div className="uk-margin  uk-flex uk-flex-row  uk-flex-wrap">
                  <label className="uk-form-label uk-margin-right label-title">
                    Picture
                  </label>
                  {this.state.dropzone.map((zone, index) => (
                    <Dropzone
                      key={index}
                      onDrop={this.handleUploadImages}
                      multiple
                      accept="image/*"
                      ref={"url" + index}
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
                          <div
                            {...getRootProps()}
                            style={styles}
                            className="uk-margin-right"
                          >
                            <input {...getInputProps()} />
                            <div>
                              {isDragAccept ? "Drop" : "Drag"} slides here...{" "}
                            </div>
                            <div>
                             
                              <strong className="uk-text-danger">
                               mode paysage 
                              </strong>
                            </div>
                            {isDragReject && (
                              <div>Unsupported file type...</div>
                            )}
                          </div>
                        );
                      }}
                    </Dropzone>
                  ))}
                </div>

                <div className="uk-margin  uk-flex uk-flex-row  uk-flex-wrap">
                  <label className="uk-form-label uk-margin-right label-title" />
                  {this.state.lastpicture_url.map((url, index) => (
                    <div key={index}>
                      <div className="uk-margin">
                        <img
                          src={this.state.lastpicture_url[index]}
                          width="130"
                          alt=""
                          className="uk-margin-right"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="uk-margin  uk-flex uk-flex-row  uk-flex-wrap">
                  <label className="uk-form-label uk-margin-right label-title" />
                  {this.state.trashbutton.map((button, index) => (
                    <div key={index}>
                      <div className="uk-margin uk-margin-right">
                        <div className="uk-text-center trash-div">
                          <button
                            className="button-trash"
                            onClick={e => this.removeColumn(e, index)}
                          >
                            <span uk-icon="trash" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
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

export default LastPicture;
