import React from 'react';
import PropTypes from 'prop-types';

import css from './UserList.module.css';
import User from './User/User.js';

const UserList = (props) => {
    return (
        <div className={css.UserList}>
            <h3 className={css.Title}>Online User(s)</h3>
            {props.users
            ? props.users.filter(user => {
                return user.online;
            }).map(user => {
                return (
                    <User key={user.userId} nameColor={user.nameColor} isYou={props.myUserId === user.userId}>
                        {user.username}
                    </User>
                );
            })
            : null}
        </div>
    );
};

UserList.propTypes = {
    users: PropTypes.arrayOf(PropTypes.object),
    myUserId: PropTypes.string.isRequired
};

export default UserList;