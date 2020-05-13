import React, { Component } from "react";
import "./Dropzone.css";

class Dropzone extends Component {
  constructor(props) {
    super(props);
    this.state = { hightlight: false, fileError: '' };
    this.fileInputRef = React.createRef();

    this.openFileDialog = this.openFileDialog.bind(this);
    this.onFilesAdded = this.onFilesAdded.bind(this);
    this.onDragOver = this.onDragOver.bind(this);
    this.onDragLeave = this.onDragLeave.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.validateFile = this.validateFile.bind(this);
  }

  openFileDialog() {
    if (this.props.disabled) return;
    this.fileInputRef.current.click();
  }

  onFilesAdded(evt) {
    if (this.props.disabled) return;
    const files = evt.target.files[0];

    if (this.props.onFilesAdded && this.validateFile(evt.target.value)) {
      this.props.onFilesAdded(files);
    }else{
      this.props.onFilesAdded("error");
    }
  }

  validateFile(fileName){
    console.log(fileName);
    let idxDot = fileName.lastIndexOf(".") + 1;
    let extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
    this.setState({fileError:""});
    if (extFile !== "txt"){
      this.setState({fileError:"Only text(.txt) file are allowed."});
      return false;
    }
    return true;
  }

  onDragOver(evt) {
    evt.preventDefault();

    if (this.props.disabled) return;

    this.setState({ hightlight: true });
  }

  onDragLeave() {
    this.setState({ hightlight: false });
  }

  onDrop(event) {
    event.preventDefault();

    if (this.props.disabled) return;

    const files = event.dataTransfer.files[0]; 
    if (this.props.onFilesAdded && this.validateFile(event.dataTransfer.files[0].name)) {
      this.props.onFilesAdded(files);
    }else{
      this.props.onFilesAdded("error");
    }

    this.setState({ hightlight: false });
  }

  render() {
    return (
      <div>
        <div
        className={`Dropzone ${this.state.hightlight ? "Highlight" : ""} ${this.state.fileError ? "fileError-container" : ""}`}
        onDragOver={this.onDragOver}
        onDragLeave={this.onDragLeave}
        onDrop={this.onDrop}
        onClick={this.openFileDialog}
        style={{ cursor: this.props.disabled ? "default" : "pointer" }
      
      }
      >
        <input
          ref={this.fileInputRef}
          className="FileInput"
          type="file"
          onChange={this.onFilesAdded}
        />
        <img
          alt="upload"
          className="Icon"
          src="uploadFile.png"
        />
        <span>Upload Files</span>
      </div>
      {this.state.fileError ? <span className="text-danger">{this.state.fileError}</span> : <span></span>  }
      </div>
    );
  }
}

export default Dropzone;
