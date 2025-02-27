import React, { useEffect, useState } from "react";
import RestaurantService from "../services/RestaurantService";
import toast from "react-hot-toast";

const RestaurantForm = ({ onRestaurantAdded, selectedRestaurant }) => {

    const initialFormState = {
        id: 0,
        name: "",
        location: "",
        // isAvailable: true
    };

    const [restaurant, setRestaurant] = useState(initialFormState);


    useEffect(() => {
        if (selectedRestaurant) {
            setRestaurant(selectedRestaurant);
        } else {
            setRestaurant({ id: 0, name: "", location: "" });
        }
    }, [selectedRestaurant]);


    const handleChange = (e) => {
        // const { name, value, type, checked } = e.target;
        const { name, value } = e.target;
        setRestaurant((prev) => ({
            ...prev,
            [name]: value,
            // [name]: type === "checkbox" ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await RestaurantService.saveRestaurant(restaurant);
            toast.success(`Restaurant ${restaurant.id ? "updated" : "saved"} successfully!`);
            setRestaurant(initialFormState);
            if (restaurant.id) {
                window.location.reload(); // Reload the page after editing
            } else {
                onRestaurantAdded(); // Refresh list if it's a new restaurant
            }
        } catch (error) {
            toast.error("Error saving restaurant.");
            console.error("Error:", error);
        }
    };

    return (
        <div className="col-md-6">
            <h4>{restaurant.id ? "Edit" : "Add"} Restaurant</h4>
            {console.log("Fetching dets: ", restaurant)}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input type="text" className="form-control" name="name" value={restaurant.name} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Location</label>
                    <input type="text" className="form-control" name="location" value={restaurant.location} onChange={handleChange} required />
                </div>
                {/* <div className="form-check mb-3">
                    <input type="checkbox" className="form-check-input" id="isAvailable" name="isAvailable" checked={restaurant.isAvailable} onChange={handleChange} />
                    <label className="form-check-label" htmlFor="isAvailable">Is Available?</label>
                </div> */}
                <button type="submit" className="btn btn-primary">{restaurant.id ? "Update" : "Save"} Restaurant</button>
            </form>
        </div>
    );
};

export default RestaurantForm;
