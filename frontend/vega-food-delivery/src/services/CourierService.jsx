import api from "../api/axiosInstance";

class CourierService {
    static async getCourierById(courierId) {
        return await api.get(`/api/v1/Courier/${courierId}`);
    }

    static async getAllCouriers() {
        return await api.get(`/api/v1/Courier`);
    }

    static async saveCourier(Courier) {
        return await api.put("/api/v1/Courier", Courier);
    }

    static async deleteCourier(id) {
        return await api.delete(`/api/v1/Courier/${id}`);
      }
}

export default CourierService
    ;
