import React, { useState, useEffect } from "react";
import "./ViewClaimed.scss"
import { FiSearch, FiEdit } from "react-icons/fi"
import { TiTick } from "react-icons/ti"
import { ImCross } from "react-icons/im"
import { TbCircleDashed } from "react-icons/tb"
import { BiPlusMedical } from "react-icons/bi"
import Axios from "axios"
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../../LoadingScreen/LoadingScreen";
import AdminNavBar from "../AdminNavBar/AdminNavbar";
const ip = require('../../../ip/ip')

const ViewClaimed = () => {
    const [loaded, setLoaded] = useState(false);
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    useEffect(() => {
        const fetchItems = () => {
          Axios.post(`${ip()}/api/admin/sort`, {
            status: 'Pending',
          }, {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem('token')}`,
            },
          }).then((response) => {
            setItems(response.data.data);
            console.log(response.data.data);
          }).then(() => {
            setLoaded(true);
          });
        };
        fetchItems();
      }, []);
      
  

    const approveItem = (claim_id, item_id) => {
        const token = sessionStorage.getItem('token');
        const headers = {
          Authorization: `Bearer ${token}`,
        };
      
        Axios.post(
          `${ip()}/api/admin/approve`,
          {
            claim_id: claim_id,
            item_id: item_id,
          },
          { headers }
        )
          .then((response) => {
            window.location.href = "/view-claimed-items";
            console.log(response);
          });
      };
      

      const rejectItem = (claim_id, item_id) => {
        const token = sessionStorage.getItem('token');
        const headers = {
          Authorization: `Bearer ${token}`,
        };
      
        Axios.post(
          `${ip()}/api/admin/reject`,
          {
            claim_id: claim_id,
            item_id: item_id,
          },
          { headers }
        )
          .then((response) => {
            window.location.href = "/view-claimed-items";
            console.log(response);
          });
      };
      

    const [viewOptions, setViewOptions] = useState(false)


    const [itemName, setItemName] = useState('')
    const searchItems = (e) => {
        e.preventDefault();
        console.log('search');
        const token = sessionStorage.getItem('token');
        const headers = {
          Authorization: `Bearer ${token}`,
        };
      
        Axios.post(
          `${ip()}/api/admin/search`,
          {
            status: 'pending',
            item_name: itemName,
          },
          { headers }
        )
          .then((response) => {
            setItems(response.data.data);
            console.log(response.data.data);
          })
          .then(() => {
            setLoaded(true);
          });
      };
      

    return loaded ? (
        <>
        <section className="claimed-items">
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
                            <form className="search-bar" onSubmit={(e)=>searchItems(e)}>
                                <button type="submit"><FiSearch/></button>
                                <input type="text" placeholder="Search..." onChange={(e)=>setItemName(e.target.value)}/>
                            </form>
                        </div>

                        <div className="right">
                            <p onClick={()=>navigate("/add-items-page")}><BiPlusMedical/> Add Items</p>
                        </div>
                    </section>

                    <section className="claimed-item-details">
                        <table>
                            <tr>
                                <th></th>
                                <th>Item Name</th>
                                <th>Image</th>
                                <th>Claimed By</th>
                                <th>Email</th>
                                <th>Claimed Date</th>
                                <th>Status</th>
                                <th>Action</th>
                                <th></th>
                            </tr>
                            
                            {items
                                ?   items.map((item)=>{
                                        const imgPath = `${item.item_image}`
                                        return (
                                            <tr>
                                                <td></td>
                                                <td>{item.item_name}</td>
                                                <td><div className="image"><img src={imgPath} alt="" loading="lazy"/></div></td>
                                                <td>{item.claimed_by}</td>
                                                <td>{item.claimed_by_email}</td>
                                                <td>{item.claimed_date}</td>
                                                <td><span className="claim-status"><TbCircleDashed/>Pending</span></td>
                                                <td className="actions">
                                                    <span className="buttons">
                                                        <TiTick className="approve" onClick={()=>{approveItem(item.claim_id, item.item_id)}}/>
                                                        <ImCross className="reject" onClick={()=>{rejectItem(item.claim_id, item.item_id)}}/>
                                                    </span>
                                                </td>
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

export default ViewClaimed