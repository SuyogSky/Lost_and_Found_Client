import React, { useState, useEffect } from "react";
import "./ApprovedItems.scss"
import { FiSearch, FiEdit } from "react-icons/fi"
import { RiDeleteBinLine } from "react-icons/ri"
import { TiTick } from "react-icons/ti"
import Axios from "axios"
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../../LoadingScreen/LoadingScreen";
const ip = require('../../../ip/ip')

const ApprovedItems = () => {
    const [loaded, setLoaded] = useState(false);
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    useEffect(() => {
        const fetchItems = () =>{
            Axios.post(`${ip()}/api/admin/sort`,{
                status: 'approved'
            }).then((response) =>{
                setItems(response.data.data);
                console.log(response.data.data)
            }).then(()=>{
                setLoaded(true)
            })
        }
        fetchItems();
    }, []);
    
    const removeItem = (id)=>{
        console.log(id)
        Axios.delete(`${ip()}/api/admin`,{
            headers:{
                'Content-Type':'application/json'
            },
            data:{
                item_image: id
            }
        }).then((response) =>{
            window.location.href = "/admin-page"
        })
    }

    const [itemName, setItemName] = useState('')
    const searchItems = (e) =>{
        e.preventDefault()
        console.log('search')
        Axios.post(`${ip()}/api/admin/search`,{
            status: 'approved',
            item_name: itemName
        }).then((response) =>{
            setItems(response.data.data);
            console.log(response.data.data)
        }).then(()=>{
            setLoaded(true)
        })
    }

    return loaded ? (
        <>
            <header className="admin-search">
                <div className="left">
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
                    <p onClick={()=>navigate("/add-items-page")}><b>+</b> Add Items</p>
                    <p onClick={()=>navigate("/admin-page")}>Unclaimed Items</p>
                    <p onClick={()=>navigate("/view-claimed-items")}>Claimed Items</p>
                    <p onClick={()=>navigate("/view-approved-items")}>Approved Items</p>
                    <p onClick={()=>navigate("/view-rejected-items")}>Rejected Items</p>
                </div>
            </header>

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
                                const imgPath = `${ip()}/item_image/${item.item_image}`
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
        </>
    ) : (
        <LoadingScreen/>
    )
}

export default ApprovedItems