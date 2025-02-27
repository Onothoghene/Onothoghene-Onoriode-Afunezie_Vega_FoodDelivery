import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../services/AuthService";
import { useAuth } from "../hooks/useAuth";
import toast from "react-hot-toast";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login, isLoading } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const isSuccess = await login(email, password);
            if (isSuccess) {
                toast.success("Authentication successful!");
                navigate("/home"); // Navigate to Home after successful login
            } else {
                toast.error("Invalid credentials. Please try again.");
            }
        } catch (err) {
            const errorMessage =
                err.response?.data?.message || "Login failed. Please try again.";
            setError(errorMessage);
            toast.error(errorMessage);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="card shadow p-4" style={{ width: "400px" }}>
                <h2 className="h3 text-center text-gray-900 mb-4">Sign In To Your Account</h2>
                <p className="text-center text-muted small">
                    New User
                    <Link to="/registration" className="mr-1 fw-bold text-primary">
                        Create Account
                    </Link>
                </p>
                {/* {error && <p className="text-danger text-center">{error}</p>} */}
                <form onSubmit={handleSubmit}>
                    {/* Email Field */}
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

                    {/* Password Field */}
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <div className="position-relative">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Enter Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    {/* Sign In Button */}
                    <button type="submit" className="btn btn-primary w-100">
                        {isLoading ? "Processing..." : "Sign in"}
                    </button>

                </form>

                <div class="text-center mt-4">
                    <Link className="small" to="/forgot-password">Forgot Password?</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
