import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import "./editpage.css";
import axios from "../../axios";
import Paper from "@mui/material/Paper";

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

function EditProduct() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [subCategory, setSubCategory] = useState([]);
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [size, setSize] = useState([]);
  const [quantity, setQuantity] = useState("");
  const [discount, setDiscount] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [img1, setimg1] = useState({});
  const [img2, setimg2] = useState({});
  const [img3, setimg3] = useState({});
  const [img4, setimg4] = useState({});
  const input1 = useRef();
  const input2 = useRef();
  const input3 = useRef();
  const input4 = useRef();
 const location= useLocation();
 const id = location.pathname.split('/')[2]
console.log(id);
  useEffect(() => {
    getProductById();
  }, []);

  const getProductById = () => {
    axios
      .get(`product/getproductbyid/${id}`)
      .then((resp) => {
        console.log(resp);
        const product=resp.data.product
        console.log(product);
        setProductName(product.name);
        setSelectedCategory(product.mainCategory);
        setSelectedSubCategory(product.subCategory);
        setDescription(product.description);
        setPrice(product.price);
        setSize(product.size[0]);
        setQuantity(product.quantity);
        setDiscount(product.discount);
        setimg1(product.img1[0].url)
        setimg2(product.img2[0].url)
        setimg3(product.img3[0].url)
        setimg4(product.img4[0].url)
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getSubCategory = (mainCat) => {
    setSelectedCategory(mainCat);
    axios
      .get(`category/getSubCategory?main=${mainCat}`)
      .then((resp) => {
        console.log(resp.data.data);
        setSubCategory(resp.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const triggerInput = (target) => {
    console.log(target.current);
    target.current.click();
  };

  const selectimg1 = (e) => {
    if (e.target.files.length > 0) {
      console.log("not happening anything....");
      console.log(e.target.files);
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      console.log({ file, url });
      setimg1({ file, url });
    }
  };

  const selectimg2 = (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      setimg2({ file, url });
    }
  };
  const selectimg3 = (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      setimg3({ file, url });
    }
  };
  const selectimg4 = (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      setimg4({ file, url });
    }
  };

  

  const updateproduct = () => {
    const data = {
      productName,
      selectedCategory,
      selectedSubCategory,
      description,
      price,
      size,
      quantity,
      discount,
    };
    const formData = new FormData();
    formData.append("img", img1.file);
    formData.append("img", img2.file);
    formData.append("img", img3.file);
    formData.append("img", img4.file);

    formData.append("data", JSON.stringify(data));
    console.log(formData);
    axios
      .put(`product/updateproduct/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((resp) => {
        console.log(resp.data);
        alert("Successfully addedd");
        setProductName("");
        setSelectedCategory("");
        setSelectedSubCategory("");
        setDescription("");
        setPrice("");
        setSize("");
        setQuantity("");
        setDiscount("");
        setimg1({});
        setimg2({});
        setimg3({});
        setimg4({});
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const sizeOptions = ["S", "M", "L"];
  const categoryOptions = ["Clothes", "Hijab", "Accessories"];
  return (
    <div className="editpage">
      <Paper style={{ marginLeft: "10px", marginRight: "50px" }}>
        <Box>
          <TextField
            style={{ marginTop: "10px", marginLeft: "10px" }}
            id="outlined-basic"
            value={productName}
            onChange={(e) => {
              setProductName(e.target.value);
            }}
            label="Product Name"
            variant="outlined"
          />
          <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel>Select MainCategory</InputLabel>
            <Select
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              onChange={(e) => {
                getSubCategory(e.target.value);
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
          </FormControl>
          <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel>SubCategory</InputLabel>
            <Select
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              disabled={subCategory.length > 0 ? false : true}
              input={<OutlinedInput label="Name" />}
              MenuProps={MenuProps}
              onChange={(e) => {
                setSelectedSubCategory(e.target.value);
              }}
            >
              {subCategory.map((category, index) => {
                return (
                  <MenuItem key={index} value={category}>
                    {category}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Box>
        <Box>
          <TextField
            style={{ marginTop: "10px", marginLeft: "10px" }}
            id="outlined-basic"
            label="Price"
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);
            }}
            variant="outlined"
          />
          <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel>Size</InputLabel>
            <Select
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              onChange={(e) => {
                setSize(e.target.value);
              }}
              input={<OutlinedInput label="Name" />}
              MenuProps={MenuProps}
            >
              {sizeOptions.map((siz, index) => {
                return (
                  <MenuItem key={index} value={siz}>
                    {siz}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Box>

        <Box>
          <TextField
            label={'margin="normal"'}
            style={{ marginTop: "10px", marginLeft: "10px" }}
            id="outlined-basic"
            value={quantity}
            onChange={(e) => {
              setQuantity(e.target.value);
            }}
            label="Quantity"
            variant="outlined"
          />
          <TextField
            label={'margin="normal"'}
            style={{ marginTop: "10px", marginLeft: "10px" }}
            id="outlined-basic"
            label="Discount"
            value={discount}
            onChange={(e) => {
              setDiscount(e.target.value);
            }}
            variant="outlined"
          />
        </Box>

        <Box>
          <TextField
            style={{ marginTop: "10px", marginLeft: "10px", width: 500 }}
            id="outlined-basic"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            label="Description"
            variant="outlined"
          />
        </Box>
        <Box>
          <div
            style={{
              display: "flex",
              margin: "10px",
              justifyContent: "space-around",
            }}
          >
            <div>
              <img 
                onClick={() => {
                  triggerInput(input1);
                }}
                style={{ height: "150px" }}
                src={img1.url || img1}
              />
              <input
                hidden
                ref={input1}
                type="file"
                name="file1"
                onChange={selectimg1}
              />
            </div>
            <div>
              <img
                onClick={() => {
                  triggerInput(input2);
                }}
                style={{ height: "150px" }}
                src={img2.url|| img2}
              />
              <input
                hidden
                ref={input2}
                type="file"
                name="file2"
                onChange={selectimg2}
              />
            </div>
            <div>
              <img
                onClick={() => {
                  triggerInput(input3);
                }}
                style={{ height: "150px" }}
                src={img3.url||img3}
              />
              <input
                hidden
                ref={input3}
                type="file"
                name="file3"
                onChange={selectimg3}
              />
            </div>
            <div>
              <img
                onClick={() => {
                  triggerInput(input4);
                }}
                style={{ height: "150px" }}
                src={img4.url || img4}
              />
              <input
                hidden
                ref={input4}
                type="file"
                name="file4"
                onChange={selectimg4}
              />
            </div>
          </div>
        </Box>

        <Box>
          <Button
            onClick={updateproduct}
            style={{ margin: "20px 20px 15px 10px" }}
            variant="contained"
          >
            Update
          </Button>
        </Box>
      </Paper>
    </div>
  );
}

export default EditProduct;
