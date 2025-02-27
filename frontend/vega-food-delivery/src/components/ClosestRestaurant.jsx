import React, { useEffect, useState } from 'react';
import { FaMapMarkerAlt, FaPhoneAlt, FaClock } from 'react-icons/fa';

// Helper function to calculate distance between two coordinates
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  if (!lat1 || !lon1 || !lat2 || !lon2) return Infinity;
  
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2); 
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  const d = R * c; // Distance in km
  return d;
};

const deg2rad = (deg) => {
  return deg * (Math.PI/180);
};

const ClosestRestaurant = ({ selectedAddress, restaurants, onSelectRestaurant }) => {
  const [closestRestaurant, setClosestRestaurant] = useState(null);
  const [distance, setDistance] = useState(null);

  useEffect(() => {
    if (selectedAddress && restaurants && restaurants.length > 0) {
      // Find the closest restaurant based on coordinates
      const restaurantsWithDistances = restaurants.map(restaurant => {
        const dist = calculateDistance(
          selectedAddress.latitude,
          selectedAddress.longitude,
          restaurant.latitude,
          restaurant.longitude
        );
        return { ...restaurant, distance: dist };
      });
      
      // Sort by distance
      restaurantsWithDistances.sort((a, b) => a.distance - b.distance);
      
      // Set the closest restaurant
      const closest = restaurantsWithDistances[0];
      setClosestRestaurant(closest);
      setDistance(closest.distance);
      
      // Call the callback to notify parent component
      if (onSelectRestaurant && typeof onSelectRestaurant === 'function') {
        onSelectRestaurant(closest);
      }
    }
  }, [selectedAddress, restaurants, onSelectRestaurant]);

  if (!closestRestaurant) {
    return (
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">Closest Restaurant</h5>
          <p className="card-text text-muted">No restaurant information available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card mb-4 border-primary shadow-sm">
      <div className="card-header bg-primary text-white">
        <h5 className="m-0">Closest Restaurant</h5>
      </div>
      <div className="card-body">
        <h5 className="card-title">{closestRestaurant.name}</h5>
        
        <div className="d-flex align-items-start mb-2">
          <FaMapMarkerAlt className="text-danger mt-1 me-2" />
          <p className="card-text mb-1">{closestRestaurant.location}</p>
        </div>
        
        {closestRestaurant.phoneNumber && (
          <div className="d-flex align-items-start mb-2">
            <FaPhoneAlt className="text-primary mt-1 me-2" />
            <p className="card-text mb-1">{closestRestaurant.phoneNumber}</p>
          </div>
        )}
        
        {closestRestaurant.openingHours && (
          <div className="d-flex align-items-start mb-2">
            <FaClock className="text-success mt-1 me-2" />
            <p className="card-text mb-1">{closestRestaurant.openingHours}</p>
          </div>
        )}
        
        {distance !== null && !isNaN(distance) && isFinite(distance) && (
          <div className="alert alert-info mt-3 mb-0">
            <small>
              <strong>Distance:</strong> {distance.toFixed(2)} km from your location
            </small>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClosestRestaurant;