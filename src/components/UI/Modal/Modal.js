import React from 'react';
import PropTypes from 'prop-types';

import css from './Modal.module.css';

const Modal = (props) => {
    const modalCss = [css.Modal];
    if (props.error)    modalCss.push(css.Error);

    const modal = props.show
    ? (
        <div className={modalCss.join(" ")}>
            {props.children}
        </div>
    )
    : null;

    return modal;
};

Modal.propTypes = {
    show: PropTypes.bool,
    error: PropTypes.bool
};

export default Modal;