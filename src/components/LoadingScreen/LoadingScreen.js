import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import css from './LoadingScreen.module.css';
import Spinner from '../UI/Spinner/Spinner.js';

const LoadingScreen = (props) => {
    const content = !props.connectionFailedReason
    ? (
        <Fragment>
            <Spinner />
            <div className={css.Message}>
                {props.isTooLong
                ? "Internet isn't looking great, please give it more time..."
                : "We are connecting you to WhatsChat..."}
            </div>
        </Fragment>
    )
    : (
        <Fragment>
            <div className={css.Error}>
                <i className="fas fa-exclamation-circle"></i>
            </div>
            <div className={css.Message} style={{color: "red"}}>
                {props.connectionFailedReason}
                <br />
                Please try again later
            </div>
        </Fragment>
    );

    return (
        <div className={css.LoadingScreen}>
            {content}
        </div>
    );
};

LoadingScreen.propTypes = {
    isTooLong: PropTypes.bool,
    connectionFailedReason: PropTypes.string
}

export default LoadingScreen;