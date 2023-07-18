import React from 'react'
import './AdminNavBar.scss'

import { AiOutlineAppstoreAdd } from 'react-icons/ai'
import { BiLogOutCircle } from 'react-icons/bi'
import { PiCircleDashedBold } from 'react-icons/pi'
import { TiTick } from 'react-icons/ti'
import { RxCross2 } from 'react-icons/rx'
import { TbReportSearch } from 'react-icons/tb'
import { useNavigate } from 'react-router-dom'

const AdminNavBar = () => {
    const navigate = useNavigate()

    const logout = () => {
        console.log(sessionStorage.getItem('token'))
        sessionStorage.removeItem('token');
        console.log(sessionStorage.getItem('token'))
        window.location.href = '/'
    }
    return(
        <>
            <header className="admin-nav">
                <h1>Admin</h1>
                <ul>
                    <li onClick={()=>navigate("/admin-page")}><AiOutlineAppstoreAdd/>Unclaimed<br />Items</li>
                    <li onClick={()=>navigate("/view-claimed-items")}><PiCircleDashedBold/>Claims</li>
                    <li onClick={()=>navigate("/view-approved-items")}><TiTick/>Approved<br />Items</li>
                    <li onClick={()=>navigate("/view-rejected-items")}><RxCross2/>Rejected<br />Items</li>
                </ul>
                <button className='logout' onClick={()=>logout()}><BiLogOutCircle/>Log Out</button>
            </header>
            <div className="view-reports" onClick={()=>navigate('/view-reports')}>
                <TbReportSearch/>
                <p>View Reports</p>
            </div>
        </>
    )
}

export default AdminNavBar