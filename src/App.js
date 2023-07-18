import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"

import Items from "./components/Items/Items";
import AdminDashboard from "./components/Admin/AdminDashboard/AdminDashboard";
import AddItems from "./components/Admin/AddItems/AddItems";
import ClaimItemForm from "./components/ClaimItemForm/ClaimItemForm";
import ViewClaimed from "./components/Admin/ViewClaimed/ViewClaimed";
import ApprovedItems from "./components/Admin/ApprovedItems/ApprovedItems";
import RejectedItems from "./components/Admin/ViewRejected/RejectedItems";
import './components/Admin/AdminNavBar.scss'
import ViewReports from "./components/Admin/ViewReports/ViewReports";
import AdminLogin from "./components/Admin/AdminLogin/AdminLogin";

const App = () => {
  const win = sessionStorage;
  const token = win.getItem('token')
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Items/>}></Route>
        <Route path="/claim-item-form" element={<ClaimItemForm/>}></Route>

        {/* Admin page */}
        <Route path="/admin-page" element={token?<AdminDashboard/>:<AdminLogin/>}></Route>
        <Route path="/add-items-page" element={token?<AddItems/>:<AdminLogin/>}></Route>
        <Route path="/view-claimed-items" element={token?<ViewClaimed/>:<AdminLogin/>}></Route>
        <Route path="/view-approved-items" element={token?<ApprovedItems/>:<AdminLogin/>}></Route>
        <Route path="/view-rejected-items" element={token?<RejectedItems/>:<AdminLogin/>}></Route>
        <Route path="/view-reports" element={token?<ViewReports/>:<AdminLogin/>}></Route>

        <Route path="/admin-login" element={token?<AdminDashboard/>:<AdminLogin/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App