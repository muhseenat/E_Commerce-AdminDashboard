import React, { useState, useEffect } from 'react'
import { DataGrid } from "@mui/x-data-grid";

// import { Link, useNavigate} from "react-router-dom";
import TextField from "@mui/material/TextField";
import axios from "../../axios";

function SalesReport() {
  const [report,setReport]=useState([])
  const [toDate,setToDate]=useState()
  const [fromDate,setFromDate]=useState()
  const [hasValue, setHasValue] = useState(false);
  const [focus, setFocused] = useState(false);
  const onFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);

  useEffect(()=>{
    axios.get('/order/get-sales-report').then((resp)=>{
      console.log(resp);
   
    setReport(()=>{
      return resp.data?.report.map((i)=>{
        return {...i,id:i._id};
      })
    })
  }).catch((err)=>{
    console.log(err);
  })
  },[])
   
     const columns = [
    { field: "id", headerName: "ID", width: 90,
    valueGetter: () =>Date.now()
  },
   
    {
      field: "products",
      headerName: "Quantity",
      width: 200,
    },
    {
      field:"Item",
       headerName: "Item",
      width: 200,
    },
    {
      field: "method",
      headerName: "Pay-Method",
      width: 120,
    },
    {
      field: "products*quantity*products.price",
      headerName: "Total",
      width: 160,
    },
   
  ];

  return (
    <div style={{ width: "100%", margin: "75px" ,flex:4}}>
    <div >
       
       <TextField
        style={{ margin: "50px" }}
        onFocus={onFocus}
        onBlur={onBlur}
        id="outlined-basic"
        required
        variant="outlined"
        type='date'
        label="From"
        type={hasValue || focus ? "datetime-local" : "text"}
        onChange={(e)=>setFromDate(e.target.value)}

      />
      
       <TextField
       style={{ margin: "50px" }}
       onFocus={onFocus}
        onBlur={onBlur}
        id="outlined-basic"
        required
        variant="outlined"
        type='date'
        label="To"
        type={hasValue || focus ? "datetime-local" : "text"}
        onChange={(e)=>setToDate(e.target.value)}

      />
    </div>
      <DataGrid
        rows={report}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        rowsPerPageOptions={[8]}
        checkboxSelection
        autoHeight={true}
      />
    </div>
  );
  
}

export default SalesReport