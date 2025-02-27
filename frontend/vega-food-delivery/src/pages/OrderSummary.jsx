import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import OrderService from '../services/OrderService';
import { EpochToDateTime } from '../utils/DateTimeHelper';

const OrderSummary = () => {
    const [order, setOrder] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();
    
    useEffect(() => {
        const fetchOrderDetails = async () => {
            setIsLoading(true);
            try {
                // Get the order ID from the URL query parameters
                const params = new URLSearchParams(location.search);
                const orderId = params.get('orderId');
                
                if (!orderId) {
                    throw new Error('Order ID not found');
                }
                
                // Call the endpoint with the order ID
                const response = await OrderService.orderSummary(orderId);
                console.log("Order details fetched:", response.data);
                
                if (response.data?.data) {
                    setOrder(response.data.data);
                } else {
                    throw new Error('Order details not found');
                }
            } catch (err) {
                console.error("Error fetching order details:", err);
                setError(err.message || 'Failed to load order details');
            } finally {
                setIsLoading(false);
            }
        };
        
        fetchOrderDetails();
    }, [location.search]);
    
    const handleReturnHome = () => {
        navigate('/');
    };
    
    // Function to format the payment method string
    const formatPaymentMethod = (paymentOption) => {
        switch (paymentOption) {
            case 1:
                return 'Credit Card (Stripe)';
            case 2:
                return 'Cash on Delivery';
            default:
                return 'Unknown';
        }
    };
    
    // Function to format the order status
    const formatOrderStatus = (status) => {
        switch (status) {
            case 1:
                return 'New';
            case 2:
                return 'Processing';
            case 3:
                return 'Ready for Pickup/Delivery';
            case 4:
                return 'Delivered';
            case 5:
                return 'Cancelled';
            default:
                return 'Unknown';
        }
    };
    
    // Function to format the payment status
    const formatPaymentStatus = (status) => {
        switch (status) {
            case 1:
                return 'Pending';
            case 2:
                return 'Paid';
            case 3:
                return 'Cancelled';
            default:
                return 'Unknown';
        }
    };
    
    return (
        <>
            <HeroSection title="Order Summary" />
            <div className="container py-5">
                {isLoading ? (
                    <div className="text-center py-5">
                        <div className="spinner-border text-primary mb-3" role="status">
                            <span className="visually-hidden">Loading order details...</span>
                        </div>
                        <h5>Loading Order Details</h5>
                    </div>
                ) : error ? (
                    <div className="alert alert-danger" role="alert">
                        <h4 className="alert-heading">Error!</h4>
                        <p>{error}</p>
                        <hr />
                        <p className="mb-0">
                            <button 
                                onClick={handleReturnHome}
                                className="btn btn-outline-danger"
                            >
                                Return to Home
                            </button>
                        </p>
                    </div>
                ) : order ? (
                    <div className="row">
                        <div className="col-lg-8 mx-auto">
                            <div className="card border-success mb-4 shadow">
                                <div className="card-header bg-success text-white">
                                    <h4 className="m-0">Order Confirmation #{order.id}</h4>
                                </div>
                                <div className="card-body">
                                    <div className="text-center mb-4">
                                        <div className="display-1 text-success mb-3">✓</div>
                                        <h4>Thank you for your order!</h4>
                                        <p className="lead">Your order has been received and is now being processed.</p>
                                    </div>
                                    
                                    <div className="row mb-4">
                                        <div className="col-md-6">
                                            <h5 className="border-bottom pb-2">Order Details</h5>
                                            <p><strong>Order ID:</strong> #ORD_VGF{order.id}</p>
                                            <p><strong>Date:</strong> {EpochToDateTime(order.orderDate)}</p>
                                            {/* <p><strong>Status:</strong> {formatOrderStatus(order.status)}</p> */}
                                            <p><strong>Restaurant:</strong> {order.restaurant?.name || 'Not available'}</p>
                                        </div>
                                        <div className="col-md-6">
                                            <h5 className="border-bottom pb-2">Payment Information</h5>
                                            <p><strong>Payment Method:</strong> {formatPaymentMethod(order?.paymentOption)}</p>
                                            <p><strong>Payment Status:</strong> {formatPaymentStatus(order.paymentStatus)}</p>
                                            <p><strong>Total Amount:</strong> ${order.totalAmount.toFixed(2)}</p>
                                        </div>
                                    </div>
                                    
                                    <h5 className="border-bottom pb-2 mb-3">Order Items</h5>
                                    <div className="table-responsive">
                                        <table className="table">
                                            <thead className="table-light">
                                                <tr>
                                                    <th>Item</th>
                                                    <th>Quantity</th>
                                                    <th className="text-end">Price</th>
                                                    <th className="text-end">Subtotal</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {order.orderItems?.map((item, index) => (
                                                    <tr key={index}>
                                                        <td>{item.food?.name || 'Food Item'}</td>
                                                        <td>{item.quantity}</td>
                                                        <td className="text-end">${(item.subtotal / item.quantity).toFixed(2)}</td>
                                                        <td className="text-end">${item.subtotal.toFixed(2)}</td>
                                                    </tr>
                                                ))}
                                                <tr>
                                                    <td colSpan="3" className="text-end"><strong>Shipping:</strong></td>
                                                    <td className="text-end">$2.00</td>
                                                </tr>
                                                <tr>
                                                    <td colSpan="3" className="text-end"><strong>Total:</strong></td>
                                                    <td className="text-end"><strong>${order.totalAmount.toFixed(2)}</strong></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    
                                    <div className="mt-4 text-center">
                                        <button 
                                            onClick={handleReturnHome}
                                            className="btn btn-primary"
                                        >
                                            Return to Home
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="alert alert-warning" role="alert">
                        <h4 className="alert-heading">No Order Found</h4>
                        <p>We couldn't find any order details.</p>
                        <hr />
                        <p className="mb-0">
                            <button 
                                onClick={handleReturnHome}
                                className="btn btn-outline-warning"
                            >
                                Return to Home
                            </button>
                        </p>
                    </div>
                )}
            </div>
        </>
    );
};

export default OrderSummary;