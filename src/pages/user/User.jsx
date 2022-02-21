import {
  CalendarToday,
  MailOutline,
  PermIdentity,
  AccountCircleOutlined,
  PhoneAndroid,
} from "@material-ui/icons";
import "./user.css";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "../../axios";

export default function User() {
  const navigate = useNavigate();
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [user, setUser] = useState("");
  console.log(id);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return false;
    }
    getDataById();
  }, []);
  const getDataById = () => {
    axios.get(`users/getuser/${id}`).then((resp) => {
      console.log(resp);
      setUser(resp.data.resp);
    });
  };

  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">View User</h1>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <div className="userShowTopTitle">
              <span className="userShowUsername">{user.name}</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Account Details</span>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle"> ID : {user._id}</span>
            </div>
            <div className="userShowInfo">
              <CalendarToday className="userShowIcon" />
              <span className="userShowInfoTitle">
                {new Date(user.createdAt).toDateString()}
              </span>
            </div>
            <span className="userShowTitle">Contact Details</span>
            <div className="userShowInfo">
              <PhoneAndroid className="userShowIcon" />
              <span className="userShowInfoTitle">{user.phone}</span>
            </div>
            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">{user.email}</span>
            </div>
            <div className="userShowInfo">
              <AccountCircleOutlined className="userShowIcon" />
              <span className="userShowInfoTitle">
                {" "}
                STATUS : {user.status ? "ACTIVE" : "BLOCKED"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
