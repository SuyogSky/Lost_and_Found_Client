import React, { useState } from "react";
import './ClaimItemForm.scss';
import ip from '../../ip/ip'
import Axios from "axios";

const ClaimItemForm = ({item_id}) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [otp, setOTP] = useState('')

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
            }
        })
    }


    return (
        <section className={`claim-item-form`}>
            <form action="" onSubmit={(e)=>verifyOTP(e)}>
                <input type="text" placeholder="Name" onChange={(e)=>setName(e.target.value)}/>
                <input type="email" placeholder="Email" onChange={(e)=>setEmail(e.target.value)}/>
                <div className="otp">
                    <input type="number" placeholder="OTP" onChange={(e)=>setOTP(e.target.value)}/>
                    {reSend?<button onClick={(e)=>sendOTP(e)}>Send OTP</button>:<button type="button" className="loading">Send OTP</button>}
                </div>
                {reSend?'':<p>Please wait 1 min to resend otp.</p>}
                
                {verifying?<button className="loading submit">Verifying</button>:<button className="submit" type="submit">Submit</button>}
            </form>
        </section>
    )
}

export default ClaimItemForm