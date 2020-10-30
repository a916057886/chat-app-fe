import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

import css from './MessageHistory.module.css';
import Message from './Message/Message.js';

const getUserNameAndColor = (users, userId) => {
    if (!users) return ["Unknown", null];

    const userFound = users.filter(user => {
        return user.userId === userId;
    });

    return userFound.length === 1
        ? [userFound[0].username, userFound[0].nameColor]
        : ["Unknown", "#ffffff"];
}

const MessageHistory = forwardRef((props, ref) => {
    return (
        <div className={css.MessageHistory}>
            {props.messages
            ? props.messages.map(message => {
                const usernameAndColor = getUserNameAndColor(props.users, message.userId);

                return (
                    <Message
                        key={message.id}
                        username={usernameAndColor[0]}
                        nameColor={usernameAndColor[1]}
                        timestamp={message.time}
                        isYou={props.myUserId === message.userId}
                        clickedHandler={props.clickedHandler}
                    >
                        {message.text}
                    </Message>
                );
            })
            : null}
            <div id="bottom" style={{float: "left", clear: "both"}} ref={ref}></div>
        </div>
    );
});

MessageHistory.propTypes = {
    messages: PropTypes.arrayOf(PropTypes.object),
    users: PropTypes.arrayOf(PropTypes.object),
    myUserId: PropTypes.string.isRequired,
    clickedHandler: PropTypes.func.isRequired
};

export default MessageHistory;