import React, { useEffect, useState } from "react";
import ProfileLayout from "../components/ProfileLayout";
import OrderService from "../services/OrderService";
import { Link } from "react-router-dom";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await OrderService.getAllUserOrders();
        const allOrders = response.data?.data;

        console.log("just data: ", response.data);
        console.log("data data: ", response.data?.data);

        setOrders(allOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <ProfileLayout>
      <div className="container mt-3">
        <h4 className="fw-bold mb-3">Order History</h4>
        <div className="table-responsive">
          {orders.length === 0 ? (
            <div className=" text-center alert alert-info" role="alert">
              <p className="text-bold">You haven't made any purchase yet.</p>
              <Link className="btn btn-secondary btn-sm rounded-pill" to="/menu">Menu</Link>
            </div>
          ) : (
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Date</th>
                  <th>Total</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.date}</td>
                    <td>{order.total}</td>
                    <td>{order.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </ProfileLayout>
  );
};

export default OrderHistory;
