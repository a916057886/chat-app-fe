import React from 'react';
import PropTypes from 'prop-types';

import css from './Message.module.css';

const Message = (props) => {
    const messageBoxCss = [css.MessageBox];
    if (props.isYou)    messageBoxCss.push(css.You);

    return (
        <div className={messageBoxCss.join(" ")}>
            <div className={css.Info}>
                <span className={css.Username} style={{color: props.nameColor}} onClick={() => props.clickedHandler(props.username)}>{props.username}</span>
                &nbsp;&nbsp;-&nbsp;&nbsp;
                <span className={css.Timestamp}>{props.timestamp}</span>
            </div>
            <div style={{paddingTop: "3px"}}>
                <span className={css.Message} onClick={() => props.clickedHandler(props.children)}>{props.children}</span>
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