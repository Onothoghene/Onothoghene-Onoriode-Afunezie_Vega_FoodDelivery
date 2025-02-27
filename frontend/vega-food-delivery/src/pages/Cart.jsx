import React, { useContext, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import HeroSection from "../components/HeroSection";
import CartContext from "../context/CartContext";
import CartItem from "../components/CartItem";
import CartSummary from "../components/CartSummary";
import EmptyState from "../components/EmptyState";
import { FaShoppingCart } from "react-icons/fa";
import Spinner from "../components/Spinner";

const Cart = () => {
 const { cartItems, updateCart, removeFromCart, isLoading } = useContext(CartContext);

 useEffect(() => {
  console.log("Current Cart Items:", cartItems);
}, [cartItems]);

  const shippingCost = 2.0;

  // Remove item
  const handleRemove = async (id) => {
    await removeFromCart(id);
  };

  // Calculate total
  const subtotal = cartItems.reduce((acc, item) => {
    if (item.food) {
      return acc + item.food.price * item.quantity;
    }
    return acc;
  }, 0).toFixed(1);
 // const subtotal = cartItems.reduce((acc, item) => acc + item.food.price * item.quantity, 0).toFixed(1);
  // const total = Number(subtotal + (subtotal > 0 ? shippingCost : 0)).toFixed(1);
  const total = (Number(subtotal) + (subtotal > 0 ? Number(shippingCost) : 0)).toFixed(1);



  return (
    <>
      <HeroSection title="Shopping Cart" />
      <div className="container my-5">
        {isLoading ? (
          <Spinner />
        ) : cartItems.length === 0 ? (
          <EmptyState
            icon={<FaShoppingCart size={80} color="orange" />}
            title="Your cart is empty!"
            message="Hungry? Browse our menu and treat yourself to something delicious!"
            buttonText="Start browsing"
            linkRoute="/menu"
           //onButtonClick={handleShopNow}
          />
        ) : (
          <div className="row">
            <div className="col-md-8">
              <table className="table table-bordered">
                <thead className="table-light">
                  <tr>
                    <th>Product</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <CartItem key={item.id}
                      item={item}
                      onQuantityChange={updateCart}
                      onRemove={handleRemove} />
                  ))}
                </tbody>
              </table>
            </div>

            {/* Cart Summary & Coupon */}
            <div className="col-md-4">
              <CartSummary
                subtotal={subtotal}
                shippingCost={shippingCost}
                total={total} />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
