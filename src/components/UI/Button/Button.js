import React from 'react';
import PropTypes from 'prop-types';

import css from './Button.module.css';

const Button = (props) => {
    return (
        <button className={css.Button} onClick={props.showUsersHandler}>
            {props.children}
        </button>
    );
};

Button.propTypes = {
    showUsersHandler: PropTypes.func.isRequired
};

export default Button;