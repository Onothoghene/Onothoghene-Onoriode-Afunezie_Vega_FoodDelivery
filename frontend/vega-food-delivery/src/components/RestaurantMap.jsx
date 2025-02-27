import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import closed from "../assets/closed.png";
import open from "../assets/open.png";
import Spinner from "./Spinner";

const API_KEY = "dddad2399a564d6f8db6b9727fdfd61d"; 

// Custom icons
const greenIcon = new L.Icon({
    iconUrl: open,
    iconSize: [70, 70],
});

const redIcon = new L.Icon({
    iconUrl: closed,
    iconSize: [70, 70],
});

// Function to fetch latitude & longitude from OpenCage
const getCoordinates = async (address) => {
    try {
        const response = await fetch(
            `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(address)}&key=${API_KEY}`
        );
        const data = await response.json();

        if (data.results.length > 0) {
            const { lat, lng } = data.results[0].geometry;
            return { lat, lon: lng };
        } else {
            console.warn(`No coordinates found for: ${address}`);
        }
    } catch (error) {
        console.error(`Error fetching coordinates for ${address}:`, error);
    }

    return null;
};

// Helper function to introduce a delay (prevents hitting API rate limits)
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const RestaurantMap = ({ restaurantList }) => {
    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log("Restaurant List in Map:", restaurantList);

        if (!restaurantList || restaurantList.length === 0) {
            console.warn("Restaurant list is empty or undefined!");
            setLoading(false);
            return;
        }

        const fetchCoordinates = async () => {
            setLoading(true);
            const promises = restaurantList.map(async (restaurant, index) => {
                await delay(index * 1000); // Add a delay to avoid rate limits
                console.log("Fetching for:", restaurant.location);
                const coords = await getCoordinates(restaurant.location);
                console.log("Received coordinates:", coords);
                return coords ? { 
                    id: restaurant.id, 
                    name: restaurant.location, 
                    lat: coords.lat, 
                    lon: coords.lon, 
                    isAvailable: restaurant.isAvailable 
                } : null;
            });

            const resolvedLocations = (await Promise.all(promises)).filter(Boolean);
            setLocations(resolvedLocations);
            setLoading(false);
        };

        fetchCoordinates();
    }, [restaurantList]);

    return (
        <>
            {loading && <Spinner />}
            
            <MapContainer
                center={[6.5244, 3.3792]} zoom={12}
                style={{ height: "450px", width: "100%", maxWidth: "800px", margin: "0 auto" }}>

                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                
                {locations.map((loc) => (
                    <Marker
                        key={loc.id} position={[loc.lat, loc.lon]}
                        icon={loc.isAvailable ? greenIcon : redIcon}>
                        <Popup>
                            <strong>{loc.name}</strong> <br />
                            {loc.isAvailable ? "✅ Open" : "❌ Closed"}
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </>
    );
};

export default RestaurantMap;
