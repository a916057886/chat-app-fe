import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as socketEvents from '../../constant/socketEvents.js';
import * as actions from '../../store/actions/actions.js';
import css from './ChatRoom.module.css';
import UserBar from '../../components/UserBar/UserBar.js';
import MessageHistory from '../../components/MessageHistory/MessageHistory.js';
import InputArea from '../../components/InputArea/InputArea.js';
import UserList from '../../components/UserList/UserList.js';
import Button from '../../components/UI/Button/Button.js';
import Modal from '../../components/UI/Modal/Modal.js';

class ChatRoom extends Component {
    state = {
        showMiniUserList: false,
        showCopiedSuccessMessage: false,
        copiedMessageTimeout: null,
        changeUsernameErrorMessage: null,
        usernameErrorTimeout: null,
        usersRetrievalError: null,
        messagesRetrievalError: null,
        sentMessageError: null,
        messagesEndRef: React.createRef()
    };

    textCopyHandler = (text) => {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);

        clearTimeout(this.state.copiedMessageTimeout);
        this.setState({
            showCopiedSuccessMessage: true,
            copiedMessageTimeout: setTimeout(() => {
                this.setState({showCopiedSuccessMessage: false})
            }, 2000)
        });
    }

    messageTypedHandler = (event) => {
        this.props.onMessageTyped(event.target.value);
    }

    messageSentHandler = (event, message, userId) => {
        if (event.keyCode === 13 || event.which === 13) {
            this.props.socket.emit(socketEvents.MESSAGE_SENT_ATTEMPT, {message: message, user_id: userId});
            this.props.onMessageClear();
        }
    }

    showUsersHandler = () => {
        this.setState((prevState) => {
            return {showMiniUserList: !prevState.showMiniUserList};
        });
    }

    scrollToBottom = () => {
        if (this.state.messagesEndRef.current) {
            this.state.messagesEndRef.current.scrollIntoView({behavior: "smooth"});
        }
    }

    updateMyself = () => {
        this.props.socket.on(socketEvents.CHANGE_USERNAME, data => {
            if (data.username) {
                this.props.onMyUsernameUpdated(data.username);
            }
            else if (data.error) {
                clearTimeout(this.state.usernameErrorTimeout);
                this.setState({
                    changeUsernameErrorMessage: data.error,
                    usernameErrorTimeout: setTimeout(() => {
                        this.setState({changeUsernameErrorMessage: null})
                    }, 2000)
                });
            }
        });
        this.props.socket.on(socketEvents.CHANGE_NAME_COLOR, data => {
            if (data.nameColor) {
                this.props.onMyNameColorUpdated(data.nameColor);
            }
        });
    }

    retrieveUsers = () => {
        this.props.socket.emit(socketEvents.USERS_RETRIEVAL_ATTEMPT, {});
        this.props.socket.on(socketEvents.USERS_RETRIEVAL_RESULT, data => {
            if (data.users) {
                this.props.onUsersRetrieved(data.users);
            }
            else if (data.error) {
                this.setState({usersRetrievalError: data.error});
            }
        });
    }

    updateUsers = () => {
        this.props.socket.on(socketEvents.USER_CONNECTED, data => {
            if (data.user) {
                this.props.onUserConnected(data.user);
            }
        });
        this.props.socket.on(socketEvents.USER_DISCONNECTED, data => {
            if (data.user_id) {
                this.props.onUserDisconnected(data.user_id);
            }
        });
    }

    retrieveMessages = () => {
        this.props.socket.emit(socketEvents.MESSAGES_RETRIEVAL_ATTEMPT, {});
        this.props.socket.on(socketEvents.MESSAGES_RETRIEVAL_RESULT, data => {
            if (data.messages) {
                this.props.onMessagesRetrieved(data.messages);
                this.scrollToBottom();
            }
            else if (data.error) {
                this.setState({messagesRetrievalError: data.error});
            }
        });
    }

    updateMessages = () => {
        this.props.socket.on(socketEvents.MESSAGE_SENT_RESULT, data => {
            if (data.message) {
                this.props.onNewMessageRetrieved(data.message);
                this.scrollToBottom();
            }
            else if (data.error) {
                this.setState({sentMessageError: data.error});
            }
        });
    }

    componentDidMount = () => {
        this.updateMyself();
        this.retrieveUsers();
        this.updateUsers();
        this.retrieveMessages();
        this.updateMessages();
    }

    render() {
        return (
            <Fragment>
                <div className={css.ChatRoom}>
                    <div className={css.Left}>
                        <div className={css.Top}>
                            <UserBar username={this.props.username} nameColor={this.props.nameColor} />
                        </div>
                        <div className={css.Middle}>
                            <MessageHistory messages={this.props.messages} users={this.props.users} myUserId={this.props.userId} clickedHandler={this.textCopyHandler} ref={this.state.messagesEndRef}/>
                        </div>
                        <div className={css.Bottom}>
                            <InputArea userId={this.props.userId} value={this.props.inputMessage} keystrokeHandler={this.messageTypedHandler} messageSentHandler={this.messageSentHandler} />
                        </div>
                    </div>
                    <div className={css.Right}>
                        <UserList users={this.props.users} myUserId={this.props.userId} showMini={this.state.showMiniUserList} />
                    </div>
                </div>
                <Button showUsersHandler={this.showUsersHandler}>
                    <i className="fas fa-users"></i>
                </Button>
                <Modal show={this.state.showCopiedSuccessMessage}>Text Copied!</Modal>
                <Modal show={this.state.changeUsernameErrorMessage != null} error>{this.state.changeUsernameErrorMessage}</Modal>
            </Fragment>
        );
    }
}

ChatRoom.propTypes = {
    socket: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return {
        userId: state.user.userId,
        username: state.user.username,
        nameColor: state.user.nameColor,
        users: state.user.users,
        inputMessage: state.message.inputMessage,
        messages: state.message.messages
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onMyUsernameUpdated: (username) => dispatch(actions.updateMyUsername(username)),
        onMyNameColorUpdated: (nameColor) => dispatch(actions.updateMyNameColor(nameColor)),
        onUsersRetrieved: (users) => dispatch(actions.retrieveUsers(users)),
        onUserConnected: (user) => dispatch(actions.userConnected(user)),
        onUserDisconnected: (userId) => dispatch(actions.userDisconnected(userId)),
        onMessageTyped: (message) => dispatch(actions.typeMessage(message)),
        onMessageClear: () => dispatch(actions.clearMessage()),
        onMessagesRetrieved: (messages) => dispatch(actions.retrieveMessages(messages)),
        onNewMessageRetrieved: (message) => dispatch(actions.retrieveNewMessage(message))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatRoom);