import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./app.css";
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import Category from "./pages/category/Category";
import AddProduct from "./pages/addproduct/AddProduct";
import Error from "./pages/error/Error";
import EditProduct from "./pages/editpage/EditPage";
import ViewProduct from "./pages/productList/ViewProduct";
import Login from "./pages/login/Login";
import SearchTable from "./pages/searchuser/Searchuser";
import Order from "./pages/order/Order";
import CouponOffer from "./pages/offer/CouponOffer";
import ProductOffer from "./pages/offer/ProductOffer";
import CategoryOffer from "./pages/offer/CategoryOffer";

function App() {
  return (
    <Router>
 

      <Topbar />
      <div className="container">
        <Sidebar />
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/login" element={<Login />}></Route>
          <Route exact path="/users" element={<UserList />}></Route>
          <Route path="/user/:userId" element={<User />}></Route>
          <Route  path='/products' element={   <ViewProduct/>}></Route>
          <Route exact path="/product/:Id" element={<EditProduct />}></Route>
          <Route exact path="/addproduct" element={<AddProduct />}></Route>
          <Route exact path="/category" element={<Category />}></Route>
          <Route exact path="/order" element={<Order />}></Route>
          <Route exact path="/offer/coupon" element={<CouponOffer />}></Route>
          <Route exact path="/offer/product" element={<ProductOffer/>}></Route>
          <Route exact path="/offer/category" element={<CategoryOffer />}></Route>
          <Route exact path="/search/name/:search" element={<SearchTable/>}></Route>
          {/* <Route exact path="/editproduct" element={<EditProduct />}></Route> */}
         
          
          <Route path="*" element={<Error />}></Route>
        </Routes>
        
      </div>
    </Router>
  );
}

export default App;
