import React, { useState, useEffect } from "react";

import { BackspaceOutlined } from "@mui/icons-material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import OutlinedInput from "@mui/material/OutlinedInput";
import { styled } from "@mui/material/styles";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";

import Paper from "@mui/material/Paper";

import Select from "@mui/material/Select";
import axios from "../../axios";
import "./category.css";

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

const Category = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [categoryManagement, setCategoryManagement] = useState([{}]);
  useEffect(() => {
    try {
      axios.get("category/getCategory").then((resp) => {
        setCategoryManagement(resp.data.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, [setCategoryManagement]);

  const createSub = (e) => {
    e.preventDefault();

    setSubCategory("");
    try {
      const data = { selectedCategory, subCategory };

      if (selectedCategory.length > 0 && subCategory.length > 0) {
        axios
          .post("category/createCategory", data, {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then((resp) => {
            setCategoryManagement(resp.data.data);
          });
      } else {
        alert("Please Enter the Value");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteSub = (id, sub) => {
    if (window.confirm("Are you sure ? ")) {
      try {
        axios.delete(`category/deleteCategory/${id}/${sub}`).then((resp) => {
          setCategoryManagement(resp.data.data);
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const categoryOptions = ["Clothes", "Hijab", "Accessories"];

  return (
    <div className="category">
      <FormControl sx={{ m: 5, width: 300 }}>
        <InputLabel>Select MainCategory</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          onChange={(e) => {
            setSelectedCategory(e.target.value);
          }}
          input={<OutlinedInput label="Name" />}
          MenuProps={MenuProps}
        >
          {categoryOptions.map((category, index) => {
            return (
              <MenuItem key={index} value={category}>
                {category}
              </MenuItem>
            );
          })}
        </Select>
        <Box>
          <TextField
            style={{ marginTop: "10px" }}
            id="outlined-basic"
            value={subCategory}
            label="Enter SubCategory"
            variant="outlined"
            onChange={(e) => {
              setSubCategory(e.target.value);
            }}
          />
        </Box>
        <Box>
          <Button
            style={{ marginTop: "30px" }}
            variant="contained"
            onClick={createSub}
          >
            Add
          </Button>
        </Box>
      </FormControl>

      <TableContainer
        style={{ marginTop: "40px", marginLeft: "10px" }}
        component={Paper}
      >
        <Table sx={{ mr: 2, minWidth: 100 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Main Category</StyledTableCell>
              <StyledTableCell>SubCategory</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categoryManagement.map((cat, ind) => (
              <StyledTableRow
                key={ind}
                sx={{ m: 1, minWidth: 100 }}
                aria-label="customized table"
              >
                {/* <Table>{++ind}</td> */}
                <StyledTableCell>{cat.mainCategory}</StyledTableCell>

                <StyledTableCell>
                  {cat.subCategory?.map((sub, index) => (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "5px",
                      }}
                    >
                      <p key={index}>{sub}</p>
                      <span>
                        <BackspaceOutlined
                          fontSize="small"
                          onClick={() => {
                            deleteSub(cat._id, sub);
                          }}
                        />
                      </span>
                    </div>
                  ))}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Category;
