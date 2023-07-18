import React, { useState, useEffect } from "react";
import "./ApprovedItems.scss"
import { FiSearch, FiEdit } from "react-icons/fi"
import { RiDeleteBinLine } from "react-icons/ri"
import { BiPlusMedical } from "react-icons/bi";
import { TiTick } from "react-icons/ti"
import Axios from "axios"
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../../LoadingScreen/LoadingScreen";
import AdminNavBar from "../AdminNavBar/AdminNavbar";
const ip = require('../../../ip/ip')

const ApprovedItems = () => {
    const [loaded, setLoaded] = useState(false);
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    useEffect(() => {
        const fetchItems = () => {
          const token = sessionStorage.getItem('token');
          const headers = {
            Authorization: `Bearer ${token}`,
          };
      
          Axios.post(
            `${ip()}/api/admin/sort`,
            {
              status: 'approved',
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
        fetchItems();
      }, []);
      
    
    const removeItem = (id)=>{
        console.log(id)
        Axios.delete(`${ip()}/api/admin`,{
            headers:{
                'Content-Type':'application/json',
                Authorization: `Bearer ${sessionStorage.getItem('token')}`
            },
            data:{
                item_image: id
            }
        }).then((response) =>{
            window.location.href = "/view-approved-items"
        })
    }

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
            status: 'approved',
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
            <section className="approved-items">
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

                    <section className="approved-item-details">
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
                                                <td><span className="claim-status"><TiTick/> Approved</span></td>
                                                <td><span className="buttons"><FiEdit className="edit-btn"/><RiDeleteBinLine className="delete-btn" onClick={()=>removeItem(item.item_image)}/></span></td>
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

export default ApprovedItems