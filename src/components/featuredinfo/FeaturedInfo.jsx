import React from "react";
import "./featuredInfo.css";
import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import { useState, useEffect } from "react";
import axios from "../.././axios";

function FeaturedInfo() {
  const [income, setIncome] = useState([]);
  const [perc, setPerc] = useState(0);
  const [length, setLength] = useState(0);
  const [orders, setOrders] = useState(0);

  useEffect(() => {
    axios
      .get("/order/get-income")
      .then((resp) => {
        console.log(resp);
        console.log(resp.data?.income);
        setIncome(resp.data?.income);
        setLength(resp.data?.income.length);
        if (resp.data?.income.length > 1) {
          setPerc(
            (resp.data?.income[1]?.total * 100) / resp.data?.income[0]?.total -
              100
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get("/order/get-total-orders")
      .then((resp) => {
        setOrders(resp.data?.count);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Revenue</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">
            ₹{income.length > 1 ? income[1]?.total : income[0]?.total}
          </span>
          {perc > 0 && (
            <span className="featuredMoneyRate">
              {Math.floor(perc)}%{""}
              {perc < 0 ? (
                <ArrowDownward className="featuredIcon negative" />
              ) : (
                <ArrowUpward className="featuredIcon positive" />
              )}
            </span>
          )}
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Sales</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">₹{income[length - 1]?.total}</span>
        </div>
        <span className="featuredSub">This month sales</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Orders</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{orders}</span>
        </div>
        <span className="featuredSub">Total orders till now</span>
      </div>
    </div>
  );
}

export default FeaturedInfo;
