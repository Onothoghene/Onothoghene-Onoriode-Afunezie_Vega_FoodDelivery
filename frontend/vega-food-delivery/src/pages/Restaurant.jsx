import React, { useEffect, useState } from "react";
import RestaurantMap from "../components/RestaurantMap";
import RestaurantList from "../components/RestaurantList";
import RestaurantForm from "../components/RestaurantForm";
import CourierForm from "../components/CourierForm";
import { useAuth } from "../hooks/useAuth";
import RestaurantService from "../services/RestaurantService";
import CourierService from "../services/CourierService";
import CourierList from "../components/CourierList";
import toast from "react-hot-toast";

const Restaurant = () => {
  const [refresh, setRefresh] = useState(false);
  const { authUser, authToken } = useAuth()
  const [restaurantList, setRestaurantList] = useState([]);
  const [couriers, setCouriers] = useState([]);
  const [selectedCourier, setSelectedCourier] = useState(null);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const restaurantResponse = await RestaurantService.getAllRestaurants();
        setRestaurantList(restaurantResponse.data?.data || []);

        const courierResponse = await CourierService.getAllCouriers();
        setCouriers(courierResponse.data?.data || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [refresh]);

  const handleRefresh = () => {
    setRefresh((prev) => !prev);
  };

  const handleEditCourier = (courier) => {
    setSelectedCourier(courier);
  };

  const handleDeleteCourier = async (id) => {
    if (window.confirm("Are you sure you want to delete this courier?")) {
      try {
        await CourierService.deleteCourier(id);
        toast.success("Courier deleted successfully!");
        handleRefresh();
      } catch (error) {
        toast.error("Error deleting courier.");
        console.error("Error:", error);
      }
    }
  };

  const handleEditRestaurant = (restaurant) => {
    setSelectedRestaurant(restaurant);
  };

  const handleDeleteRestaurant = async (restaurantId) => {
    try {
      await RestaurantService.deleteRestaurant(restaurantId);
      toast.success("Restaurant deleted successfully!");
      handleRefresh();
    } catch (error) {
      toast.error("Error deleting restaurant.");
      console.error("Error:", error);
    }
  };


  return (
    <>
      {/* <Toaster position="top-right" reverseOrder={false} /> */}
      <div className="text-center mb-4">
        <h2>Our Locations</h2>
      </div>

      <RestaurantMap restaurantList={restaurantList} />

      <RestaurantList restaurantList={restaurantList}
        onEdit={handleEditRestaurant}
        onDelete={handleDeleteRestaurant}
        authUser={authUser}
        authToken={authToken} />

      {authToken && authUser && authUser?.roles.includes("Admin") && (

        <div className="container mt-4">
          <div className="row">
            {/* Restaurant Form */}
            <div className="col-md-6">
              <div className="card shadow-sm">
                <div className="card-body">
                  <RestaurantForm
                    onRestaurantAdded={handleRefresh}
                    selectedRestaurant={selectedRestaurant} />
                </div>
              </div>
            </div>

            {/* Courier Form */}
            <div className="col-md-6">
              <div className="card shadow-sm">
                <div className="card-body">
                  <CourierForm
                    onCourierAdded={handleRefresh}
                    restaurantList={restaurantList}
                    selectedCourier={selectedCourier} />
                </div>
              </div>
            </div>
          </div>
          {/* Courier List */}
          <CourierList
            couriers={couriers}
            onEdit={handleEditCourier}
            onDelete={handleDeleteCourier} />
        </div>
      )}
    </>
  );
};

export default Restaurant;
