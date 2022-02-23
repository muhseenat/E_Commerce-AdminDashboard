import "./sidebar.css";
import {
  LineStyle,
  TrendingUp,
  PermIdentity,
  Storefront,
  CategoryOutlined,
  LocalOfferOutlined,
  LocalShippingOutlined,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useState } from "react";
export default function Sidebar() {
  const [istoken, setIsToken] = useState(false);
  const token = localStorage.getItem("token");

  if (!token) {
    return false;
  }
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/" className="link">
              <li className="sidebarListItem ">
                <LineStyle className="sidebarIcon" />
                Home
              </li>
            </Link>
            <Link to="/sales" className="link">
              <li className="sidebarListItem">
                <TrendingUp className="sidebarIcon" />
                Sales
              </li>
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quick Menu</h3>
          <ul className="sidebarList">
            <Link to="/users" className="link">
              <li className="sidebarListItem">
                <PermIdentity className="sidebarIcon" />
                Users
              </li>
            </Link>
            <Link to="/products" className="link">
              <li className="sidebarListItem">
                <Storefront className="sidebarIcon" />
                Products
              </li>
            </Link>
            <Link to="/category" className="link">
              <li className="sidebarListItem">
                <CategoryOutlined className="sidebarIcon" />
                Category
              </li>
            </Link>
            <Link to="/order" className="link">
              <li className="sidebarListItem">
                <LocalShippingOutlined className="sidebarIcon" />
                Order
              </li>
            </Link>
            <Link to="/offer/coupon" className="link">
              <li className="sidebarListItem">
                <LocalOfferOutlined className="sidebarIcon" />
                Offer
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
}
