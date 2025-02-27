import React, { useState } from 'react';
import { FaCcStripe, FaMoneyBillWave, FaArrowLeft } from 'react-icons/fa';
import StripePaymentForm from './StripePaymentForm';
import OrderService from '../services/OrderService';

const PaymentOption = ({ total, cartItems, selectedRestaurant, onBackClick, onSuccessfulPayment }) => {
    const [selectedMethod, setSelectedMethod] = useState('stripe');
    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentStep, setPaymentStep] = useState('select'); // select, form, processing, success

    // PayPal option removed as requested
    const paymentMethods = [
        { id: 'stripe', label: 'Stripe', icon: <FaCcStripe size={24} className="text-primary" /> },
        { id: 'cod', label: 'Cash on Delivery', icon: <FaMoneyBillWave size={24} className="text-success" /> },
    ];

    const proceedToPaymentForm = () => {
        // If Cash on Delivery is selected, process the order immediately
        if (selectedMethod === 'cod') {
            handlePaymentSuccess({ method: 'cod' });
        } else {
            setPaymentStep('form');
        }
    };

    const handlePaymentSuccess = async (paymentDetails) => {
        try {
            setPaymentStep('processing');
            setIsProcessing(true);
            
            // Prepare order items
            const orderItems = cartItems.map(item => ({
                foodId: item.food.id,
                quantity: item.quantity,
                subtotal: item.food.price * item.quantity
            }));
            
            // Create order payload
            const orderPayload = {
                restaurantId: selectedRestaurant.id,
                totalAmount: parseFloat(total),
                status: 1, // New order
                amountPaid: parseFloat(total),
                paymentOption: selectedMethod === 'stripe' ? 1 : 2, // 1 for Stripe, 2 for COD
                paymentStatus: selectedMethod === 'cod' ? 1 : 2, // 0 for pending, 1 for paid
                orderItems: orderItems
            };
            
            console.log("Submitting order:", orderPayload);
            
            // Send order to backend
            const response = await OrderService.saveOrder(orderPayload);
            console.log("Order created successfully:", response.data);
            
            // Get the order ID from the response
            const orderId = response.data?.data || '';
            
            // For Cash on Delivery, redirect immediately
            if (selectedMethod === 'cod') {
                onSuccessfulPayment(orderId);
                return;
            }
            
            // Show success message and redirect for other payment methods
            setPaymentStep('success');
            setTimeout(() => {
                onSuccessfulPayment(orderId);
            }, 2000);
            
        } catch (error) {
            console.error("Error creating order:", error);
            alert("There was an error processing your order. Please try again.");
            setPaymentStep('form');
        } finally {
            setIsProcessing(false);
        }
    };

    const renderPaymentContent = () => {
        switch (paymentStep) {
            case 'select':
                return (
                    <>
                        <div className="mb-4">
                            <h5 className="mb-3">Select Payment Method</h5>
                            {paymentMethods.map(({ id, label, icon }) => (
                                <div className="form-check custom-radio mb-3" key={id}>
                                    <input
                                        type="radio"
                                        className="form-check-input"
                                        name="payment"
                                        id={id}
                                        value={id}
                                        checked={selectedMethod === id}
                                        onChange={(e) => setSelectedMethod(e.target.value)}
                                    />
                                    <label className="form-check-label d-flex align-items-center border rounded p-3 w-100" htmlFor={id}>
                                        {icon} <span className="ms-2">{label}</span>
                                    </label>
                                </div>
                            ))}
                        </div>
                        
                        <button 
                            onClick={proceedToPaymentForm}
                            className="btn btn-primary btn-lg w-100 mb-3"
                        >
                            Continue to Payment
                        </button>
                        
                        <button
                            onClick={onBackClick}
                            className="btn btn-outline-secondary w-100"
                        >
                            <FaArrowLeft className="me-2" /> Back to Checkout
                        </button>
                    </>
                );
                
            case 'form':
                return (
                    <>
                        <h5 className="mb-3">Complete Your Payment</h5>
                        
                        {selectedMethod === 'stripe' && (
                            <div className="mb-4">
                                <StripePaymentForm 
                                    total={total} 
                                    onPaymentSuccess={handlePaymentSuccess}
                                />
                            </div>
                        )}
                        
                        <button
                            onClick={() => setPaymentStep('select')}
                            className="btn btn-outline-secondary w-100 mt-3"
                            disabled={isProcessing}
                        >
                            <FaArrowLeft className="me-2" /> Change Payment Method
                        </button>
                    </>
                );
                
            case 'processing':
                return (
                    <div className="text-center py-5">
                        <div className="spinner-border text-primary mb-3" role="status">
                            <span className="visually-hidden">Processing payment...</span>
                        </div>
                        <h5>Processing Your Payment</h5>
                        <p className="text-muted">Please wait while we complete your order...</p>
                    </div>
                );
                
            case 'success':
                return (
                    <div className="text-center py-5">
                        <div className="mb-3">
                            <span className="display-1 text-success">✓</span>
                        </div>
                        <h4 className="mb-3">Payment Successful!</h4>
                        <p className="mb-4">Your order has been placed successfully. Redirecting to order summary...</p>
                        <div className="spinner-border spinner-border-sm text-primary" role="status">
                            <span className="visually-hidden">Redirecting...</span>
                        </div>
                    </div>
                );
                
            default:
                return null;
        }
    };

    return (
        <div className="card border-secondary mb-4 shadow-sm">
            <div className="card-header bg-secondary text-white">
                <h4 className="m-0 text-center">Payment Details</h4>
            </div>
            <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h5 className="mb-0">Order Total:</h5>
                    <h4 className="text-primary mb-0">${total}</h4>
                </div>
                
                <hr className="my-4" />
                
                {renderPaymentContent()}
            </div>
        </div>
    );
};

export default PaymentOption;