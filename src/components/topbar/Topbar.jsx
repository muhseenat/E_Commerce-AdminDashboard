import React from "react";
import "./topbar.css";
import { useNavigate } from "react-router-dom";
import { ExitToAppOutlined } from "@mui/icons-material";
function Topbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  if (!token) {
    return <></>;
  }
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="top-left">
          <span className="logo"> Zain Modestwears</span>
        </div>
        <div className="top-right">
          <div className="topbarIconsContainer">
            <ExitToAppOutlined onClick={handleLogout} />
          </div>
          <img
            src="https://images.pexels.com/photos/9942898/pexels-photo-9942898.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            alt="image"
            className="topAvatar"
          />
        </div>
      </div>
    </div>
  );
}

export default Topbar;
