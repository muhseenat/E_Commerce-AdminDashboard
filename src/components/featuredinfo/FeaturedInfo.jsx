import React from "react";
import "./featuredInfo.css";
import { ArrowDownward, ArrowUpward } from '@mui/icons-material';
import {useState,useEffect} from 'react'
import axios from '../.././axios'


function FeaturedInfo() {

  const [income,setIncome]=useState([]);
  const [perc,setPerc] =useState(0);


  useEffect(()=>{
    axios.get('/order/get-income').then((resp)=>{
      console.log(resp);
      console.log(resp.data?.income);
      setIncome(resp.data?.income);
  if(resp.data?.income.length>1){

    setPerc((resp.data?.income[1]?.total*100)/resp.data?.income[0]?.total-100);
  }
    }).catch((err)=>{
      console.log(err);
    })
  },[])
  console.log(perc);
  console.log(income);
  return (
    <div className="featured">
      <div className="featuredItem">
          <span className="featuredTitle">Revenue</span>
       <div className="featuredMoneyContainer">
           <span className="featuredMoney">{income.length>1?income[1]?.total:income[0]?.total}</span>
            <span className="featuredMoneyRate">{Math.floor(perc)}%{''}
            {perc<0?(
              <ArrowDownward className="featuredIcon negative"/>
            ):(
              <ArrowUpward className="featuredIcon positive"/>
            )}
           </span>
       </div>
       <span className="featuredSub">Compared to last month</span>
      </div>
      <div className="featuredItem">
          <span className="featuredTitle">Sales</span>
       <div className="featuredMoneyContainer">
           <span className="featuredMoney">₹2,145</span>
            <span className="featuredMoneyRate">-11.4
            <ArrowDownward className="featuredIcon positive"/></span>
       </div>
       <span className="featuredSub">Compared to last month</span>
      </div>
      <div className="featuredItem">
          <span className="featuredTitle">Cost</span>
       <div className="featuredMoneyContainer">
           <span className="featuredMoney">₹2,145</span>
            <span className="featuredMoneyRate">+20411.4
            <ArrowUpward className="featuredIcon"/></span>
       </div>
       <span className="featuredSub">Compared to last month</span>
      </div>
    </div>
  );
}

export default FeaturedInfo;
