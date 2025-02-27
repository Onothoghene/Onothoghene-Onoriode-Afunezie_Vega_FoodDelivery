import api from "../api/axiosInstance";

class CommentService {
  static async getCommentById(id) {
    return await api.get(`/api/v1/Comment/${id}`);
  }

  static async getCommentsByMenuItem(menuItemId) {
    return await api.get(`/api/v1/Comment/menu-item/${menuItemId}`);
  }

  static async addOrUpdateComment(commentData) {
    return await api.put("/api/v1/Comment", commentData);
  }
}

export default CommentService;
