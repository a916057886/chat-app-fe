import React from 'react';
import PropTypes from 'prop-types';

import css from './UserBar.module.css';
import Button from '../UI/Button/Button.js';

const UserBar = (props) => {
    return (
        <div className={css.UserBar}>
            <Button showUsersHandler={props.showUsersHandler}>
                <i className="fas fa-users"></i>
            </Button>
            Hi, <span className={css.Username} style={{color: props.nameColor}}>{props.username}</span>!
        </div>
    );
};

UserBar.propTypes = {
    username: PropTypes.string.isRequired,
    nameColor: PropTypes.string.isRequired,
    showUsersHandler: PropTypes.func.isRequired
};

export default UserBar;