import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Layout from '../components/Layout';
import CheckOut from '../pages/CheckOut';
import ProtectedRoute from './ProtectedRoute';
import Login from '../pages/Login';
import Registration from '../pages/Registration';
import Home from '../pages/Home';
import ForgotPassword from '../pages/forgotPassword';
import EmailVerification from '../pages/EmailVerificationn';
import ResetPassword from '../pages/ResetPassword';
import Menu from '../pages/Menu';
import Restaurant from '../pages/Restaurant';
import MenuItemDetails from '../pages/MenuItemDetails';
import Cart from '../pages/Cart';
import About from '../pages/About';
import ProfileOverview from '../pages/ProfileOverview';
import OrderHistory from '../pages/OrderHistory';
import AddressView from '../components/AddressView';
import ChangePassword from '../components/ChangePassword';
import AddressForm from '../components/AddressForm';
import OrderSummary from '../pages/OrderSummary';

// Load Stripe with your publishable key
const stripePromise = loadStripe('your_publishable_key_here');

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="registration" element={<Registration />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="reset-password" element={<ResetPassword />} />
        <Route path="email-verification" element={<EmailVerification />} />
        <Route path="menu" element={<Menu />} />
        <Route path="restaurant" element={<Restaurant />} />
        <Route path="menu-details" element={<MenuItemDetails />} />
        <Route path="cart" element={<Cart />} />
        <Route path="about" element={<About />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="change-password" element={<ChangePassword />} />
          <Route path="profile-overview" element={<ProfileOverview />} />
          <Route path="order-history" element={<OrderHistory />} />
          <Route path="user-address" element={<AddressView />} />
          <Route path="save-address" element={<AddressForm />} />
          <Route path="order-summary" element={<OrderSummary />} />

          {/* Wrap Checkout with Elements Provider for Stripe */}
          <Route
            path="check-out"
            element={
              <Elements stripe={stripePromise}>
                <CheckOut />
              </Elements>
            }
          />
        </Route>

      </Route>

      {/* 404 Not Found Route */}
      <Route
        path="*"
        element={
          <div className="flex items-center justify-center h-screen">
            <h1 className="text-3xl text-red-500">404 - Not Found</h1>
          </div>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
