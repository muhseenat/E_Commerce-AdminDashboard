import React, { useState } from "react";
import "./coupon.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {useNavigate} from 'react-router-dom'
import Button from "@mui/material/Button";
import axios from '../../axios'

function CouponOffer() {
  const [name, setName] = useState("");
  const [discount, setDiscount] = useState("");
  const [maxamount, setMaxamount] = useState("");
  const [minamount, setMinamount] = useState("");
  const [minPurchase, setMinPurchase] = useState("");
  const [couponcode, setCouponcode] = useState("");
  const [error, setError] = useState("");
  const [expdate, setExpDate] = useState("");
 const navigate = useNavigate();
   const createCoupon =()=>{
      const payload={name,discount,maxamount,minamount,couponcode,expdate,minPurchase}
      axios.post('product/offer/coupon',payload).then((resp)=>{
          console.log(resp);
          setName("");
          setDiscount("");
          setMaxamount("");
          setMinamount("");
          setMinPurchase("");
          setCouponcode("");
          setExpDate("");

      }).catch((err)=>{
          console.log(err);
       
         setName("");
         setDiscount("");
         setMaxamount("");
         setMinamount("");
         setMinPurchase("");
         setCouponcode("");
         setExpDate("");
         setError(err.response?.data.errorMessage)
      })
  }

  return (
    <div className="offerpage">
      <Box>
        <Button
          style={{ margin: "50px", alignItems: "center" }}
          variant="contained"
          onClick={()=>navigate('/offer/product')}
        >
          Product Offer
        </Button>
        <Button
          style={{ margin: "50px", alignItems: "center" }}
          variant="contained"
          onClick={()=>navigate('/offer/category')}
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
          value={name}
          onChange={(e)=>setName(e.target.value)}
         
        />
        <TextField
          style={{ marginTop: "10px", marginLeft: "10px" }}
          id="outlined-basic"
          label="Discount Percentage"
          variant="outlined"
          value={discount}

          onChange={(e)=>setDiscount(e.target.value)}

        />
      </Box>

      <Box>
        <TextField
          style={{ marginTop: "10px", marginLeft: "10px" }}
          id="outlined-basic"
          label="Max-Amount"
          value={maxamount}
          variant="outlined"
          onChange={(e)=>setMaxamount(e.target.value)}

        />
        <TextField
          style={{ marginTop: "10px", marginLeft: "10px" }}
          id="outlined-basic"
          label="Min-Amount"
          variant="outlined"
          value={minamount}
          onChange={(e)=>setMinamount(e.target.value)}
          
        />
      </Box>
      <TextField
        style={{ marginTop: "10px", marginLeft: "10px" }}
        id="outlined-basic"
        label="Min-Purchase"
        variant="outlined"
        onChange={(e)=>setMinPurchase(e.target.value)}
        value={minPurchase}

      />
      <TextField
        style={{ marginTop: "10px", marginLeft: "10px" }}
        id="outlined-basic"
        label="Coupon code"
        variant="outlined"
        value={couponcode}

        onChange={(e)=>setCouponcode(e.target.value)}

      />
       
      <TextField
        style={{ marginTop: "10px", marginLeft: "10px" }}
        id="outlined-basic"
      
        variant="outlined"
        type='date'
          value={expdate}
        onChange={(e)=>setExpDate(e.target.value)}

      />
          {error && <p style={{marginTop:"10px", color:"red"}}>{error}</p>}

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
