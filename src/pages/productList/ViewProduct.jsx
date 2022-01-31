import "./viewproduct.css";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

import { useState, useEffect } from "react";
import axios from "../../axios";
export default function ViewProduct() {
  const [product, setProduct] = useState([]);
  console.log(product);

  useEffect(() => {
    axios
      .get("product/getProduct")
      .then((resp) => {
        console.log(resp.data);
        setProduct(() => {
          return resp.data?.product.map((i) => {
            return { ...i, id: i._id };
          });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "name",
      headerName: "Product",
      width: 200,
    },
    { field: "price", headerName: "Price", width: 200 },
    {
      field: "quantity",
      headerName: "Quantity",
      width: 120,
    },
    {
      field: "mainCategory",
      headerName: "Category",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      
      renderCell: (params) => {
  console.log(params.row.id);
        return (
          <>
            <Link to={"/product/"+params.row.id}>
          
              <button className="productListEdit">Edit</button>
            </Link>
          
            <DeleteOutline
              className="productListDelete"
              // onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="productList" style={{ width: "100%", margin: "75px" }}>
      <Link to="/addproduct" style={{ textDecoration: "none" }}>
        <Button variant="contained" style={{ margin: "0 0 50px 10px" }}>
          ADD PRODUCT
        </Button>
      </Link>
      <DataGrid
        rows={product}
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
