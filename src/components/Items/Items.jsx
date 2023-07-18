import React, { useState, useEffect } from "react";
import './Items.scss';
import { TbAdjustmentsHorizontal, TbReportSearch } from 'react-icons/tb'
import { BiSearchAlt2 } from 'react-icons/bi'
import { ImCross } from 'react-icons/im'
import Axios from 'axios';
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import ClaimItemForm from "../ClaimItemForm/ClaimItemForm";
import ReportForm from "../ReportItems/ReportForm";
const ip = require('../../ip/ip')


const Items = () => {
    const [items, setItems] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const fetchItems = () =>{
            setLoaded(true) 
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


    const filterClicked = () => {
        const options = document.querySelector('.items-display .bar .filter .options')
        options.classList.toggle('active')
    }

    const orderByDate = () => {
        setLoaded(false)
        Axios.get(`${ip()}/api/user/d`, {
        }).then((response) =>{
            setItems(response.data.data);
        }).then(()=>{
            setLoaded(true)
        })
    }

    const orderByName = () => {
        setLoaded(false)
        Axios.get(`${ip()}/api/user/n`, {
        }).then((response) =>{
            setItems(response.data.data);
        }).then(()=>{
            setLoaded(true)
        })
    }


    const [claimItemId, setClaimItemId] = useState('')
    const [displayForm, setDisplayForm] = useState(false)
    const [displayReportForm, setDisplayReportForm] = useState(false)
    return loaded?(
        <>
            <section className="items-display">
                <h1>Found Items</h1>
                <form className="bar" onSubmit={()=>searchItems()}>
                    <div className="filter">
                        <div className="button" onClick={()=>filterClicked()}>
                            <p>Filters</p><TbAdjustmentsHorizontal/>
                        </div>
                        <span className={`options`}>
                            <p onClick={() => orderByDate()}>By Date</p>
                            <p onClick={() => orderByName()}>By Name</p>
                        </span>
                    </div>
                    <div className="search-bar">
                        <input type="text" placeholder="Search..." onChange={(e)=>setItemName(e.target.value)}/>
                        <button><BiSearchAlt2/><p>Search Items</p></button>
                    </div>
                </form>
                <div className="items">

                    {items
                        ?items.map((item)=>{
                            // const imgPath = `${ip()}/item_image/${item.item_image}`
                            const imgPath = item.item_image
                            return (
                                <div className="item">
                                    <div className="item-image" style={{'background-image':`url(${imgPath})`}}>
                                        {/* <img src={imgPath} alt="" loading="lazy"/> */}
                                    </div>
                                    <div className="item-info">
                                        <h4>{item.item_name}</h4>
                                        <p><span>Found Date:</span> {item.found_date}</p>
                                        <p><span>Found Location:</span> {item.found_location}</p>
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

            <div className="report-items" onClick={()=>setDisplayReportForm(true)}>
                <TbReportSearch/>
                <p>Report Items</p>
            </div>

            <div className={`report-form ${displayReportForm?'active':''}`}>
                <ReportForm display = {displayReportForm}/>
                <button type="button" className="cancle" onClick={()=>setDisplayReportForm(false)}><ImCross/></button>
            </div>
        </>
    ):(
        <LoadingScreen/>
    )
}

export default Items;