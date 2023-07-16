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

const App = () => {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Items/>}></Route>
        <Route path="/claim-item-form" element={<ClaimItemForm/>}></Route>

        <Route path="/admin-page" element={<AdminDashboard/>}></Route>
        <Route path="/add-items-page" element={<AddItems/>}></Route>
        <Route path="/view-claimed-items" element={<ViewClaimed/>}></Route>
        <Route path="/view-approved-items" element={<ApprovedItems/>}></Route>
        <Route path="/view-rejected-items" element={<RejectedItems/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App