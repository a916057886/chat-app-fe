import _ from 'lodash';

import * as actionTypes from '../actions/actionTypes.js';

const initialState = {
    connected: false,
    userId: "a",
    username: "coolguy",
    nameColor: "#ff0000",
    isNewUser: false,
    users: null
};

const reducer = (state = initialState, action) => {
    const currentState = _.cloneDeep(state);
    switch (action.type) {
        case (actionTypes.AUTHENTICATED):
            localStorage.setItem("userId", action.userId);

            return {
                ...currentState,
                connected: true,
                userId: action.userId,
                username: action.username,
                nameColor: action.nameColor,
                isNewUser: action.isNewUser
            };
        case (actionTypes.RETRIEVE_USERS):
            return {
                ...currentState,
                users: action.users
            };
        case (actionTypes.USER_CONNECTED):
            const newUsersC = _.cloneDeep(currentState.users);

            let i = 0;
            let found = false;
            for (i = 0; i < currentState.users.length; i++) {
                if (currentState.users[i].userId === action.user.userId) {
                    newUsersC[i].online = true;
                    found = true;
                    break;
                }
            }
            if (!found) newUsersC.push(action.user);

            return {
                ...currentState,
                users: newUsersC
            }
        case (actionTypes.USER_DISCONNECTED):
            const newUsersD = _.cloneDeep(currentState.users);
            let j = 0;
            for (j = 0; j < currentState.users.length; j++) {
                if (currentState.users[j].userId === action.userId) {
                    newUsersD[j].online = false;
                    break;
                }
            }
            
            return {
                ...currentState,
                users: newUsersD
            }
        case (actionTypes.CHANGE_USERNAME):
            return {
                ...currentState,
                username: action.username
            }
        case (actionTypes.CHANGE_NAME_COLOR):
            return {
                ...currentState,
                nameColor: action.nameColor
            }
        default: return state;
    }
};

export default reducer;