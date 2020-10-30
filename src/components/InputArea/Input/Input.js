import React from 'react';
import PropTypes from 'prop-types';

import css from './Input.module.css';

const Input = (props) => {
    const inputBoxCss = [css.InputBox];
    if (props.value && props.value.length > 0)  inputBoxCss.push(css.Active);

    return (
        <div className={inputBoxCss.join(" ")} onKeyPress={(event) => props.messageSentHandler(event, props.value, props.userId)}>
            <input className={css.Input} type="text" placeholder="Type your message" required value={props.value} onChange={props.keystrokeHandler}/>
            <button className={css.SendButton}>
                <i className="fas fa-paper-plane"></i>
            </button>
        </div>
    );
};

Input.propTypes = {
    userId: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    keystrokeHandler: PropTypes.func.isRequired,
    messageSentHandler: PropTypes.func.isRequired
};

export default Input;