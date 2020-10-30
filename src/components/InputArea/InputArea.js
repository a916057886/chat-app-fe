import React from 'react';
import PropTypes from 'prop-types';

import css from './InputArea.module.css';
import Input from './Input/Input.js';

const InputArea = (props) => {
    return (
        <div className={css.InputArea}>
            <Input userId={props.userId} value={props.value} keystrokeHandler={props.keystrokeHandler} messageSentHandler={props.messageSentHandler} />
        </div>
    );
};

InputArea.propTypes = {
    userId: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    keystrokeHandler: PropTypes.func.isRequired,
    messageSentHandler: PropTypes.func.isRequired
};

export default InputArea;