import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import toast from "react-hot-toast";

const CartSummary = ({ subtotal, shippingCost, total }) => {
  const { authUser } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!authUser) {
      toast.error("Please log in to proceed to checkout.");
      navigate("/login", { state: { from: "/check-out" } }); 
      return;
    }
    navigate("/check-out");
  };

  return (
    <div className="border p-3">
      <h5>Total</h5>
      <p>Subtotal: <span className="float-end">${subtotal}</span></p>
      <p>Shipping: <span className="float-end">${(subtotal > 0 ? shippingCost : 0).toFixed(1)}</span></p>
      <hr />
      <p><strong>Total: <span className="float-end">${total}</span></strong></p>
      <button className="btn btn-success w-100" onClick={handleCheckout}>
        Check Out
      </button>
    </div>
  );
};

export default CartSummary;
