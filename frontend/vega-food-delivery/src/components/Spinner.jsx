import React from 'react';

const Spinner = ({ fullScreen = false}) => {
    return (
        <div
            className={`d-flex align-items-center justify-content-center ${fullScreen ? 'position-fixed top-50 start-50 translate-middle w-100 vh-100 bg-white' : ''}`}>
            <div className="spinner-border text-primary" style={{ width: '3rem', height: '3rem' }} role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );
};

export default Spinner;
