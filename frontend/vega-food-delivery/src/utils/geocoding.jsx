import axios from "axios";

const API_KEY = "dddad2399a564d6f8db6b9727fdfd61d"; // Replace with your actual key

// Attempt geocoding with different address formats, starting from most specific to least
export const getCoordinatesWithFallback = async (address) => {
  if (!address) return null;
  
  // Create address strings with varying levels of detail
  let addressStrings = [];
  
  // If we have a structured address object
  if (typeof address === 'object') {
    // Full address
    if (address.street && address.city && address.state && address.country) {
      addressStrings.push(`${address.street}, ${address.city}, ${address.state}, ${address.country}`);
    }
    
    // City, state, country only
    if (address.city && address.state && address.country) {
      addressStrings.push(`${address.city}, ${address.state}, ${address.country}`);
    }
    
    // State and country only
    if (address.state && address.country) {
      addressStrings.push(`${address.state}, ${address.country}`);
    }
    
    // Country only
    if (address.country) {
      addressStrings.push(address.country);
    }
  } else if (typeof address === 'string') {
    // If address is already a string, use it directly
    addressStrings.push(address);
    
    // Also try extracting city/location parts if possible
    const parts = address.split(',').map(part => part.trim());
    if (parts.length >= 2) {
      // Try with just the last parts (city, state, country)
      addressStrings.push(parts.slice(1).join(', '));
    }
  }
  
  console.log("Trying geocoding with fallbacks:", addressStrings);
  
  // Try each address string until one works
  for (const addressString of addressStrings) {
    try {
      const coords = await getCoordinates(addressString);
      if (coords) {
        console.log(`Successfully geocoded with: "${addressString}"`, coords);
        return coords;
      }
    } catch (error) {
      console.error(`Geocoding failed for "${addressString}":`, error);
    }
  }
  
  console.log("All geocoding attempts failed");
  return null;
};

// Original geocoding function
export const getCoordinates = async (address) => {
  try {
    const formattedAddress = encodeURIComponent(address);
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${formattedAddress}&key=${API_KEY}`;
    
    const response = await axios.get(url);
    const data = response.data;

    if (data.results.length > 0) {
      const { lat, lng } = data.results[0].geometry;
      return { latitude: lat, longitude: lng };
    } else {
      console.error("No coordinates found for this address");
      return null;
    }
  } catch (error) {
    console.error("Error fetching coordinates:", error);
    return null;
  }
};