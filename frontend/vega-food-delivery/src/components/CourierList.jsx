import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const CourierList = ({ couriers, onEdit, onDelete }) => {
    return (
        <div className="container mt-4">
            <h4 className="mb-3">Couriers</h4>
            <div className="row">
                {couriers.length > 0 ? (
                    couriers.map((courier) => (
                        <div key={courier.id} className="col-md-4 mb-3">
                            <div className="card shadow-sm">
                                <div className="card-body">
                                    <h5 className="card-title">{courier.name}</h5>
                                    <p className="card-text"><strong>Assigned Restaurant:</strong> {courier.restaurantName || "N/A"}</p>
                                    <div className="d-flex justify-content-between">
                                        <button className="btn btn-sm btn-primary" onClick={() => onEdit(courier)}>
                                            <FaEdit /> Edit
                                        </button>
                                        <button className="btn btn-sm btn-danger" onClick={() => onDelete(courier.id)}>
                                            <FaTrash /> Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center h3">No couriers available.</p>
                )}
            </div>
        </div>
    );
};

export default CourierList;
