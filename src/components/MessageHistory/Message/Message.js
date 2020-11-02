import React from 'react';
import PropTypes from 'prop-types';

import css from './Message.module.css';

const Message = (props) => {
    const messageBoxCss = [css.MessageBox];
    if (props.isYou)    messageBoxCss.push(css.You);

    let text = props.children;
    text = text.replaceAll(":)", "😁");
    text = text.replaceAll(":(", "🙁");
    text = text.replaceAll(":o", "😲");

    return (
        <div className={messageBoxCss.join(" ")}>
            <div className={css.Info}>
                <span className={css.Username} style={{color: props.nameColor}} onClick={() => props.clickedHandler(props.username)}>{props.username}</span>
                <span className={css.Timestamp}>{props.timestamp}</span>
            </div>
            <div style={{clear: "both"}}></div>
            <div style={{height: "auto", padding: "3px 0"}}>
                <span className={css.Message} onClick={() => props.clickedHandler(props.children)}>{text}</span>
                <div style={{clear: "both"}}></div>
            </div>
        </div>
    );
};

Message.propTypes = {
    username: PropTypes.string.isRequired,
    nameColor: PropTypes.string,
    timestamp: PropTypes.string.isRequired,
    isYou: PropTypes.bool,
    clickedHandler: PropTypes.func.isRequired
};

export default Message;