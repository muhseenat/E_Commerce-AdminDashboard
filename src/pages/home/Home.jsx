import React, {useState, useEffect,useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredinfo/FeaturedInfo";
import "./home.css";

import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import axios from '../.././axios'

export default function Home() {
  const navigate = useNavigate();
  const [istoken,setIsToken]=useState(false)
  const [userStatics,setUserStatics] = useState([])
  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  )
  
useEffect(() => {
  const token = localStorage.getItem("token");

  if (!token) {

    navigate("/login");
    return false;
  }
  axios.get('/users/get-user-statics').then((resp)=>{
    resp.data?.details.map((item)=>
       setUserStatics((prev)=>[
         ...prev,
         {name:MONTHS[item._id -1],"Active User":item.total}
       ])
    )
  }).catch((err)=>{
    console.log(err);
  })
  

}, [MONTHS]);
  return (
    <div className="home">
      <FeaturedInfo />
      <Chart data={userStatics} title="User Analytics" grid dataKey="Active User"/>
      <div className="homeWidgets">
        <WidgetSm/>
        <WidgetLg/>
      </div>
    </div>
  );
}

