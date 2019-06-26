import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { Formik, Form, Field } from "formik";
import TimeAgo from "timeago-react";

import UserIcon from "../Common/UserIcon";


import io from "socket.io-client";
import { BASE_API_URL } from "../../constants";

const socket = io(BASE_API_URL);

const Message = ({ data }) => (
  <div className={`d-flex my-4 ${data.mine ? "flex-row-reverse" : "flex-row"}`}>
    <UserIcon
      size="2rem"
      iconSize="lg"
      style={{
        flexShrink: 0
      }}
    />
    <div className="message-content">
      <div className={`px-2 ${data.mine ? "text-right" : "text-left"}`}>
        {data.fullname}
      </div>
      <div className="text p-2 bg-light rounded">{data.text}</div>
      <div className={`px-2 ${data.mine ? "text-right" : "text-left"}`}>
        <TimeAgo
          live={false}
          datetime={data.createdAt}
          className="text-muted small"
        />
      </div>
    </div>
  </div>
);

class Chat extends React.Component {
  constructor() {
    super();
    this.state = {
      receiverId: null,
      messages: []
    };
  }
  componentDidMount() {
    this.scrollToBottom();
    this.setState({ receiverId: this.props.receiverId });

    socket.connect();
    socket.emit("chat", {
      user: {
        id: this.props.user.id
      },
      receiver: {
        id: Number(this.props.receiverId)
      }
    });
    // console.log("chat socket on")
    socket.on("priorMessages", messages => {
      if (messages == null || messages === []) return;
      // console.log("messages", messages);
      const formattedMessages = messages.map((item, idx) => {
        if (this.props.receiverId == item.user._id) {
          return {
            ...item,
            mine: false,
            fullname: this.props.receiver.fullname
          };
        }
        return { ...item, mine: true, fullname: this.props.user.fullname };
      });
      this.setState({ messages: formattedMessages });
    });

    socket.on("incomingMessage", message => {
      this.setState(prevState => ({
        messages: [
          ...prevState.messages,
          {
            text: message.text,
            fullname: this.props.receiver.fullname,
            mine: false
          }
        ]
      }));
    });
  }
  sendMessage = message => {
    socket.emit("message", {
      text: message,
      sender: {
        id: this.props.user.id
      },
      receiver: {
        id: Number(this.props.receiver.id)
      }
    });

    this.setState(prevState => ({
      messages: [
        ...prevState.messages,
        {
          text: message,
          fullname: this.props.user.fullname,
          mine: true,
          createdAt: new Date()
        }
      ]
    }));
    this.scrollToBottom();
  };

  scrollToBottom() {
    const scrollHeight = this.messagesList.scrollHeight;
    const height = this.messagesList.clientHeight;
    const maxScrollTop = scrollHeight - height;
    this.messagesList.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
  }
  componentWillUnmount() {
    socket.close();
  }
  render() {
    const { messages } = this.state;
    const { receiver } = this.props;
    return (
      <>
        <div className="bg-primary text-white h5 p-3 font-weight-bold">
          Messages with{" "}
          <Link
            to={`/profile/${this.props.receiverId}`}
            className="text-underline"
          >
            {receiver.fullname}
          </Link>
        </div>
        <div
          className="chatbox flex-grow-1 p-2"
          ref={el => {
            this.messagesList = el;
          }}
        >
          {messages && messages.length > 0
            ? messages.map((item, idx) => <Message data={item} key={idx} />)
            : "No messages yet."}
          <div
            style={{ float: "left", clear: "both" }}
            ref={el => {
              this.messagesEnd = el;
            }}
          />
        </div>
        <Formik
          initialValues={{ message: "" }}
          onSubmit={(values, { setSubmitting, resetForm, setStatus }) => {
            if (values.message) {
              this.sendMessage(values.message);
              resetForm();
            }
          }}
        >
          {({ isSubmitting, status }) => (
            <div className="p-2">
              <Form className="input-group" noValidate>
                <Field
                  id="message"
                  type="text"
                  name="message"
                  placeholder="Type a message..."
                  className="form-control"
                  autoComplete="off"
                />{" "}
                <div className="input-group-append">
                  <button type="submit" className="btn btn-info">
                    Send
                  </button>
                </div>
              </Form>
            </div>
          )}
        </Formik>
      </>
    );
  }
}

function mapStateToProps(state) {
  const { auth } = state;
  const { user } = auth;

  return { user };
}

export default connect(mapStateToProps)(Chat);
