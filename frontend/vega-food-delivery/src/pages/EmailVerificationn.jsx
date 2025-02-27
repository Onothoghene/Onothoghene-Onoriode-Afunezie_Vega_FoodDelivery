import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import toast from 'react-hot-toast';

const EmailVerificationn = () => {
    const [otp, setOtp] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { OTPVerification } = useAuth();
    const navigate = useNavigate();

    const handleVerify = async (e) => {
        e.preventDefault();
        if (!otp) {
            toast.error("Please enter the OTP code.");
            return;
        }

        setIsLoading(true);
        try {
            await OTPVerification(otp);
            toast.success("Email verified successfully!");
            navigate("/login"); // Redirect to login after success
        } catch (error) {
            toast.error(error.response?.data?.Message || "OTP verification failed.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
                <div className="card shadow p-4" style={{ width: "400px" }}>
                    <h2 className="h3 text-center text-gray-900">Email Verification</h2>
                    <p className='text-center small text-gray'>
                        Please Input the <b>OTP</b> code you received in your email</p>

                    <form onSubmit={handleVerify}>
                        <div className="mt-3 mb-3">
                            <input
                                type="text"
                                className="form-control text-center"
                                placeholder="Enter OTP code..."
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100" disabled={isLoading}>
                            {isLoading ? "Verifying..." : "Verify Code"}
                        </button>
                    </form>

                    <p className="text-center text-muted small mt-3">
                        Have an account?
                        <Link to="/login" className="fw-bold text-primary"> Login here</Link>
                    </p>

                </div>
            </div>

        </>
    )
}

export default EmailVerificationn