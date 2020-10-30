import React, { Component } from 'react';
import { connect } from 'react-redux';
import socketIOClient from "socket.io-client";

import "./App.css"
import * as socketEvents from './constant/socketEvents.js';
import * as actions from './store/actions/actions.js';
import LoadingScreen from "./components/LoadingScreen/LoadingScreen.js"
import WelcomeScreen from './components/WelcomeScreen/WelcomeScreen.js';
import ChatRoom from "./containers/ChatRoom/ChatRoom.js"

const uri = 'http://localhost:4000';

class App extends Component {
  state = {
    connectionAttemptTooLongTimeout: null,
    connectionAttemptTooLong: false,
    connectionFailed: false,
    connectionFailedReason: null,
    showWelcomeScreen: true,
    socket: null
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isLoggedin !== this.props.isLoggedin) {
      setTimeout(() => {
        this.setState({showWelcomeScreen: false});
      }, 5000);
    }
  }

  componentDidMount() {
    this.setState({
      connectionAttemptTooLongTimeout: setTimeout(() => {
        this.setState({connectionAttemptTooLong: true})
      }, 10000)
    });

    const socket = socketIOClient(uri);
    this.setState({socket: socket});

    this.loginUser(socket);
  }

  loginUser(socket) {
    const userId = localStorage.getItem("userId");
    socket.emit(socketEvents.USER_JOIN_ATTEMPT, {user_id: userId});
    socket.on(socketEvents.USER_JOIN_RESULT, (data) => {
      if (!data.error) {
        this.props.onAuthenticationSuccess(data.user_id, data.username, data.name_color, data.is_new_user);
      }
      else {
        clearTimeout(this.state.connectionAttemptTooLongTimeout);
        this.setState({connectionFailed: true, connectionFailedReason: data.error.error});
      }
    });
  }

  render() {
    return (
      <div className="App" >
        {this.props.isLoggedin
          ? !this.state.showWelcomeScreen
            ? <ChatRoom socket={this.state.socket} />
            : <WelcomeScreen username={this.props.username} nameColor={this.props.nameColor} isNewUser={this.props.isNewUser} />
          : <LoadingScreen isTooLong={this.state.connectionAttemptTooLong} connectionFailedReason={this.state.connectionFailedReason} />}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedin: state.user.connected && state.user.userId != null,
    username: state.user.username,
    nameColor: state.user.nameColor,
    isNewUser: state.user.isNewUser
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAuthenticationSuccess: (userId, username, nameColor, isNewUser) => dispatch(actions.authenticate(userId, username, nameColor, isNewUser))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
