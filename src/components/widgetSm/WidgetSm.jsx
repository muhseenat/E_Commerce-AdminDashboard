import "./widgetSm.css";
import { Visibility } from "@mui/icons-material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../axios";

export default function WidgetSm() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("/users/get-latest-users")
      .then((resp) => {
        setUsers(resp.data?.users);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        {users.length > 0 &&
          users.map((user) => (
            <li className="widgetSmListItem">
              <div className="widgetSmUser">
                <span className="widgetSmUsername">{user.name}</span>
              </div>

              <button
                className="widgetSmButton"
                onClick={() => navigate(`/user/${user._id}`)}
              >
                <Visibility className="widgetSmIcon" />
                Display
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
}
