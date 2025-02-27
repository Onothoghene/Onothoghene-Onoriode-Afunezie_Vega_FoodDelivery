import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HeroSection from "../components/HeroSection";
import PaymentOption from "../components/PaymentOption";
import BillingAddress from "../components/BillingAddress";
import CheckOutCartSummary from "../components/CheckOutCartSummary";
import AddressService from "../services/AddressService";
import CartContext from "../context/CartContext";
import ClosestRestaurant from "../components/ClosestRestaurant";
import RestaurantService from "../services/RestaurantService";
import { getCoordinatesWithFallback } from "../utils/geocoding";

const CheckOut = () => {
  const navigate = useNavigate();
  const [defaultAddress, setDefaultAddress] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const [isLoadingAddress, setIsLoadingAddress] = useState(true);
  const [isLoadingRestaurants, setIsLoadingRestaurants] = useState(true);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const { cartItems } = useContext(CartContext);

  // Fetch the user's default address and add coordinates
  useEffect(() => {
    const fetchDefaultAddress = async () => {
      setIsLoadingAddress(true);
      try {
        const response = await AddressService.getUserDefaultAddresses();
        const defaultAddr = response.data?.data;
        
        if (defaultAddr) {
          console.log("Default address fetched:", defaultAddr);
          
          // Try to get coordinates with fallback strategy
          const coords = await getCoordinatesWithFallback(defaultAddr);
          console.log("Coordinates received:", coords);

          if (coords) {
            const updatedDefaultAddr = { ...defaultAddr, ...coords };
            console.log("Updated address with coords:", updatedDefaultAddr);
            setDefaultAddress(updatedDefaultAddr);
            setSelectedAddress(updatedDefaultAddr);
          } else {
            // Still set the address even without coordinates
            console.log("No coordinates found for address");
            setDefaultAddress(defaultAddr);
            setSelectedAddress(defaultAddr);
          }
        } else {
          console.log("No default address found");
        }
      } catch (error) {
        console.error("Error fetching default address:", error);
      } finally {
        setIsLoadingAddress(false);
      }
    };
  
    fetchDefaultAddress();
  }, []);
  
  // Fetch all restaurants and add coordinates to each
  useEffect(() => {
    const fetchAllRestaurants = async () => {
      setIsLoadingRestaurants(true);
      try {
        const response = await RestaurantService.getAllRestaurants();
        const rawRestaurants = response.data?.data || [];
        console.log("Fetched restaurants:", rawRestaurants);
  
        // Process restaurants in parallel with Promise.all
        const formattedRestaurants = await Promise.all(
          rawRestaurants.map(async (restaurant) => {
            try {
              console.log("Getting coordinates for restaurant:", restaurant.name, restaurant.location);
              const coords = await getCoordinatesWithFallback(restaurant.location);
              console.log("Restaurant coordinates:", restaurant.name, coords);
              
              if (coords) {
                return { ...restaurant, ...coords };
              }
            } catch (error) {
              console.error(`Error getting coordinates for ${restaurant.name}:`, error);
            }
            // Return the restaurant without coordinates if geocoding fails
            return restaurant;
          })
        );
        
        // Filter out restaurants without coordinates - but keep all if none have coordinates
        const restaurantsWithCoords = formattedRestaurants.filter(
          restaurant => restaurant.latitude && restaurant.longitude
        );
        
        if (restaurantsWithCoords.length > 0) {
          console.log("Restaurants with coordinates:", restaurantsWithCoords);
          setRestaurants(restaurantsWithCoords);
        } else {
          console.log("No restaurants with coordinates, using all restaurants");
          setRestaurants(rawRestaurants);
        }
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      } finally {
        setIsLoadingRestaurants(false);
      }
    };
  
    fetchAllRestaurants();
  }, []);

  // Calculate cart totals
  const shippingCost = 2.0;
  const subtotal = cartItems
    .reduce((acc, item) => acc + item.food.price * item.quantity, 0)
    .toFixed(2);
  const total = (
    Number(subtotal) + (subtotal > 0 ? Number(shippingCost) : 0)
  ).toFixed(2);

  // Debug log to verify data is available for ClosestRestaurant
  useEffect(() => {
    console.log("Selected address for restaurant calculation:", selectedAddress);
    console.log("Available restaurants for calculation:", restaurants);
  }, [selectedAddress, restaurants]);

  // Handle place order button click - Fixed this function
  const handlePlaceOrder = () => {
    // Ensure there's a selected restaurant
    if (!selectedRestaurant && restaurants.length > 0) {
      // Use the first restaurant if none is selected
      setSelectedRestaurant(restaurants[0]);
    }
    // Show the payment form
    setShowPaymentForm(true);
  };

  // Handle back button click
  const handleBackClick = () => {
    setShowPaymentForm(false);
  };
  
  // Handle return to home
  const handleReturnHome = () => {
    navigate('/');
  };

  // This function will be passed to the ClosestRestaurant component
  const handleSelectRestaurant = useCallback((restaurant) => {
    console.log("Restaurant selected:", restaurant);
    setSelectedRestaurant(restaurant);
  }, []);

  // Handle successful payment
  const handleSuccessfulPayment = (orderId) => {
    // Redirect to order summary with order ID
    navigate(`/order-summary?orderId=${orderId}`);
    // Force a page refresh
    window.location.reload();
  };

  return (
    <>
      <HeroSection title={showPaymentForm ? "Payment" : "Check-out"} />
      <div className="container pt-4 pb-5">
        {!showPaymentForm ? (
          <div className="row">
            <div className="col-lg-8">
              {isLoadingAddress ? (
                <div className="card shadow-sm p-4 mb-4">
                  <div className="d-flex justify-content-center">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading address...</span>
                    </div>
                  </div>
                </div>
              ) : (
                <BillingAddress 
                  defaultAddress={defaultAddress} 
                  setSelectedAddress={setSelectedAddress} 
                />
              )}
            </div>
            
            <div className="col-lg-4">
              {isLoadingRestaurants || isLoadingAddress ? (
                <div className="card mb-4">
                  <div className="card-body">
                    <h5 className="card-title">Closest Restaurant</h5>
                    <div className="d-flex justify-content-center">
                      <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading restaurants...</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <ClosestRestaurant
                  selectedAddress={selectedAddress}
                  restaurants={restaurants}
                  onSelectRestaurant={handleSelectRestaurant}
                />
              )}
              
              <CheckOutCartSummary
                cartItems={cartItems}
                subtotal={subtotal}
                shippingCost={shippingCost}
                total={total}
              />
              
              <div className="card border-secondary mb-4 shadow-sm">
                <div className="card-header bg-secondary text-white">
                  <h4 className="m-0 text-center">Order Actions</h4>
                </div>
                <div className="card-body text-center">
                  <button 
                    onClick={handlePlaceOrder}
                    className="btn btn-success btn-lg w-100 mb-3"
                    disabled={cartItems.length === 0}
                  >
                    Place Order
                  </button>
                  <button 
                    onClick={handleReturnHome}
                    className="btn btn-outline-secondary w-100"
                  >
                    Return to Home
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <PaymentOption 
                total={total}
                cartItems={cartItems}
                selectedRestaurant={selectedRestaurant || (restaurants.length > 0 ? restaurants[0] : null)}
                onBackClick={handleBackClick}
                onSuccessfulPayment={handleSuccessfulPayment}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CheckOut;