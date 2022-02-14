import {
    CalendarToday,
  
    MailOutline,
    PermIdentity,
    AccountCircleOutlined,
    PhoneAndroid,
    Publish,
  } from "@material-ui/icons";
 
  import "./user.css";
  import { useEffect ,useState} from "react";
  import { useNavigate,useLocation} from 'react-router-dom';
 import axios from '../../axios'


  export default function User() {
   const navigate = useNavigate()
   const location = useLocation();
   const id=location.pathname.split('/')[2];
   const [user,setUser]=useState("")
 console.log(id);
    useEffect(() => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/");
        return false;
      }
      getDataById();
      
    }, [])
    const getDataById=()=>{
       axios.get(`users/getuser/${id}`).then((resp)=>{

         console.log(resp);
     setUser(resp.data.resp)
       })
  
    
  
    }
   

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
                {/* <span className="userShowUserTitle">Software Engineer</span> */}
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
                <span className="userShowInfoTitle">{user.createdAt}</span>
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
                <span className="userShowInfoTitle"> STATUS : {user.status ?'ACTIVE' :'BLOCKED'}</span>
              </div>
            </div>
          </div>
          {/* <div className="userUpdate">
            <span className="userUpdateTitle">Edit</span>
            <form className="userUpdateForm">
              <div className="userUpdateLeft">
                <div className="userUpdateItem">
                  <label>Username</label>
                  <input
                    type="text"
                    placeholder="annabeck99"
                    className="userUpdateInput"
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Full Name</label>
                  <input
                    type="text"
                    placeholder="Anna Becker"
                    className="userUpdateInput"
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Email</label>
                  <input
                    type="text"
                    placeholder="annabeck99@gmail.com"
                    className="userUpdateInput"
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Phone</label>
                  <input
                    type="text"
                    placeholder="+1 123 456 67"
                    className="userUpdateInput"
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Address</label>
                  <input
                    type="text"
                    placeholder="New York | USA"
                    className="userUpdateInput"
                  />
                </div>
              </div>
              <div className="userUpdateRight">
                <div className="userUpdateUpload">
                  <img
                    className="userUpdateImg"
                    src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                    alt=""
                  />
                  <label htmlFor="file">
                    <Publish className="userUpdateIcon" />
                  </label>
                  <input type="file" id="file" style={{ display: "none" }} />
                </div>
                <button className="userUpdateButton">Update</button>
              </div>
            </form>
          </div> */}
        </div>
      </div> ///dont use this page.........
    );
  }