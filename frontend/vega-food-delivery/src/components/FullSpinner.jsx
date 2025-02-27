import React from 'react'

const FullSpinner = () => {
    return (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-white" style={{ zIndex: 1050 }}>
            <div className="spinner-border text-primary" role="status" style={{ width: "4rem", height: "4rem" }}>
                <span className="visually-hidden">Logging out...</span>
            </div>
            <p className="mt-3 text-primary">Logging you out...</p>
        </div>
    )
}

export default FullSpinner