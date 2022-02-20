import "./widgetLg.css";
import {useState,useEffect} from 'react'
import axios from '../../../src/axios'

export default function WidgetLg() {

 const [transactions,setTransactions]=useState([])

  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };


   useEffect(()=>{
     axios.get('/order/get-latest-orders').then((resp)=>{
       console.log(resp);
       setTransactions(resp.data?.orders)
     }).catch((err)=>{
       console.log(err);
     })
   },[])


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

        {transactions.length>0 && transactions.map((transc,index)=>{
       
        <tr className="widgetLgTr" key={index}>
          <td className="widgetLgUser">
            
            <span className="widgetLgName">{transc.products.product}</span>
          </td>
          <td className="widgetLgDate">{new Date(transc.createdAt).toString()}</td>
          <td className="widgetLgAmount">{transc.products.price}</td>
          <td className="widgetLgAmount">{transc.method}okkkkk</td>
          <td className="widgetLgStatus">
            <Button type="Approved" />
          </td>
        </tr>
        })}
        {/* {order.map((ord, ind) => (
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
        <tr className="widgetLgTr">
          <td className="widgetLgUser">
            <img
              src="https://images.pexels.com/photos/8985159/pexels-photo-8985159.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
              alt=""
              className="widgetLgImg"
            />
            <span className="widgetLgName">Zahir</span>
          </td>
          <td className="widgetLgDate">2 Jun 2021</td>
          <td className="widgetLgAmount">$122.00</td>
          <td className="widgetLgStatus">
            <Button type="Declined" />
          </td>
        </tr>
        <tr className="widgetLgTr">
          <td className="widgetLgUser">
            <img
              src="https://images.pexels.com/photos/8985159/pexels-photo-8985159.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
              alt=""
              className="widgetLgImg"
            />
            <span className="widgetLgName">Zahir</span>
          </td>
          <td className="widgetLgDate">2 Jun 2021</td>
          <td className="widgetLgAmount">$122.00</td>
          <td className="widgetLgStatus">
            <Button type="Pending" />
          </td>
        </tr> */}
        {/* <tr className="widgetLgTr">
          <td className="widgetLgUser">
            <img
              src="https://images.pexels.com/photos/8985159/pexels-photo-8985159.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
              alt=""
              className="widgetLgImg"
            />
            <span className="widgetLgName">Zahir</span>
          </td>
          <td className="widgetLgDate">2 Jun 2021</td>
          <td className="widgetLgAmount">$122.00</td>
          <td className="widgetLgStatus">
            <Button type="Approved" />
          </td>
        </tr> */}
      </table>
    </div>
  );
}