import React from "react";

const DefaultAddress = ({ defaultAddress }) => {
    if (!defaultAddress) return <p>Loading...</p>;

    return (
        <div className="card">
            <h5 className="card-header">Default Address</h5>
            <div className="card-body">
            <h6 className="mb-1">{defaultAddress.street}</h6>
                    <p className="mb-1">
                      {defaultAddress.city}, {defaultAddress.state}, {defaultAddress.zipCode}
                    </p>
                    <p className="text-muted small">{defaultAddress.country}</p>
                    <p className="text-muted small">{defaultAddress.phoneNumber} {defaultAddress.additionalPhoneNumber && `/ ${defaultAddress.additionalPhoneNumber}`}</p>
            </div>
        </div>
    );
};

export default DefaultAddress;
