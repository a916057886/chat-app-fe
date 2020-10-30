import _ from 'lodash';

import * as actionTypes from '../actions/actionTypes.js';

const initialState = {
    inputMessage: "",
    messages: null
};

const reducer = (state = initialState, action) => {
    const currentState = _.cloneDeep(state);
    switch (action.type) {
        case (actionTypes.TYPE_MESSAGE):
            return {
                ...currentState,
                inputMessage: action.message
            };
        case (actionTypes.CLEAR_MESSAGE):
            return {
                ...currentState,
                inputMessage: ""
            };
        case (actionTypes.RETRIEVE_MESSAGES):
            return {
                ...currentState,
                messages: action.messages
            };
        case (actionTypes.RETRIEVE_NEW_MESSAGE):
            let currentMessages = _.cloneDeep(state.messages);
            if (currentMessages == null)    currentMessages = [];
            currentMessages.push(action.newMessage);

            return {
                ...currentState,
                messages: currentMessages
            };
        default: return state;
    }
};

export default reducer;