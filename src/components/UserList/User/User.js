import React from 'react';
import PropTypes from 'prop-types';

import css from './User.module.css';

const User = (props) => {
    const userCss = [css.User];
    if (props.isYou)    userCss.push(css.You);

    return (
        <div className={userCss.join(" ")} style={{color: props.nameColor}}>
            <div className={css.OnlineIndicator}></div>
            <span className={css.Username}>{props.children}</span>
        </div>
    );
};

User.propTypes = {
    nameColor: PropTypes.string,
    isYou: PropTypes.bool
};

export default User;