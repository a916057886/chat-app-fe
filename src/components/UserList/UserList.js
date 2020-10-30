import React from 'react';
import PropTypes from 'prop-types';

import css from './UserList.module.css';
import User from './User/User.js';

const UserList = (props) => {
    const userList = !props.showMini
    ? (
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
    )
    : (
        <div className={css.MiniUserList}>
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

    return userList;
};

UserList.propTypes = {
    users: PropTypes.arrayOf(PropTypes.object),
    myUserId: PropTypes.string.isRequired,
    showMini: PropTypes.bool
};

export default UserList;