import React, { useState } from 'react'
import './AdminLogin.scss'
import Axios from 'axios'
const ip = require('../../../ip/ip')


const AdminLogin = () => {
    const win = window.sessionStorage;

    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [errMsg, setErrMsg] = useState('')
    const adminLogin = (e) =>{
        e.preventDefault();
        setLoading(true)
        Axios.post(`${ip()}/api/admin/login`, {
            user_name: userName,
            password: password
        }).then((response) =>{
            setLoading(false)
            if(response.data.success === 1){
                alert(response.data.message)
                win.setItem('token', response.data.token)
                window.location.href = '/admin-page'
            }
            else{
                setErrMsg(response.data.message)
            }
        })
    }
    return (
        <section className="admin-login-form">
            <form action="" onSubmit={(e)=>adminLogin(e)}>
                <h1>Admin Login</h1>
                <input type="text" placeholder='User Name' onChange={(e)=>setUserName(e.target.value)}/>
                <input type="password" placeholder='Password' onChange={(e)=>setPassword(e.target.value)}/>
                {errMsg?<p className='error'>{errMsg}</p>:''}
                {loading?<button className='loading-btn' type='button'>Logging In...</button>:<input type="submit" value='Log In' />}
            </form>
        </section>
    )
}

export default AdminLogin