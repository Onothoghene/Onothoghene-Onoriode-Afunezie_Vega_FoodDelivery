import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const RestaurantList = ({ restaurantList, onEdit, onDelete, authUser, authToken }) => {

  return (
    <div className="container mt-4">
      <h4 className="mb-3">Restaurants</h4>
      <div className="row">
        {restaurantList.length > 0 ? (
          restaurantList.map((restaurant) => (
            <div key={restaurant.id} className="col-md-4 mb-3">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{restaurant.name}</h5>
                  <p className="card-text">
                    <strong>Location:</strong> {restaurant.location}
                  </p>
                  {authUser && authToken && authUser?.roles.includes("Admin") && (
                    <div className="d-flex justify-content-between">
                    <button className="btn btn-sm btn-primary" onClick={() => onEdit(restaurant)}>
                      <FaEdit /> Edit
                    </button>
                    <button className="btn btn-sm btn-danger" onClick={() => onDelete(restaurant.id)}>
                      <FaTrash /> Delete
                    </button>
                  </div>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No restaurants available.</p>
        )}
      </div>
    </div>
  );
};

export default RestaurantList;
