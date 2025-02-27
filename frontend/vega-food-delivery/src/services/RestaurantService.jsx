import api from "../api/axiosInstance";

class RestaurantService {
    static async getRestaurantById(restaurantId) {
        return await api.get(`/api/v1/Restaurant/${restaurantId}`);
    }

    static async getAllRestaurants() {
        var res = await api.get(`/api/v1/Restaurant`);
        console.log("Restaurant service", res);
        return  res;
    }

    static async saveRestaurant(restaurant) {
        return await api.put("/api/v1/Restaurant", restaurant);
    }

    static async deleteRestaurant(id) {
        return await api.delete(`/api/v1/Restaurant/${id}`);
      }
}

export default RestaurantService
    ;
