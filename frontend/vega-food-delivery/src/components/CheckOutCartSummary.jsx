import React from 'react'

const CheckOutCartSummary = ({ cartItems, subtotal, shippingCost, total }) => {
    return (
        <div className="card border-secondary mb-4 shadow-sm">
            <div className="card-header bg-secondary text-white">
                <h4 className="m-0">Order Total</h4>
            </div>
            <div className="card-body">
                <h5 className="font-weight-medium mb-3">Products</h5>
                {cartItems.map((item, index) => (
                    <div className="d-flex justify-content-between" key={index}>
                        <p>{item.food?.name || item.name}</p>
                        <p>${(item.food?.price * item.quantity).toFixed(2)}</p>
                    </div>
                ))}
                <hr />
                <div className="d-flex justify-content-between">
                    <h6>Subtotal</h6>
                    <h6>${subtotal}</h6>
                </div>
                <div className="d-flex justify-content-between">
                    <h6>Delievery Fee</h6>
                    <h6>${shippingCost}</h6>
                </div>
            </div>
            <div className="card-footer bg-light">
                <div className="d-flex justify-content-between">
                    <h5>Total</h5>
                    <h5>${total}</h5>
                </div>
            </div>
        </div>
    );
};

export default CheckOutCartSummary