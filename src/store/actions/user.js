import * as actionTypes from './actionTypes.js';

export const authenticate = (userId, username, nameColor, isNewUser) => {
    return {
        userId: userId,
        username: username,
        nameColor: nameColor,
        isNewUser: isNewUser,
        type: actionTypes.AUTHENTICATED
    };
}

export const retrieveUsers = (users) => {
    return {
        users: users,
        type: actionTypes.RETRIEVE_USERS
    };
};

export const userConnected = (user) => {
    user["userId"] = user.user_id;
    delete user["user_id"]; 
    return {
        user: user,
        type: actionTypes.USER_CONNECTED
    };
};

export const userDisconnected = (userId) => {
    return {
        userId: userId,
        type: actionTypes.USER_DISCONNECTED
    };
};

export const updateMyUsername = (username) => {
    return {
        username: username,
        type: actionTypes.CHANGE_USERNAME
    };
};


export const updateMyNameColor = (nameColor) => {
    return {
        nameColor: nameColor,
        type: actionTypes.CHANGE_NAME_COLOR
    };
};