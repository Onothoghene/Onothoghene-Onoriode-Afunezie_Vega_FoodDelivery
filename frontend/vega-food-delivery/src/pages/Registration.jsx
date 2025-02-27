import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import toast from 'react-hot-toast';

const Registration = () => {
    const navigate = useNavigate();
    const { register, isLoading } = useAuth();

    // State for errors
    const [errors, setErrors] = useState({});

    // State for form inputs
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        roleId: 2, // Default role ID (e.g., customer)
    });

    // Handle input change
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setErrors({
            ...errors,
            [e.target.name]: ''
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation
        const newErrors = {};
        if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
        if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
        if (!formData.email.trim()) newErrors.email = "Email is required";
        if (!formData.password) newErrors.password = "Password is required";
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            const response = await register(
                formData.firstName,
                formData.lastName,
                formData.email,
                formData.password,
                formData.confirmPassword,
                formData.roleId
            );

            if (response) {
                toast.success("Registration successful! Verify your email.");
                navigate("/email-verification"); // Redirect to verification page
            }
        } catch (error) {
            toast.error(error.response?.data?.Message || "Registration failed.");
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light" style={{ paddingTop: "60px", paddingBottom: "70px" }}>
            <div className="card shadow p-4" style={{ width: "400px" }}>
                <h2 className="h3 text-center text-gray-900 mb-4">Hello, welcome to get started</h2>
                <p className="text-center text-muted small">
                    Have an account?
                    <Link to="/login" className="fw-bold text-primary"> Login here</Link>
                </p>

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">First Name</label>
                        <input type="text" name="firstName" className="form-control" placeholder="Enter your first name" value={formData.firstName} onChange={handleChange} />
                        {errors.firstName && <small className="text-danger">{errors.firstName}</small>}
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Last Name</label>
                        <input type="text" name="lastName" className="form-control" placeholder="Enter your last name" value={formData.lastName} onChange={handleChange} />
                        {errors.lastName && <small className="text-danger">{errors.lastName}</small>}
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Email Address</label>
                        <input type="email" name="email" className="form-control" placeholder="Enter your email address" value={formData.email} onChange={handleChange} />
                        {errors.email && <small className="text-danger">{errors.email}</small>}
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input type="password" name="password" className="form-control" placeholder="Enter password" value={formData.password} onChange={handleChange} />
                        {errors.password && <small className="text-danger">{errors.password}</small>}
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Confirm Password</label>
                        <input type="password" name="confirmPassword" className="form-control" placeholder="Confirm password" value={formData.confirmPassword} onChange={handleChange} />
                        {errors.confirmPassword && <small className="text-danger">{errors.confirmPassword}</small>}
                    </div>

                    <button type="submit" className="btn btn-primary w-100" disabled={isLoading}>
                        {isLoading ? "Processing..." : "Create an Account"}
                    </button>
                </form>


            </div>
        </div>
    );
};

export default Registration;
