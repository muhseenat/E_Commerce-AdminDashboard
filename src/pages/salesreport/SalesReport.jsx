import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import axios from "../../axios";

function SalesReport() {
  const [report, setReport] = useState([]);
  const [toDate, setToDate] = useState();
  const [fromDate, setFromDate] = useState();
  const [hasValue, setHasValue] = useState(false);
  const [focus, setFocused] = useState(false);
  const onFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);

  useEffect(() => {
    axios
      .get("/order/get-sales-report")
      .then((resp) => {
        console.log(resp);

        setReport(() => {
          return resp.data?.report.map((i) => {
            return { ...i, id: Math.random() };
          });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const filterReport = () => {
    const payload = { fromDate, toDate };
    axios
      .post("/order/get-filter-report", payload)
      .then((resp) => {
        setReport(() => {
          return resp.data?.report.map((i) => {
            return { ...i, id: Math.random() };
          });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const dayReport = () => {
    axios
      .get("/order/get-daily-report")
      .then((resp) => {
        setReport(() => {
          return resp.data?.report.map((i) => {
            return { ...i, id: Math.random() };
          });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const weekReport = () => {
    axios
      .get("/order/get-weekly-report")
      .then((resp) => {
        setReport(() => {
          return resp.data?.report.map((i) => {
            return { ...i, id: Math.random() };
          });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const monthReport = () => {
    axios
      .get("/order/get-monthly-report")
      .then((resp) => {
        setReport(() => {
          return resp.data?.report.map((i) => {
            return { ...i, id: Math.random() };
          });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const yearlyReport = () => {
    axios
      .get("/order/get-yearly-report")
      .then((resp) => {
        setReport(() => {
          return resp.data?.report.map((i) => {
            return { ...i, id: Math.random() };
          });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 90,
      valueGetter: (params) => params.row.products.id,
    },
    {
      field: "products.product",
      headerName: "Item",
      width: 200,
      valueGetter: (params) => params.row.products.product,
    },
    {
      field: "products.quantity",
      headerName: "Quantity",
      width: 200,
      valueGetter: (params) => params.row.products.quantity,
    },

    {
      field: "method",
      headerName: "Pay-Method",
      width: 120,
    },
    {
      field: "products",
      headerName: "Total",
      width: 160,
      valueGetter: (params) => params.row.products.price,
    },
  ];

  return (
    <div style={{ width: "100%", margin: "75px", flex: 4 }}>
      <div>
        <Button
          variant="contained"
          style={{ height: "50px", marginRight: "10px" }}
          onClick={dayReport}
        >
          DAY
        </Button>
        <Button
          variant="contained"
          style={{ height: "50px", marginRight: "10px" }}
          onClick={weekReport}
        >
          Weekly
        </Button>
        <Button
          variant="contained"
          style={{ height: "50px", marginRight: "10px" }}
          onClick={monthReport}
        >
          Monthly
        </Button>
        <Button
          variant="contained"
          style={{ height: "50px", marginRight: "10px" }}
          onClick={yearlyReport}
        >
          Yearly
        </Button>
      </div>
      <div style={{ display: "flex" }}>
        <TextField
          style={{ margin: "50px" }}
          onFocus={onFocus}
          onBlur={onBlur}
          id="outlined-basic"
          required
          variant="outlined"
          type="date"
          label="From"
          type={hasValue || focus ? "datetime-local" : "text"}
          onChange={(e) => setFromDate(e.target.value)}
        />

        <TextField
          style={{ margin: "50px" }}
          onFocus={onFocus}
          onBlur={onBlur}
          id="outlined-basic"
          required
          variant="outlined"
          type="date"
          label="To"
          type={hasValue || focus ? "datetime-local" : "text"}
          onChange={(e) => setToDate(e.target.value)}
        />

        <Button
          variant="contained"
          style={{ height: "50px", marginTop: "50px" }}
          onClick={filterReport}
        >
          Send
        </Button>
      </div>
      <DataGrid
        rows={report}
        disableSelectionOnClick
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[20]}
        checkboxSelection
        autoHeight={true}
      />
      <p style={{ textAlign: "end" }}>
        {" "}
        TOTAL :{" "}
        {report?.reduce((a, b) => {
          return a + b.products.price;
        }, 0)}
      </p>
    </div>
  );
}

export default SalesReport;
