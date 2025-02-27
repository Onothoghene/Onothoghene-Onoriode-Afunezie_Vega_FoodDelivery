import toast from 'react-hot-toast';
import api from '../api/axiosInstance';

class MenuService {
    // Works with or without authentication
    static async getAllMenuItems(page = 1, limit = 9) {
        try {
            const response = await api.get('/api/v1/MenuItem?page=${page}&limit=${limit}');
            return response.data.data;
        } catch (error) {
            toast.error("Failed to fetch menu items.");
            throw error;
        }
    }

    static async getMenuItemById(menuId) {
        try {
            const response = await api.get(`/api/v1/MenuItem/${menuId}`);
            return response.data;
        } catch (error) {
            toast.error("Failed to fetch menu item.");
            throw error;
        }
    }

    static async saveMenuItem(menuData) {
        try {
            const isUpdate = !!menuData.id; // If `id` exists, it's an update
    
            const formattedData = {
                id: menuData.id || 0, // Use 0 for new items 
                name: menuData.name,
                price: menuData.price,
                categoryId: menuData.categoryId,
                description: menuData.description,
                imageURL: menuData.imageURL || null,
                fileName: menuData.fileBinary ? menuData.fileName : null,
                fileFormat: menuData.fileBinary ? menuData.fileFormat : null,
                fileBinary: menuData.fileBinary || null
            };
    
            // const response = isUpdate
            //     ? await api.put(`/api/v1/MenuItem/${menuData.id}`, formattedData)
            //     : await api.post('/api/v1/MenuItem', formattedData);

            const isSuccess = await api.put('/api/v1/MenuItem', formattedData);
    
            toast.success(`Menu item ${isUpdate ? 'updated' : 'created'} successfully!`);
            return isSuccess;
        } catch (error) {
            toast.error(`Failed to ${menuData.id ? 'update' : 'create'} menu item.`);
            throw error;
        }
    }
    

    static async deleteMenuItem(menuId) {
        try {
            await api.delete(`/api/v1/MenuItem/${menuId}`);
            toast.success("Menu item deleted successfully!");
        } catch (error) {
            toast.error("Failed to delete menu item.");
            throw error;
        }
    }
}

export default MenuService;
