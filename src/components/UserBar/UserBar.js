import React from 'react';
import PropTypes from 'prop-types';

import css from './UserBar.module.css';

const UserBar = (props) => {
    return (
        <div className={css.UserBar}>
            Hi, <span className={css.Username} style={{color: props.nameColor}}>{props.username}</span>!
        </div>
    );
};

UserBar.propTypes = {
    username: PropTypes.string.isRequired,
    nameColor: PropTypes.string.isRequired
};

export default UserBar;