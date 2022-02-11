import "./searchuser.css";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@material-ui/icons";

import { Link ,useNavigate} from "react-router-dom";
import axios from "../../axios";
import { useState, useEffect } from "react";
import {Button ,Box,TextField,}from "@mui/material"
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
export default function SearchTable() {
  const [data, setData] = useState([]);
  const [search,setSearch] = useState("")
  const navigate = useNavigate()
  useEffect(() => {
    axios
      .get("users/getusers")
      .then((resp) => {
        console.log(resp.data);
        setData(() => {
          return resp.data?.users.map((i) => {
            return { ...i, id: i._id };
          });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  

  const handleBlock=(id)=>{
    axios.put(`users/block/${id}`).then((resp)=>{
      console.log(resp);
      navigate('/users')
    }).catch((err)=>{
      console.log(err);
    })
  }
  
  const columns = [
    { field: "_id", headerName: "ID", width: 90 },
    {
      field: "name",
      headerName: "User",
      width: 200,
     
    },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "status",
      headerName: "Status",
      width: 120,
    },
    
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.row.id}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleBlock(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="userList" style={{ width: '100%', margin: "75px"  }}>
     
          <Box>
          <TextField 
            style={{ margin: "0 0 25px" }}
            id="outlined-basic"
           
            label="search"
            variant="outlined"
            value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
            }}
            
          />
        <Link
                to={`/search/name/${
                  search.length == 0 ? "nofilter" : search
                }`}
              >
          <Button
            style={{ margin: "0 0 25px",height:"55px" }}
            variant="contained"
           
          >
          <SearchOutlinedIcon />
          </Button></Link>
        </Box>

      <DataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
}