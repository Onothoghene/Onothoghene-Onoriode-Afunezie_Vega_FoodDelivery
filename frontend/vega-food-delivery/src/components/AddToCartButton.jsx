import React, { useContext } from 'react'
import { FaShoppingCart } from 'react-icons/fa'
import CartContext from '../context/CartContext';

const AddToCartButton = ({ foodItem }) => {
    const { addToCart, isLoading } = useContext(CartContext);

    const handleAddToCart = () => {
        addToCart(foodItem);
    };

    return (
        <>
            <button
                className="btn btn-warning rounded-pill btn-sm text-white"
                onClick={handleAddToCart}
                disabled={isLoading}
            >
                <FaShoppingCart className="mb-1" />
                {isLoading ? "Adding..." : "Add to Cart"}
            </button>
        </>
    )
}

export default AddToCartButton