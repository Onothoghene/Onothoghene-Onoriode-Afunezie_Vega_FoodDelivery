import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Import useNavigate
import AddressService from "../services/AddressService";
import toast from "react-hot-toast";
import ProfileLayout from "./ProfileLayout";
import Spinner from "./Spinner";

const AddressForm = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Initialize navigate
  const address = location.state?.address || null;
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    additionalPhoneNumber: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    id: 0, // Default to 0 for new addresses
    isDefault: false, // New field for default address
  });

  useEffect(() => {
    if (address) {
      setFormData(address);
    }
  }, [address]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value, // Handle checkboxes properly
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      let response;
      if (formData.id) {
        // Update existing address
        response = await AddressService.saveAddress(formData);
        toast.success("Address updated successfully.");
      } else {
        // Add new address
        response = await AddressService.saveAddress(formData);
        toast.success("Address added successfully.");
      }

      navigate("/user-address"); // Redirect to AddressView after success
    } catch (error) {
      console.error("Error saving address:", error);
      toast.error("Failed to save address.");
    }finally {
      setIsLoading(false);
    }
  };

  return (
    <ProfileLayout>
      <div className="card p-3">
        <h5>{formData.id ? "Edit Address" : "Add New Address"}</h5>
        <form onSubmit={handleSubmit}>
        <div className="mb-3">
            <label className="form-label">First Name</label>
            <input
              type="text"
              className="form-control"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Last Name</label>
            <input
              type="text"
              className="form-control"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Phone Number</label>
            <input
              type="text"
              className="form-control"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Additional Phone Number</label>
            <input
              type="text"
              className="form-control"
              name="additionalPhoneNumber"
              value={formData.additionalPhoneNumber}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Street</label>
            <input
              type="text"
              className="form-control"
              name="street"
              value={formData.street}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">City</label>
            <input
              type="text"
              className="form-control"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">State</label>
            <input
              type="text"
              className="form-control"
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Zip Code</label>
            <input
              type="text"
              className="form-control"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Country</label>
            <input
              type="text"
              className="form-control"
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-check mb-3">
            <input
              type="checkbox"
              className="form-check-input"
              id="isDefault"
              name="isDefault"
              checked={formData.isDefault}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="isDefault">
              Set as Default
            </label>
          </div>
          <button type="submit" className="btn btn-success me-2">
          {isLoading ? "Saving..." : "Save"}
          </button>
        </form>
      </div>
    </ProfileLayout>
  );
};

export default AddressForm;