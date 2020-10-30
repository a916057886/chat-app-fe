import * as actionTypes from './actionTypes.js';

export const typeMessage = (message) => {
    return {
        message: message,
        type: actionTypes.TYPE_MESSAGE
    };
};

export const clearMessage = () => {
    return {
        type: actionTypes.CLEAR_MESSAGE
    };
};

export const retrieveMessages = (messages) => {
    return {
        messages: messages,
        type: actionTypes.RETRIEVE_MESSAGES
    };
};

export const retrieveNewMessage = (message) => {
    return {
        newMessage: message,
        type: actionTypes.RETRIEVE_NEW_MESSAGE
    };
};