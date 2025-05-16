// eslint-disable-next-line no-unused-vars
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import { assets } from "../../assets/assets";


const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">

      <div className="dashboard-card" onClick={() => navigate("/list")}>
        <img src={assets.menu} alt="Menu" className="dashboard-icon" />
        <h3>Menu Availability</h3>
      </div>

      <div className="dashboard-card" onClick={() => navigate("/orders")}>
        <img src={assets.order} alt="Orders" className="dashboard-icon" />
        <h3>Live Order List</h3>
      </div>

      <div className="dashboard-card" onClick={() => navigate("/inventory")}>
        <img src={assets.inventory} alt="Inventory" className="dashboard-icon" />
        <h3>Inventory</h3>
      </div>

      <div className="dashboard-card" onClick={() => navigate("/reservation")}>
        <img src={assets.reservation} alt="Reservations" className="dashboard-icon" />
        <h3>Reservation Status</h3>
      </div>

      <div className="dashboard-card" onClick={() => navigate("/staffcontrol")}>
        <img src={assets.staffcontrol} alt="Reviews" className="dashboard-icon" />
        <h3>Staff Control</h3>
      </div>

    </div>
  );
};

export default Dashboard;
