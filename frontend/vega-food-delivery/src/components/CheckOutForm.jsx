import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

const CARD_ELEMENT_OPTIONS = {
    style: {
        base: {
            color: '#32325d',
            fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
            fontSmoothing: 'antialiased',
            fontSize: '16px',
            '::placeholder': {
                color: '#aab7c4'
            }
        },
        invalid: {
            color: '#fa755a',
            iconColor: '#fa755a'
        }
    }
};

const CheckoutForm = ({ total, onPaymentSuccess }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError(null);

        if (!stripe || !elements) {
            setLoading(false);
            setError("Stripe hasn't loaded yet. Please try again.");
            return;
        }

        try {
             setTimeout(() => {
                console.log(`Processing payment of $${total}`);
                
                // Simulate successful payment
                onPaymentSuccess({
                    id: 'pi_' + Math.random().toString(36).substring(2, 15),
                    amount: parseFloat(total) * 100,
                    status: 'succeeded',
                    method: 'stripe'
                });
                
                setLoading(false);
            }, 2000);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="stripe-payment-form">
            <div className="mb-4">
                <label className="form-label">Card Information</label>
                <div className="form-control p-3">
                    <CardElement options={CARD_ELEMENT_OPTIONS} />
                </div>
                {error && <div className="text-danger mt-2">{error}</div>}
            </div>
            
            <button 
                type="submit" 
                disabled={!stripe || loading} 
                className="btn btn-primary w-100"
            >
                {loading ? (
                    <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Processing...
                    </>
                ) : `Pay $${total}`}
            </button>
        </form>
    );
};

export default CheckoutForm;