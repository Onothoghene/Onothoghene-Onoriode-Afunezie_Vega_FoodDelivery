import api from "../api/axiosInstance";

class AuthService {
    static async login(email, password) {
        return await api.post('/api/v1/Account/authenticate', { email, password });
    }

    static async register(firstName, lastName, email, password, confirmPassword, roleId) {
        return await api.post('/api/v1/Account/register', { firstName, lastName, email, password, confirmPassword, roleId });
    }

    static async changePassword(email, currentPassword, newPassword, confirmNewPassword) {
        return await api.post('/api/v1/Account/change-password', { email, currentPassword, newPassword, confirmNewPassword });
    }

    static async resetPassword(email, token, password, confirmPassword) {
        return await api.post('/api/v1/Account/reset-password', { email, token, password, confirmPassword });
    }

    static async forgotPassword(email) {
        return await api.post('/api/v1/Account/forgot-password', { email });
    }

    static async OTPVerification(otp) {
        return await api.post('/api/v1/Account/verify', { otp });
    }
}

export default AuthService;
