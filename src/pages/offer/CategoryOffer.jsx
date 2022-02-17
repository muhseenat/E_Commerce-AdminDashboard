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
  const [category, setCategory] = useState([]);
  const [discount, setDiscount] = useState();
  const [expdate, setExpDate] = useState();


  const createOffer=()=>{
    const payload={selectedCategory,discount}
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
      <FormControl sx={{ m: 5, width: 300 }}>
        <InputLabel>Select Product</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          onChange={(e) => {
            setSelectedCategory(e.target.value);
          }}
          input={<OutlinedInput label="Name" />}
          MenuProps={MenuProps}
        >
          {category.map((product, index) => {
            return (
              <MenuItem key={index} value={product}>
                {product}
              </MenuItem>
            );
          })}
        </Select>
        <Box>
          <TextField
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
        <TextField
        style={{ marginTop: "10px" }}
        id="outlined-basic"
      
        variant="outlined"
        type='date'
          value={expdate}
        onChange={(e)=>setExpDate(e.target.value)}

      />
        <Box>
          <Button
            style={{ marginTop: "30px" }}
            variant="contained"
            onClick={createOffer}
          >
            Add
          </Button>
        </Box>
      </FormControl>
    </div>
  )
}

export default CategoryOffer