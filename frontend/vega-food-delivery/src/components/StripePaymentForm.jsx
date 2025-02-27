import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckOutForm';
import { STRIPE_PUBLISHABLE_KEY } from '../utils/stripeConfig';

const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

const StripePaymentForm = ({ total, onPaymentSuccess }) => {
    return (
        <div className="stripe-form-container border rounded p-3">
            <Elements stripe={stripePromise}>
                <CheckoutForm total={total} onPaymentSuccess={onPaymentSuccess} />
            </Elements>
        </div>
    );
};

export default StripePaymentForm;