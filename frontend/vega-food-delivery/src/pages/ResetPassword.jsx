import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import toast from 'react-hot-toast';

const ResetPassword = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { resetPassword } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    // Extract `email` & `token` from the URL query params
    const queryParams = new URLSearchParams(location.search);
    const email = queryParams.get("email");
    console.log("email", email)
    const token = queryParams.get("code");
    console.log("code", token)

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!password || !confirmPassword) {
            toast.error("Please fill in all fields.");
            return;
        }

        if (password !== confirmPassword) {
            toast.error("Passwords do not match.");
            return;
        }

        setIsLoading(true);
        try {
            await resetPassword(email, token, password, confirmPassword);
            toast.success("Password reset successful! Please log in.");

            navigate("/login");

        } catch (error) {
            toast.error(error.response?.data?.Message || "Password reset failed.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="card shadow p-4" style={{ width: "400px" }}>
                <h2 className="h3 text-center text-gray-900">Reset Password</h2>
                <p className='text-center small h6 text-gray'>
                    Kindly set a new password.
                </p>

                <form onSubmit={handleSubmit} className="mt-2">
                    <div className="mb-3">
                        <label className="form-label">New Password</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Enter new password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Confirm Password</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Confirm new password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100" disabled={isLoading}>
                        {isLoading ? "Resetting..." : "Reset Password"}
                    </button>
                </form>

                <p className="text-center text-muted small mt-3">
                    Have an account?
                    <Link to="/login" className="fw-bold text-primary"> Login here</Link>
                </p>

            </div>
        </div>
    );
}

export default ResetPassword