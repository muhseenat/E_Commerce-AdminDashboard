
import './order.css';
import React, { useState, useEffect } from "react";
import {useNavigate } from 'react-router-dom'
import { styled } from "@mui/material/styles";


import MenuItem from "@mui/material/MenuItem";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";

import Paper from "@mui/material/Paper";

import Select from "@mui/material/Select";
import axios from "../../axios";

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

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function Order() {

  const [order, setOrders] = useState([]);
 const statusOptions=['placed','shipped','delivered']
 const navigate = useNavigate()
 useEffect(()=>{
    axios.get('/order/getorders').then((resp)=>{
     
      console.log(resp)
      setOrders(resp.data?.resp)
    }).catch((err)=>{
      console.log(err);
    })
 },[])
 const changeStatus =(e,orderId,prodId)=>{
 const data={status:e.target.value,orderId,prodId}
    axios.put('/order/changestatus',data).then((resp)=>{
     navigate('/order')
    //  window.location.reload();
    }).catch((err)=>{
      console.log(err)
    })
 }
 

  return (
    <div className='orderpage'>

<TableContainer
        style={{ marginTop: "40px", marginLeft: "10px" }}
        component={Paper}
      >
        <Table sx={{ mr: 2, minWidth: 100 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell>UserID</StyledTableCell>
              <StyledTableCell>Product Name</StyledTableCell>
              <StyledTableCell>Quantity</StyledTableCell>
              <StyledTableCell>Price</StyledTableCell>
              <StyledTableCell>Method</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {order.map((ord, ind) => (
              <StyledTableRow
                key={ind}
                sx={{ m: 1, minWidth: 100 }}
                aria-label="customized table"
              >
                <StyledTableCell>{ord._id}</StyledTableCell>
                <StyledTableCell>{ord.userId}</StyledTableCell>
                <StyledTableCell>{ord.products.product}</StyledTableCell>
                <StyledTableCell>{ord.products.quantity}</StyledTableCell>
                <StyledTableCell>{ord.products.price*ord.products.quantity}</StyledTableCell>
                <StyledTableCell>{ord.method}</StyledTableCell>

      
                <StyledTableCell>{ord.products.status === 'delivered'?'delivered':<Select labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          defaultValue={ord.products.status}
          onChange={(e) => {
            changeStatus(e,ord._id,ord.products.id);
          }}
  
          MenuProps={MenuProps}>
                {statusOptions.map((i,index)=> <MenuItem key={index}   value={i}>{i}</MenuItem>)}
                </Select>}
              </StyledTableCell>

              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    

    </div>
  )
}

export default Order