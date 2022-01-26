import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./app.css";
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserList from "./pages/home/userList/UserList";
import User from "./pages/home/user/User";
function App() {
  return (
    <Router>
      <Topbar />
      <div className="container">
        <Sidebar />
        <Routes>
        <Route exact path='/' element={   <Home />}></Route>
        <Route  path='/users' element={   <UserList/>}></Route>
        <Route  path='/user/:id' element={   <User/>}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
