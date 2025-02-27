import api from "../api/axiosInstance";

class OrderService{
    static async getOrderById(id) {
        return await api.get(`/api/v1/Order/${id}`);
    }

    // static async getAllUserOrders(userId) {
    //     return await api.get(`/api/v1/Order/user/${userId}`);
    // }

    static async getAllUserOrders(userId = null) {
        const url = userId ? `/api/v1/Order/user/${userId}` : `/api/v1/Order/user`;
        return await api.get(url);
    }

    static async getAllOrders() {
        return await api.get(`/api/v1/Order`);
    }

    static async getRestaurantOrders(restaurantId) {
        return await api.get(`/api/v1/Order/restaurant/${restaurantId}`);
    }

    static async saveOrder(order) {
        return await api.put("/api/v1/Order", order);
    }

    static async deleteOrder(id) {
        return await api.delete(`/api/v1/Order/${id}`);
      }

      static async cancelOrder(order) {
        return await api.put("/api/v1/Order/cancel", order);
    }

    static async orderSummary(orderId) {
        return await api.get(`/api/v1/Order/summary/${orderId}`);
    }
}

export default OrderService;