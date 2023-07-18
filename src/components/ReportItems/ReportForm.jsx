import React, { useState } from "react";
import './ReportForm.scss';
import ip from '../../ip/ip'
import { BsPerson } from 'react-icons/bs'
import { TfiEmail } from 'react-icons/tfi'
import { HiOutlineLockClosed } from 'react-icons/hi'

import Axios from "axios";

const ReportForm = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [otp, setOTP] = useState('')
    
    const [itemName, setItemName] = useState('')
    const [lostLocation, setLostLocation] = useState('')
    const [description, setDescription] = useState('')

    const[verifying, setVerifying] = useState(false)
    const[reSend, setReSend] = useState(true)

    const sendOTP = (e)=>{
        e.preventDefault()
        setReSend(false)
        console.log('hihi')
        Axios.post(`${ip()}/otp/send`,{
            email: email,
            name: name
        }).then((response) =>{
            console.log(response)
            setTimeout(()=>{
                setReSend(true)
            }, 60000)
        })
    }
    
    const [errMsg, setErrMsg] = useState(false)
    const verifyOTP = (e)=>{
        e.preventDefault()
        setVerifying(true)
        Axios.post(`${ip()}/api/user/report`,{
            name: name,
            email: email,
            otp: otp,
            title: itemName,
            lost_location: lostLocation,
            description: description
            // item_id: item_id
        }).then((response) =>{
            setVerifying(false)
            console.log(response.data)
            if (response.data.success === 1){
                window.location.href = '/'
                setErrMsg(false)
            }
            else{
                setErrMsg(response.data.message)
            }
        })
    }


    return (
        <section className={`report-item-form`}>
            <form action="" onSubmit={(e)=>verifyOTP(e)}>
                <div className="user-details">
                    <h2>Enter Your Details.</h2>
                    
                    <div className="name">
                        <BsPerson/>
                        <input type="text" placeholder="Name" id="name" onChange={(e)=>setName(e.target.value)} required/>
                    </div>
                    <div className="email">
                        <TfiEmail/>
                        <input type="email" placeholder="Email" id="email" onChange={(e)=>setEmail(e.target.value)} required/>
                    </div>
                    <div className="otp-div">
                        <HiOutlineLockClosed/>
                        <div className="otp">
                            <input type="number" id="otp" placeholder="OTP" onChange={(e)=>setOTP(e.target.value)} required/>
                            {reSend?<button onClick={(e)=>sendOTP(e)}>Send OTP</button>:<button type="button" className="loading">Send OTP</button>}
                        </div>
                    </div>
                    {reSend?'':<p>Please wait 1 min to resend otp.</p>}
                    {errMsg?<p className="error">{errMsg}</p>:''}
                    {verifying?<button className="loading submit submit1">Verifying</button>:<button className="submit submit1" type="submit">Submit</button>}
                </div>

                <div className="item-details">
                    <h2>Item Details</h2>
                    <div className="item-name">
                        <input type="text" placeholder="Item Name" id="name" onChange={(e)=>setItemName(e.target.value)} required/>
                    </div>
                    <div className="lost-location">
                        <input type="text" placeholder="Lost Location" id="location" onChange={(e)=>setLostLocation(e.target.value)} required/>
                    </div>
                    <div className="description">
                        <textarea placeholder="Item Description" id="description" onChange={(e)=>setDescription(e.target.value)} required maxlength='200'></textarea>
                    </div>
                    {verifying?<button className="loading submit submit2">Verifying</button>:<button className="submit submit2" type="submit">Submit</button>}
                </div>
            </form>
        </section>
    )
}

export default ReportForm