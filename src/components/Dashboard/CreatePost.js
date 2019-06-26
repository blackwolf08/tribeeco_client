import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Alert from "react-bootstrap/Alert";

import axios from "../../utils/axios";
import { isValidUrl } from "../../utils";
import Loader from "../Common/Loader";

import { EditorState, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { stateToHTML } from "draft-js-export-html";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

let htmlOptions = {
  entityStyleFn: entity => {
    const entityType = entity.get("type").toLowerCase();
    if (entityType === "link") {
      const data = entity.getData();
      return {
        element: "a",
        attributes: {
          href: data.url,
          target: "_blank"
        }
      };
    }
  }
};

const UploadOption = props => {
  const onChange = e => {
    let reader = new FileReader();
    let file = e.target.files[0];

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      props.setImage(reader.result, file);
    };
  };

  return (
    <>
      <label htmlFor="post-picture" className="btn rdw-dropdown-wrapper">
        <FontAwesomeIcon icon="image" />
      </label>
      <input
        id="post-picture"
        type="file"
        onChange={onChange}
        accept="image/x-png,image/jpeg,image/jpg"
        hidden
      />
    </>
  );
};
UploadOption.propTypes = {
  setImage: PropTypes.func.isRequired
};

class CreatePost extends React.Component {
  state = {
    editorState: EditorState.createEmpty(),
    isSubmitting: false,
    hasError: false,
    previewURL: null,
    imageFile: null,
    hasLinkPreview: false,
    linkPreviewLoading: false,
    linkPreviewData: {}
  };

  onEditorStateChange = editorState => {
    this.setState({
      editorState
    });
  };
  getPreviewData = url => {
    this.setState({ linkPreviewLoading: true, hasLinkPreview: true });
    axios
      .post("/scrapeLink", { url })
      .then(res => {
        this.setState({ linkPreviewLoading: false, linkPreviewData: res.data });
      })
      .catch(err => {
        console.log(err);
        this.setState({ hasLinkPreview: false });
      });
  };
  handleSubmit = () => {
    if (!this.state.editorState.getCurrentContent().hasText()) return;

    this.setState({ isSubmitting: true });

    const formData = new FormData();
    const file = this.state.imageFile;
    if (file) {
      formData.append("files", file, file.name);
    }
    formData.append(
      "body",
      stateToHTML(this.state.editorState.getCurrentContent(), htmlOptions)
    );
    const { hasLinkPreview } = this.state;
    formData.append("linkPreview", hasLinkPreview);
    if (hasLinkPreview)
      formData.append("link", JSON.stringify(this.state.linkPreviewData));

    axios
      .post("addpost", formData)
      .then(res => {
        const editorState = EditorState.push(
          this.state.editorState,
          ContentState.createFromText("")
        );
        this.setState({
          editorState,
          previewURL: "",
          imageFile: null,
          isSubmitting: false
        });

        let post = {
          ...res.data,
          comments: [],
          likes: [],
          liked: false,
          user: { ...this.props.user }
        };

        this.props.addPostToFeed(post);
      })
      .catch(err => {
        console.log(err);
        this.setState({ hasError: true, isSubmitting: false });
      });

    setTimeout(() => {
      this.setState({ hasError: false });
    }, 3000);
  };
  setImage = (previewURL, imageFile) => {
    this.setState({ previewURL, imageFile, hasLinkPreview: false });
  };
  linkCallback = linkData => {
    if (this.state.previewURL) return;
    this.getPreviewData(linkData.target);
    return linkData;
  };
  handlePastedText = content => {
    if (this.state.previewURL) return;
    if (isValidUrl(content)) this.getPreviewData(content);
  };
  clearLinkPreview = () => {
    this.setState({ hasLinkPreview: false });
  };
  render() {
    const {
      editorState,
      hasError,
      isSubmitting,
      previewURL,
      hasLinkPreview,
      linkPreviewData,
      linkPreviewLoading
    } = this.state;

    const hasContent = editorState.getCurrentContent().hasText() || previewURL;

    return (
      <div className="post-form mb-3">
        <div className="position-relative">
          <Editor
            editorState={editorState}
            editorClassName="post-editor"
            toolbarClassName="post-toolbar"
            onEditorStateChange={this.onEditorStateChange}
            placeholder="What's on your mind?"
            // stripPastedStyles={true}
            handlePastedText={this.handlePastedText}
            toolbarOnFocus
            ReadOnly
            toolbar={{
              options: ["inline", "blockType", "link"],
              inline: {
                options: ["bold", "italic", "underline"]
              },
              blockType: {
                options: ["Normal", "H4", "H5", "H6", "Blockquote", "Code"]
              },
              link: {
                showOpenOptionOnHover: false,
                defaultTargetOption: "_blank",
                options: ["link"],
                linkCallback: this.linkCallback
              }
            }}
            toolbarCustomButtons={[<UploadOption setImage={this.setImage} />]}
          />

          <button
            type="submit"
            className="btn btn-info btn-share m-2"
            disabled={!hasContent || isSubmitting}
            onClick={this.handleSubmit}
          >
            {isSubmitting ? (
              <>
                <FontAwesomeIcon icon="circle-notch" spin /> Sharing
              </>
            ) : (
              "Share"
            )}
          </button>
        </div>
        {previewURL && (
          <div className="p-3">
            <img src={previewURL} className="img-preview" alt="add preview" />
          </div>
        )}
        {hasLinkPreview &&
          (linkPreviewLoading ? (
            <Loader className="pb-2 pb-md-3" />
          ) : (
            <div className="p-2 bg-light">
              <button
                type="button"
                className="close"
                aria-label="Close"
                onClick={this.clearLinkPreview}
              >
                <span aria-hidden="true">&times;</span>
              </button>
              <div className="d-flex align-items-center">
                {linkPreviewData.image && (
                  <img
                    src={linkPreviewData.image}
                    alt="link preview"
                    style={{ maxWidth: 150, height: "100%" }}
                  />
                )}
                <div className="px-2">
                  <a
                    href={linkPreviewData.url}
                    role="heading"
                    aria-level="5"
                    className="h5 link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {linkPreviewData.title}
                  </a>
                  <br />
                  <span className="small">{linkPreviewData.desc}</span>
                </div>
              </div>
            </div>
          ))}
        {hasError && (
          <Alert dismissible variant="danger">
            Server error. Please try again.
          </Alert>
        )}
      </div>
    );
  }
}
CreatePost.propTypes = {
  addPostToFeed: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return { user: state.auth.user };
}

export default connect(mapStateToProps)(CreatePost);
