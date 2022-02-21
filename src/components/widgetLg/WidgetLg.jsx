import "./widgetLg.css";
import { useState, useEffect } from "react";
import axios from "../../../src/axios";

export default function WidgetLg() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    axios
      .get("/order/get-latest-orders")
      .then((resp) => {
        setTransactions(resp.data?.orders);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Latest transactions</h3>
      <table className="widgetLgTable">
        <tr className="widgetLgTr">
          <th className="widgetLgTh">Product</th>
          <th className="widgetLgTh">Date</th>
          <th className="widgetLgTh">Amount</th>
          <th className="widgetLgTh">Method</th>
        </tr>

        {transactions.length > 0 &&
          transactions.map((transc, index) => (
            <tr className="widgetLgTr" key={index}>
              <td className="widgetLgUser">
                <span className="widgetLgName">{transc.products.product}</span>
              </td>
              <td className="widgetLgDate">
                {new Date(transc.createdAt).toDateString()}
              </td>
              <td className="widgetLgAmount">{transc.products.price}</td>
              <td className="widgetLgAmount">{transc.method}</td>
            </tr>
          ))}
      </table>
    </div>
  );
}
