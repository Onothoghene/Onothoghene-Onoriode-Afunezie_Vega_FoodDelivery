import React, { useContext, useEffect, useState } from 'react';
import ProfileLayout from './ProfileLayout';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../hooks/useAuth';

const ChangePassword = () => {
    const { changePassword, authUser } = useAuth();
    const [passwords, setPasswords] = useState({
        email: "",
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
    });
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (authUser?.email) {
            setPasswords((prev) => ({ ...prev, email: authUser.email }));
        }
    }, [authUser]);

    const handleChange = (e) => {
        setPasswords({ ...passwords, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (passwords.newPassword.length < 6) {
            toast.error("New password must be at least 6 characters long.");
            return;
        }

        if (passwords.newPassword !== passwords.confirmNewPassword) {
            toast.error("Passwords do not match!");
            return;
        }

        setIsLoading(true);
        try {
            const response = await changePassword(
                passwords.email,
                passwords.currentPassword,
                passwords.newPassword,
                passwords.confirmNewPassword
            );

            if (response.success) {
                setPasswords({
                    email: authUser?.email || "",
                    currentPassword: "",
                    newPassword: "",
                    confirmNewPassword: "",
                });
            } else {
                toast.error(response.message); // Display API error message
            }
        } catch (error) {
            console.error("Password change failed:", error.message);
            toast.error(error.message); // Display caught error
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <ProfileLayout>
            <div className="container mt-3">
                <h4 className="fw-bold mb-3">Change Password</h4>
                <div className="card p-3">
                    <form onSubmit={handleSubmit}>
                        <input
                            type="email"
                            className="form-control mb-2"
                            name="email"
                            value={passwords.email}
                            disabled
                        />
                        <input
                            // type="password"
                            type="text"
                            className="form-control mb-2"
                            name="currentPassword"
                            placeholder="Current Password"
                            value={passwords.currentPassword}
                            onChange={handleChange}
                            required
                        />
                        <input
                            // type="password"
                            type="text"
                            className="form-control mb-2"
                            name="newPassword"
                            placeholder="New Password"
                            value={passwords.newPassword}
                            onChange={handleChange}
                            required
                        />
                        <input
                            // type="password"
                            type="text"
                            className="form-control mb-2"
                            name="confirmNewPassword"
                            placeholder="Confirm New Password"
                            value={passwords.confirmNewPassword}
                            onChange={handleChange}
                            required
                        />
                        <button type="submit" className="btn btn-success me-2" disabled={isLoading}>
                            {isLoading ? "Updating..." : "Update"}
                        </button>
                        <Link to="/profile-overview" className="btn btn-secondary">Cancel</Link>
                    </form>
                </div>
            </div>
        </ProfileLayout>
    );
};

export default ChangePassword;
