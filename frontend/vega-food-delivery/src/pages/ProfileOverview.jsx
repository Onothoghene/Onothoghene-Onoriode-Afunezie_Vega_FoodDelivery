import React, { useEffect, useState } from "react";
import AccountDetails from "../components/AccountDetails";
import ProfileLayout from "../components/ProfileLayout";
import DefaultAddress from "../components/DefaultAddress";
import AddressService from "../services/AddressService";
import PersonalDetailsService from "../services/PersonalDetailsService";
import EditProfile from "../components/EditProfile";
import toast from "react-hot-toast";

const ProfileOverview = () => {
    const [user, setUser] = useState(null);
    const [defaultAddress, setDefaultAddress] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true); // Single loading state

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [userResponse, addressResponse] = await Promise.all([
                    PersonalDetailsService.GetByUserId(),
                    AddressService.getUserDefaultAddresses(),
                ]);

                setUser(userResponse.data?.data || null);
                setDefaultAddress(addressResponse.data?.data || null);
                console.log(Response.data?.data)
            } catch (error) {
                console.error("Error fetching data:", error);
                toast.error("Failed to fetch data.");
            } finally {
                setLoading(false); // Ensure loading stops
            }
        };

        fetchData();
    }, []);

    const handleUpdateProfile = async (updatedUser) => {
        try {
            await PersonalDetailsService.updatePersonalDetails(updatedUser);
            setUser(updatedUser);
            toast.success("Profile updated successfully!");
            setIsEditing(false);
        } catch (error) {
            console.error("Error updating profile:", error);
            toast.error("Failed to update profile.");
        }
    };

    return (
        <ProfileLayout>
            <div className="container mt-3">
                <h4 className="fw-bold mb-3">Account Overview</h4>

                {loading ? (
                    <p>Loading...</p> // Single loading indicator
                ) : (
                    <div className="row">
                        <div className="col-md-6">
                            {isEditing ? (
                                <EditProfile user={user} onUpdate={handleUpdateProfile} onCancel={() => setIsEditing(false)} />
                            ) : (
                                <AccountDetails user={user} onEdit={() => setIsEditing(true)} />
                            )}
                        </div>
                        <div className="col-md-6">
                            {defaultAddress && <DefaultAddress defaultAddress={defaultAddress} />}
                        </div>
                    </div>
                )}
            </div>
        </ProfileLayout>
    );
};

export default ProfileOverview;
