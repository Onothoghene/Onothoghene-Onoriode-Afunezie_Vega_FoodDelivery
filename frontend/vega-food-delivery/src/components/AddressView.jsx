import React, { useEffect, useState } from "react";
import AddressForm from "../components/AddressForm";
import ProfileLayout from "./ProfileLayout";
import { FaPen, FaTrash } from "react-icons/fa";
import AddressService from "../services/AddressService";
import { useAuth } from "../hooks/useAuth";
import toast from "react-hot-toast";
import EmptyState from "./EmptyState";
import Spinner from "./Spinner";
import { Link } from "react-router-dom";

const AddressView = () => {
  const { authUser } = useAuth()
  const [addresses, setAddresses] = useState([]);
  const [editingAddress, setEditingAddress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await AddressService.getAllUserAddresses();
        setAddresses(response.data?.data || []);
      } catch (error) {
        console.error("Error fetching addresses:", error);
        toast.error("Failed to fetch addresses.");
      } finally {
        setLoading(false);
      }
    };

    fetchAddresses();
  }, [authUser]);

  const handleEdit = (address) => {
    setEditingAddress(address);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      setIsUpdating(true);
      await AddressService.deleteAddress(id);
      setAddresses(addresses.filter((address) => address.id !== id));
      toast.success("Address deleted successfully.");
    } catch (error) {
      console.error("Error deleting address:", error);
      toast.error("Failed to delete address.");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleSetDefault = async (id) => {
    try {
      setIsUpdating(true);
    await AddressService.setAsDedault({ addressId: id }); 
    setAddresses(addresses.map((address) => ({
      ...address,
      isDefault: address.id === id,
    })));
      toast.success("Default address updated.");
    } catch (error) {
      console.error("Error setting default address:", error);
      toast.error("Failed to update default address.");
    } finally {
      setIsUpdating(false);
    }
  };


  return (
    <ProfileLayout>
      <div className="container mt-3">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="fw-bold">Addresses ({addresses.length})</h4>
          <Link to="/save-address" className="btn btn-warning text-white fw-bold btn-sm rounded-pill">
            Add new address
          </Link>
        </div>

        {loading ? (
           <div className="d-flex justify-content-center">
           <Spinner />
         </div>
        ) : addresses.length === 0 ? (
          <EmptyState title="No Address Found" />
        ) : (
          <div className="row">
            {addresses.map((address) => (
              <div key={address.id} className="col-md-6 mb-3">
                <div
                  className={`card p-3 shadow-sm w-100 d-flex flex-column h-100 ${address.isDefault ? "bg-light-orange" : ""
                    }`}
                  style={{
                    borderLeft: address.isDefault ? "4px solid orange" : "none",
                    display: "flex",
                    flexGrow: 1,
                    minHeight: 200,
                  }}
                >
                  <div className="flex-grow-1">
                    <h6 className="fw-bold">{address.firstName} {address.lastName}</h6>
                    <h6 className="mb-1">{address.street}</h6>
                    <p className="mb-1">
                      {address.city}, {address.state}, {address.zipCode}
                    </p>
                    <p className="text-muted small">{address.country}</p>
                    <p className="text-muted small">{address.phoneNumber} {address.additionalPhoneNumber && `/ ${address.additionalPhoneNumber}`}</p>
                    {address.isDefault && <span className="text-success fw-bold text-sm">Default Address</span>}
                  </div>

                  <div className="d-flex justify-content-between align-items-center gap-2 mt-2">
                    <button
                      className="btn btn-sm btn-link text-orange fw-bold"
                      onClick={() => handleSetDefault(address.id)}
                      disabled={address.isDefault}
                      style={{
                        cursor: address.isDefault ? "not-allowed" : "pointer",
                        opacity: address.isDefault ? 0.5 : 1,
                      }}
                    >
                      Set as default
                    </button>
                    <Link to="/save-address" state={{ address }} className="btn btn-sm btn-outline-warning">
                      <FaPen />
                    </Link>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(address.id)}>
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </ProfileLayout>
  );
};

export default AddressView;