import React, { useState, useEffect } from "react";
import './Items.scss';
import { TbAdjustmentsHorizontal } from 'react-icons/tb'
import { BiSearchAlt2 } from 'react-icons/bi'
import { ImCross } from 'react-icons/im'
import Axios from 'axios';
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import ClaimItemForm from "../ClaimItemForm/ClaimItemForm";
const ip = require('../../ip/ip')


const Items = () => {
    const [items, setItems] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const fetchItems = () =>{
            Axios.get(`${ip()}/api/user`).then((response) =>{
                setItems(response.data.data);
                console.log(response.data.data)
            }).then(()=>{
                setLoaded(true)
            })
        }
        fetchItems();
    }, []);

    const [itemName, setItemName] = useState('')
    const searchItems = () =>{
        setLoaded(false)
        Axios.post(`${ip()}/api/user/search`, {
            item_name: itemName
        }).then((response) =>{
            setItems(response.data.data);
        }).then(()=>{
            setLoaded(true)
        })
    }


    const [claimItemId, setClaimItemId] = useState('')
    const [displayForm, setDisplayForm] = useState(false)

    return loaded?(
        <>
            <section className="items-display">
                <h1>Found Items</h1>
                <form className="bar" onSubmit={()=>searchItems()}>
                    <span><p>Filters</p><TbAdjustmentsHorizontal/></span>
                    <div className="search-bar">
                        <input type="text" placeholder="Search..." onChange={(e)=>setItemName(e.target.value)}/>
                        <button><BiSearchAlt2/>Search Items</button>
                    </div>
                </form>
                <div className="items">

                    {items
                        ?items.map((item)=>{
                            const imgPath = `${ip()}/item_image/${item.item_image}`
                            return (
                                <div className="item">
                                    <div className="item-image">
                                        <img src={imgPath} alt="" loading="lazy"/>
                                    </div>
                                    <div className="item-info">
                                        <h4>{item.item_name}</h4>
                                        <p>Found Date: {item.found_date}</p>
                                        <p>Found By: {item.found_by}</p>
                                    </div>
                                    <button onClick={()=>{
                                        setClaimItemId(item.item_id)
                                        setDisplayForm(true)
                                    }}>Claim Your Item</button>
                                </div>
                            )
                        })
                    : null}
                </div>
            </section>
            <div className={`claim-form ${displayForm?'active':''}`}>
                <ClaimItemForm item_id={claimItemId} display = {displayForm}/>
                <button type="button" className="cancle" onClick={()=>setDisplayForm(false)}><ImCross/></button>
            </div>
        </>
    ):(
        <LoadingScreen/>
    )
}

export default Items;