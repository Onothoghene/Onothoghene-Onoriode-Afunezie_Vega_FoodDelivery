import React from "react";

const CartQuantityChange = ({ item, onQuantityChange }) => {
    return (
        <input
            type="number"
            className="form-control"
            value={item.quantity}
            min="1"
            onChange={(e) => {
                const value = e.target.value.trim();
                if (value === "") return; // Prevents update on empty input

                const newQuantity = Number(value);
                if (newQuantity >= 1 && Number.isInteger(newQuantity) && onQuantityChange) {
                    const token = sessionStorage.getItem("authToken");
                    const foodId = token ? item.foodId : item.id; // Use correct ID based on login status
                    onQuantityChange(foodId, newQuantity);
                }
            }}
        />
    );
};

export default CartQuantityChange;
