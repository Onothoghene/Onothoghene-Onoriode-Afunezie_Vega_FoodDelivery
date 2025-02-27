import api from "../api/axiosInstance";

class PersonalDetailsService {

    static async GetByUserIdLite(id = null) {
        const url = id ? `/api/v1/PersonalDetails/user/lite/${id}` : `/api/v1/PersonalDetails/user/lite`;
        var res = await api.get(url);
        console.log("res", res);
        return res;
    }

    static async GetByUserId(id = null) {
        const url = id ? `/api/v1/PersonalDetails/user/${id}` : `/api/v1/PersonalDetails/user`;
        var res = await api.get(url);
        console.log("res", res);
        return res;

    }

    static async updatePersonalDetails(user) {
        return await api.put("/api/v1/PersonalDetails", user);
    }

}

export default PersonalDetailsService;