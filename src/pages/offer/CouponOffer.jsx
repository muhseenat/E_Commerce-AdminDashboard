import React, { useState } from "react";
import "./coupon.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import Button from "@mui/material/Button";
import axios from '../../axios'

function CouponOffer() {
  const [name, setName] = useState("");
  const [discount, setDiscount] = useState("");
  const [maxamount, setMaxamount] = useState("");
  const [minamount, setMinamount] = useState("");
  const [minPurchase, setMinPurchase] = useState("");

  const [couponcode, setCouponcode] = useState("");
  const [expdate, setExpDate] = useState("");

   const createCoupon =()=>{
      const payload={name,discount,maxamount,minamount,couponcode,expdate,minPurchase}
      axios.post('product/offer/coupon',payload).then((resp)=>{
          console.log(resp);
      }).catch((err)=>{
          console.log(err);
      })
  }

  return (
    <div className="couponpage">
      <Box>
        <Button
          style={{ margin: "50px", alignItems: "center" }}
          variant="contained"
        >
          Product Offer
        </Button>
        <Button
          style={{ margin: "50px", alignItems: "center" }}
          variant="contained"
        >
          Category Offer
        </Button>
      </Box>
      <Box style={{ marginTop: "10px", marginLeft: "10px" }}>
        <h2 style={{ margin: "25px" }}> CouponOffer</h2>
      </Box>

      <Box>
        <TextField
          style={{ marginTop: "10px", marginLeft: "10px" }}
          id="outlined-basic"
          label="Coupon Name"
          variant="outlined"
          onChange={(e)=>setName(e.target.value)}
         
        />
        <TextField
          style={{ marginTop: "10px", marginLeft: "10px" }}
          id="outlined-basic"
          label="Discount Percentage"
          variant="outlined"
          onChange={(e)=>setDiscount(e.target.value)}

        />
      </Box>

      <Box>
        <TextField
          style={{ marginTop: "10px", marginLeft: "10px" }}
          id="outlined-basic"
          label="Max-Amount"
          variant="outlined"
          onChange={(e)=>setMaxamount(e.target.value)}

        />
        <TextField
          style={{ marginTop: "10px", marginLeft: "10px" }}
          id="outlined-basic"
          label="Min-Amount"
          variant="outlined"
          onChange={(e)=>setMinamount(e.target.value)}
          
        />
      </Box>
      <TextField
        style={{ marginTop: "10px", marginLeft: "10px" }}
        id="outlined-basic"
        label="Min-Purchase"
        variant="outlined"
        onChange={(e)=>setMinPurchase(e.target.value)}

      />
      <TextField
        style={{ marginTop: "10px", marginLeft: "10px" }}
        id="outlined-basic"
        label="Coupon code"
        variant="outlined"
        onChange={(e)=>setCouponcode(e.target.value)}

      />
       
      <TextField
        style={{ marginTop: "10px", marginLeft: "10px" }}
        id="outlined-basic"
        label="Expiry Date"
        variant="outlined"
        type='date'
        onChange={(e)=>setExpDate(e.target.value)}

      />

      <Box>
        <Button
          style={{ marginTop: "10px", marginLeft: "10px" }}
          variant="contained"
          onClick={createCoupon}
        >
          Create
        </Button>
      </Box>
    </div>
  );
}

export default CouponOffer;
