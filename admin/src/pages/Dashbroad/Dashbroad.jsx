import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import { assets } from "../../assets/assets";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      <div className="dashboard-card" onClick={() => navigate("/create")}>
        <img src={assets.manager_icon} alt="manager" className="dashboard-icon" />
        <h3>Manager Controll</h3>
      </div>

      <div className="dashboard-card" onClick={() => navigate("/add")}>
        <img src={assets.item2} alt="Itmes" className="dashboard-icon" />
        <h3>Add Items</h3>
      </div>

      <div className="dashboard-card" onClick={() => navigate("/list")}>
        <img src={assets.list_icon} alt="List Item" className="dashboard-icon" />
        <h3>List Item</h3>
      </div>

      <div className="dashboard-card" onClick={() => navigate("/addinventory")}>
        <img src={assets.inventory} alt="Inventory" className="dashboard-icon" />
        <h3>Inventory</h3>
      </div>

      <div className="dashboard-card" onClick={() => navigate("/orderanalysis")}>
        <img src={assets.order_analysis} alt="Order Analysis" className="dashboard-icon" />
        <h3>Order Analysis</h3>
      </div>
      <div className="dashboard-card" onClick={() => navigate("/itemanalysis")}>
        <img src={assets.food_analysis} alt="Item Analysis" className="dashboard-icon" />
        <h3>Item Analysis</h3>
      </div>
       <div className="dashboard-card" onClick={() => navigate("/review")}>
        <img src={assets.review} alt="Review" className="dashboard-icon" />
        <h3>Customer Review</h3>
      </div>
    </div>
  );
};

export default Dashboard;
