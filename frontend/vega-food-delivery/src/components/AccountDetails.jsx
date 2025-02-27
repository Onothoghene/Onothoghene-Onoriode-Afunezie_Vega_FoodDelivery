import React from "react";

const AccountDetails = ({ user, onEdit }) => {
    if (!user) return <p>Loading...</p>;

    return (
        <div className="card">
            <h5 className="card-header">Account Details</h5>
            <div className="card-body">
                <p className="card-text"><strong>Name:</strong> {user.firstName} {user.lastName}</p>
                <p className="card-text"><strong>Email:</strong> {user.email}</p>
                <p className="card-text"><strong>Phone:</strong> {user.phoneNumber}</p>
                <button className="btn btn-primary" onClick={onEdit}>Edit Profile</button>
            </div>
        </div>
    );
};

export default AccountDetails;
