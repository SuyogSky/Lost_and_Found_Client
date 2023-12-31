import React, { useState } from "react";
import './ClaimItemForm.scss';
import ip from '../../ip/ip'
import { BsPerson } from 'react-icons/bs'
import { TfiEmail } from 'react-icons/tfi'
import { HiOutlineLockClosed } from 'react-icons/hi'

import Axios from "axios";

const ClaimItemForm = ({item_id}) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [otp, setOTP] = useState('')
    const [wrongEmail, setWrongEmail] = useState('')
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
            if(response.data.success === 1){
                setTimeout(()=>{
                    setReSend(true)
                }, 60000)
                setWrongEmail('')
            }
            else{
                setWrongEmail(response.data.message)
                setReSend(true)
            }
        })
    }
    
    const [errMsg, setErrMsg] = useState(false)
    const verifyOTP = (e)=>{
        e.preventDefault()
        setVerifying(true)
        Axios.post(`${ip()}/otp/verify`,{
            email: email,
            userName: name,
            otp: otp,
            item_id: item_id
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
        <section className={`claim-item-form`}>
            <div className="form-content">
                <form action="" onSubmit={(e)=>verifyOTP(e)}>
                    <h1>Please Verify Your Claim</h1>
                    
                    {/* <label htmlFor="name">Name:</label> */}
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
                    {wrongEmail?<p className="error">{wrongEmail}</p>:''}
                    {verifying?<button className="loading submit">Verifying</button>:<button className="submit" type="submit">Submit</button>}
                </form>
                <div className="banner">
                    <img src={require('../../assets/OTP.png')} alt=""/>
                </div>
            </div>
        </section>
    )
}

export default ClaimItemForm