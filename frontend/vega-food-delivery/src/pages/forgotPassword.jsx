import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from "../hooks/useAuth";
import toast from 'react-hot-toast';

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { forgotPassword } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email) {
            toast.error("Please enter your email address.");
            return;
        }

        setIsLoading(true);
        try {
            await forgotPassword(email);
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
                <h2 className="h3 text-center text-gray-900">Forgot Password</h2>
                <p className='text-center small h6 text-gray'>Enter your email to reset password</p>

                <form onSubmit={handleSubmit} className="mt-4">
                    <div className="mb-3">
                        <label className="form-label">Email Address</label>
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Enter your email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100" disabled={isLoading}>
                        {isLoading ? "Processing..." : "Continue"}
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

export default ForgotPassword