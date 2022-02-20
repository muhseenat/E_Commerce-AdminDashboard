import React, { useEffect ,useState} from 'react'
import "./coupon.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {useNavigate} from 'react-router-dom'
import Button from "@mui/material/Button";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import axios from '../../axios'


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function CategoryOffer() {
  const navigate= useNavigate()
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [subCategory, setSubCategory] = useState([]);
 
  const [discount, setDiscount] = useState();
  // const [expdate, setExpDate] = useState();

  const categoryOptions = ["Clothes", "Hijab", "Accessories"];

  const getSubCategory=(mainCat)=>{
    setSelectedCategory(mainCat);
  axios.get(`category/getSubCategory?main=${mainCat}`).then((resp)=>{
      console.log(resp.data.data);
      setSubCategory(resp.data.data)
  }).catch((error)=>{
      console.log(error);
  })
  
}
 
  const createOffer=()=>{
    const payload={selectedSubCategory,discount}
    axios.put('/product/category-offer',payload).then((resp)=>{
        console.log(resp);
    }).catch((err)=>{
        console.log(err);
    })
}
  return (
    <div className='offerpage'>
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
          onClick={()=>navigate('/offer/coupon')}
        >
          Coupon Offer
        </Button>
      </Box>
      <Box style={{ marginTop: "10px", marginLeft: "10px" }}>
        <h2 style={{ margin: "25px" }}> Category Offer</h2>
      </Box>
      <form style={{textDecoration:"none",margin:"25px",padding:"10px"}} onSubmit={createOffer}>
      <FormControl sx={{ m: 5, width: 300 }} >
        <InputLabel>Select MainCategory</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          onChange={(e)=>{getSubCategory(e.target.value)}}
          input={<OutlinedInput label="Name" />}
          MenuProps={MenuProps}
          required
        >
         {categoryOptions.map((category, index) => {
                return (
                  <MenuItem key={index} value={category}>
                    {category}
                  </MenuItem>
                );
              })}
        </Select>
        <Select
          style={{ marginTop: "10px" }}
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              disabled={subCategory.length>0?false:true}
              input={<OutlinedInput label="Name" />}
              required
              MenuProps={MenuProps} onChange={(e)=>{setSelectedSubCategory(e.target.value)}}>
              {subCategory.map((category, index) => {
                return (
                  <MenuItem key={index} value={category}>
                    {category}
                  </MenuItem>
                );
              })}
            </Select>
        <Box>
          <TextField
          required
            style={{ marginTop: "10px" }}
            id="outlined-basic"
            value={discount}
            label="Enter Discount"
            variant="outlined"
            onChange={(e) => {
              setDiscount(e.target.value);
            }}
          />
        </Box>
        {/* <TextField
        style={{ marginTop: "10px" }}
        id="outlined-basic"
      
        variant="outlined"
        type='date'
          value={expdate}
          required={true}
        onChange={(e)=>setExpDate(e.target.value)}

      /> */}
        <Box>
          <Button
           type="submit"
            style={{ marginTop: "30px" }}
            variant="contained"
         
          >
            Add
          </Button>
        </Box>
      </FormControl>
      </form>
    </div>
  )
}

export default CategoryOffer