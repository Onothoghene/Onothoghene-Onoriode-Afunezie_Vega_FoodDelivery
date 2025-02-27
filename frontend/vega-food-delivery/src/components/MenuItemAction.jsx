import React from 'react';
import { useAuth } from '../hooks/useAuth';
import MenuService from '../services/MenuService';
import { FaEdit, FaTrash } from 'react-icons/fa';

const MenuItemAction = ({ item, onEdit, onDelete }) => {
    const { authUser } = useAuth();

    if (!authUser?.roles.includes("Admin")) return null;

    const handleDelete = async () => {
        if (window.confirm(`Are you sure you want to delete "${item.name}"?`)) {
            try {
                await MenuService.deleteMenuItem(item.id);
                onDelete(item.id);
                window.location.reload();
            } catch (error) {
                console.error("Delete failed", error);
            }
        }
    };

    return (
        <div className="d-flex justify-content-between mt-3">
            <button className="btn btn-sm btn-primary rounded-pill" onClick={() => onEdit(item)}>
                <FaEdit /> Edit
            </button>
            <button className="btn btn-sm btn-danger rounded-pill" onClick={handleDelete}>
                <FaTrash /> Delete
            </button>
        </div>
        // <div className="d-flex gap-2 mt-5">
        //   <button className="btn btn-sm btn-warning" onClick={() => onEdit(item)}>Edit</button>
        //   <button className="btn btn-sm btn-danger" onClick={handleDelete}>Delete</button>
        // </div>
    );
};

export default MenuItemAction;
