import React, { useEffect } from "react";
import { PiAddressBookDuotone } from "react-icons/pi";
import { Link } from "react-router-dom";

const BillingAddress = ({ defaultAddress, setSelectedAddress }) => {
  useEffect(() => {
    setSelectedAddress(defaultAddress);
  }, [defaultAddress, setSelectedAddress]);

  const isAddressEmpty = !defaultAddress || Object.keys(defaultAddress).length === 0;

  return (
    <div className="card shadow-sm p-4 mb-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="font-weight-semi-bold text-primary">
          <PiAddressBookDuotone className="me-2" />
          Billing Address
        </h4>
        <Link to="/user-address" className="text-muted" style={{ fontSize: "0.9rem" }}>
          Change <br />
          <span style={{ fontSize: "0.8rem" }}>Not the right default address?</span>
        </Link>
      </div>
      <p className="text-small text-muted fw-lighter lh-sm">Your default address</p>

      {isAddressEmpty ? (
        <div className="alert alert-warning">
          No default address. <br />
          <Link to="/user-address" className="text-primary">
            Click here to set or add a default address.
          </Link>
        </div>
      ) : (
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
            { key: "country", label: "Country", placeholder: "United States" },
          ].map((field, index) => (
            <div className="col-md-6 form-group mb-3" key={index}>
              <label>{field.label}</label>
              <input
                className="form-control"
                type="text"
                placeholder={field.placeholder}
                value={defaultAddress?.[field.key] || ""}
                disabled
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BillingAddress;
