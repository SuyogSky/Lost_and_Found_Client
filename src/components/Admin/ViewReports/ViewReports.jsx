import React, { useState, useEffect } from "react";
import "./ViewReports.scss"
import { FiSearch } from "react-icons/fi"
import { BiPlusMedical } from "react-icons/bi"
import Axios from "axios"
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../../LoadingScreen/LoadingScreen";
import AdminNavBar from "../AdminNavBar/AdminNavbar";
const ip = require('../../../ip/ip')

const ViewReports = () => {
    const [loaded, setLoaded] = useState(false);
    const navigate = useNavigate();
    const [reports, setReports] = useState([]);
    useEffect(() => {
        const fetchItems = () =>{
            Axios.get(`${ip()}/api/admin/report`,{
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
                }
            }).then((response) =>{
                setReports(response.data.data);
            }).then(()=>{
                setLoaded(true)
            })
        }
        fetchItems();
    }, []);
    
    // const removeItem = (id, iName)=>{
    //     // eslint-disable-next-line no-restricted-globals
    //     const remove = confirm(`Are you sure you want to remove\nItem Name: ${iName}`)
    //     if (remove){
    //         Axios.delete(`${ip()}/api/admin`,{
    //             headers:{
    //                 'Content-Type':'application/json'
    //             },
    //             data:{
    //                 item_image: id
    //             }
    //         }).then((response) =>{
    //             window.location.href = "/admin-page"
    //         })
    //     }
    // }

    const [itemName, setItemName] = useState('')
    const searchReports = (e) => {
        e.preventDefault();
      
        const token = sessionStorage.getItem('token');
        const headers = {
          Authorization: `Bearer ${token}`,
        };
      
        Axios.post(
          `${ip()}/api/admin/searchR`,
          {
            reported_by: itemName,
          },
          { headers }
        )
          .then((response) => {
            setReports(response.data.data);
          })
          .then(() => {
            setLoaded(true);
          });
      };
      

    return loaded ? (
        <>
            <section className="reports-view">
                <AdminNavBar/>

                <section className="content">
                    <section className="admin-search">
                        <h1 className="app-name" style={{'cursor':'pointer'}} onClick={()=>navigate('/')}>Lost & <span>Found</span></h1>

                        <div className="middle">
                            <div className="entries">
                                <p>Show</p>
                                <input type="number" value="10" />
                                <p>Entries</p>
                            </div>
                            <form className="search-bar" onSubmit={(e)=>searchReports(e)}>
                                <button type="submit"><FiSearch/></button>
                                <input type="text" placeholder="Search..." onChange={(e)=>setItemName(e.target.value)}/>
                            </form>
                        </div>

                        <div className="right">
                            <p onClick={()=>navigate("/add-items-page")}><BiPlusMedical/> Add Items</p>
                        </div>
                    </section>

                    <section className="report-details">
                        <table>
                            <tr>
                                <th></th>
                                <th>Report By</th>
                                <th>Email</th>
                                <th>Item Name</th>
                                <th>Item Description</th>
                                <th>Report Date</th>
                                <th></th>
                            </tr>
                            
                            {reports
                                ?   reports.map((report)=>{
                                        return (
                                            <tr>
                                                <td></td>
                                                <td>{report.reported_by}</td>
                                                <td>{report.reported_by_email}</td>
                                                <td>{report.report_title}</td>
                                                <td className="description"><p>{report.report_description}</p></td>
                                                <td>{report.report_date}</td>
                                                <td></td>
                                            </tr>
                                        )
                                    })
                                : null}
                        </table>
                    </section>
                </section>
            </section>
        </>
    ) : (
        <LoadingScreen/>
    )
}

export default ViewReports