import React from 'react';
import PropTypes from 'prop-types';

import css from './WelcomeScreen.module.css';

const WelcomeScreen = (props) => {
    return (
        <div className={css.WelcomeScreen}>
            {props.isNewUser ? "Welcome To WhatsChat" : "Greeting"}
            <div className={css.Username} style={{color: props.nameColor}}>{props.username}</div>
        </div>
    );
};

WelcomeScreen.propTypes = {
    username: PropTypes.string,
    nameColor: PropTypes.string,
    isNewUser: PropTypes.bool
};

export default WelcomeScreen;