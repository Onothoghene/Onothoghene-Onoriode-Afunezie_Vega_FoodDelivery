import React, { useState } from "react";
import { FaShippingFast } from "react-icons/fa";
import { Link } from "react-router-dom";

const ShippingAddress = ({ addresses, selectedAddress, setSelectedAddress }) => {  
    // Filter out default addresses
    const nonDefaultAddresses = addresses.filter((address) => !address.isDefault);

    console.log("Filtered Addresses:", nonDefaultAddresses);

    const handleAddressChange = (event) => {
        const addressId = parseInt(event.target.value);
        const selected = nonDefaultAddresses.find((addr) => addr.id === addressId);
        console.log("Selected address: ", selected);
        setSelectedAddress(selected); 
    };

    return (
        <div className="card shadow-sm p-4 mb-4 collapse" id="shipping-address">
            {/* Card Header */}
            <h4 className="font-weight-semi-bold mb-3 text-primary">
                <FaShippingFast className="me-2"/>
                Shipping Address
            </h4>

            {/* Show message if no addresses exist */}
            {nonDefaultAddresses.length === 0 ? (
                <div className="alert alert-warning">
                    You haven't entered an address.
                    <br />
                    <Link to="/user-address" className="text-primary">
                        Click here to add an address.
                    </Link>
                </div>
            ) : (
                <>
                    {/* Address Dropdown */}
                    <div className="form-group mb-3">
                        <label className="font-weight-bold">Select Shipping Address</label>
                        <select className="form-control" onChange={handleAddressChange}>
                            <option value="">Choose an address...</option>
                            {nonDefaultAddresses.map((address) => (
                                <option key={address.id} value={address.id}>
                                    {`${address.street}, ${address.city}, ${address.state}, ${address.country}`}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Show the form only if an address is selected */}
                    {selectedAddress && (
                        <div className="row">
                            {[ 
                                { key: "firstName", label: "First Name", placeholder: "John" },
                                { key: "lastName", label: "Last Name", placeholder: "Doe" },
                                { key: "email", label: "E-mail", placeholder: "example@email.com" },
                                { key: "phoneNumber", label: "Mobile No", placeholder: "+123 456 789" },
                                { key: "street", label: "Address Line 1", placeholder: "123 Street" },
                                { key: "city", label: "City", placeholder: "New York" },
                                { key: "state", label: "State", placeholder: "New York" },
                                { key: "zipCode", label: "ZIP Code", placeholder: "12345" },
                            ].map((field, index) => (
                                <div className="col-md-6 form-group mb-3" key={index}>
                                    <label className="font-weight-bold">{field.label}</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        placeholder={field.placeholder}
                                        value={selectedAddress[field.key] || ""}
                                        readOnly
                                    />
                                </div>
                            ))}

                            {/* Country Field */}
                            <div className="col-md-6 form-group mb-3">
                                <label className="font-weight-bold">Country</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={selectedAddress?.country || "United States"}
                                    readOnly
                                />
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};


export default ShippingAddress;
