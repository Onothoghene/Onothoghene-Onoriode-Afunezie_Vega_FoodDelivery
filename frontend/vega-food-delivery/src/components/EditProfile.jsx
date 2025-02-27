import React, { useState } from 'react';



const EditProfile = ({ user, onUpdate, onCancel }) => {
    const [formData, setFormData] = useState({
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
        email: user?.email || "",
        phoneNumber: user?.phoneNumber || "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate(formData);
    };

    return (
        <div className="card">
            <h5 className="card-header">Update Profile</h5>
            <div className="card-body">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">First Name</label>
                        <input type="text" className="form-control" name="firstName" value={formData.firstName} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Last Name</label>
                        <input type="text" className="form-control" name="lastName" value={formData.lastName} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input type="email" className="form-control" name="email" disabled
                        value={formData.email} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Phone Number</label>
                        <input type="text" className="form-control" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
                    </div>
                    <button type="submit" className="btn btn-success me-2">Save</button>
                    <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
                </form>
            </div>
        </div>
    );
};

export default EditProfile;