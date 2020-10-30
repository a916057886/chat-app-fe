import React from 'react';
import PropTypes from 'prop-types';

import './Spinner.css';

const Spinner = (props) => {
    return (
        !props.hidden
        ?
        <div style={{textAlign: "center"}}>
            <div className="sk-folding-cube">
                <div className="sk-cube1 sk-cube"></div>
                <div className="sk-cube2 sk-cube"></div>
                <div className="sk-cube4 sk-cube"></div>
                <div className="sk-cube3 sk-cube"></div>
            </div>
        </div>
        : null
    );
};

Spinner.propTypes = {
    hidden: PropTypes.bool
}

export default Spinner;