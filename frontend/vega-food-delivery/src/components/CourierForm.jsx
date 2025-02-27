import React, { useState, useEffect } from "react";
import CourierService from "../services/CourierService";
import toast from "react-hot-toast";

const CourierForm = ({ onCourierAdded, restaurantList, selectedCourier }) => {
    const [courier, setCourier] = useState({
        name: "",
        restaurantId: ""
    });

    const [restaurants, setRestaurants] = useState([]);

    useEffect(() => {
        if (restaurantList) {
            try {
                const filteredRestaurants = restaurantList.filter(
                    (restaurant) => !restaurant.HasCourier
                ); // Only keep restaurants that don't have a courier
                setRestaurants(filteredRestaurants);
            } catch (error) {
                toast.error("Error filtering restaurants.");
                console.error("Error:", error);
            }
        }
    }, [restaurantList]);

    useEffect(() => {
        if (selectedCourier) {
            setCourier(selectedCourier); // Load courier for editing
        } else {
            setCourier({ name: "", restaurantId: "" });
        }
    }, [selectedCourier]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCourier((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await CourierService.saveCourier(courier);
            toast.success(`Courier ${courier.id ? "updated" : "saved"} successfully!`);
            setCourier({ id: "", name: "", restaurantId: "" });

            if (courier.id) {
                window.location.reload(); // Reload the page after editing
            } else {
                onCourierAdded(); // Refresh list if it's a new courier
            }
        } catch (error) {
            toast.error("Error saving courier.");
            console.error("Error:", error);
        }
    };

    return (
        <div className="col-md-6">
            <h4>{courier.id ? "Edit" : "Add"} Courier</h4>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input type="text" className="form-control" name="name" value={courier.name} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Assign to Restaurant</label>
                    <select className="form-select" name="restaurantId" value={courier.restaurantId} onChange={handleChange} required>
                        <option value="">Select Restaurant</option>
                        {restaurants.map((r) => (
                            <option key={r.id} value={r.id}>{r.name}</option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">{courier.id ? "Update" : "Save"} Courier</button>
            </form>
        </div>
    );
};

export default CourierForm;
