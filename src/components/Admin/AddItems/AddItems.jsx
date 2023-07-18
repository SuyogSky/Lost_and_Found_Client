// showImage.src = ;
import React, { useState, useEffect } from "react";
import "./AddItems.scss"
import FormData from "form-data"
import Axios from "axios";
import { useNavigate } from "react-router-dom";
const ip = require('../../../ip/ip')

// import TextField from '@material-ui/core/TextField';
// import DatePicker from 'react-date-picker';

const AddItems = () => {
    const navigate = useNavigate()

    const [itemName, setItemName] = useState('');
    const [additionDate, setAdditionDate] = useState('');
    const [foundLocation, setFoundLocation] = useState('');
    const [foundBy, setFoundBy] = useState('');
    const [otherName, setOtherName] = useState('');
    const [file, setFile] = useState(null);
    const [path, setPath] = useState(null);

    const handleFile = (e) => {
        setFile(URL.createObjectURL(e.target.files[0]))
        setPath(e.target.files[0])
        document.querySelector(".text").style.display = "none";
    }

    const [loading, setLoading] = useState(false)
    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true)
        try {
            const formData = new FormData();
            formData.append('item_name', itemName);
            formData.append('found_date', additionDate);
            formData.append('found_location', foundLocation);
            formData.append('found_by', foundBy);
            formData.append('item_image', path);
            console.log(itemName)
            const response = await Axios.post(`${ip()}/api/admin/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
                },
            });

            if (response.data.success === 1) {
                setLoading(false)
                navigate('/admin-page')
                alert('Successfully Added')
            }
            else{
                setLoading(false)
            }

            // Handle the response
        } catch (error) {
            console.error(error);
            // Handle errors
        }
    };
    const selectOption = () => {
        const first = document.querySelector('#didi1')
        first.click()
    }
    useEffect(() => {
        selectOption()
    }, [])
    return (
        <section className="add-item-form">
            <form action="" onSubmit={(e) => handleSubmit(e)} method="POST" encType="multipart/form-data">
                <div className="fields">
                    <div className="left">
                        <div className="item-name">
                            <label for="item-name">Item Name<span>*</span></label><br />
                            <input type="text" id="item-name" name="item_name" onChange={(e) => { setItemName(e.target.value) }} required />
                        </div>

                        <div className="found-location">
                            <label for="found-location">Found Location<span>*</span></label><br />
                            <input type="text" id="found-location" name="found_location" onChange={(e) => { setFoundLocation(e.target.value) }} required />
                        </div>

                        <div className="found-by">
                            <label for="">Found By<span>*</span></label><br />
                            <div className="options">
                                <span>
                                    <input type="radio" id="didi1" name="found_by" value="didi1" onClick={(e) => { setFoundBy(e.target.value) }} />
                                    <label for="didi1">Suyog Shakya</label>
                                </span>

                                <span>
                                    <input type="radio" id="didi2" name="found_by" value="didi2" onClick={(e) => { setFoundBy(e.target.value) }} />
                                    <label for="didi2">Aaryan Jha</label>
                                </span>

                                <span>
                                    <input type="radio" id="didi3" name="found_by" value="didi3" onClick={(e) => { setFoundBy(e.target.value) }} />
                                    <label for="didi3">Ram Chandra Limbu</label>
                                </span>

                                <span>
                                    <input type="radio" id="didi4" name="found_by" value="didi4" onClick={(e) => { setFoundBy(e.target.value) }} />
                                    <label for="didi4">Geenesh Acharya</label>
                                </span>

                                <span className="other">
                                    <input type="radio" id="other" name="found_by" onClick={(e) => { setFoundBy(otherName) }} />
                                    <label for="other">Other: <input type="text" name="other_value" onChange={(e) => setOtherName(e.target.value)} /></label>
                                </span>
                            </div>
                        </div>
                    </div>


                    <div className="right">
                        <div className="found-date">
                            <label for="found-date">Found Date<span>*</span></label><br />
                            <input type="date" id="found-date" name="date" onChange={(e) => { setAdditionDate(e.target.value) }} required />
                        </div>

                        <div className="image">
                            <label for="item-image">Upload Image<span>*</span></label><br />
                            <label for="item-image">
                                <div className="img-upload-section">
                                    <div className="text">Drag and Drop or &nbsp;<span>Browse</span></div>
                                    {file ? <img src={file ? file : ""} classname="showImage" alt="Hello Nepal" width="100%" /> : ""}
                                </div>
                            </label>
                            <input type="file" id="item-image" name="item_image" onChange={(e) => {
                                handleFile(e)
                            }} required />
                        </div>
                        <div className="buttons">
                            {loading?<button className="loading-btn" type="button">Adding...</button>:<button type="submit"><span>+&nbsp;&nbsp;</span>Add New Item</button>}
                            <button type="button" onClick={()=>navigate('/admin-page')}><span>X</span> Cancel</button>
                        </div>
                    </div>
                </div>

            </form>
        </section>
    )
}

export default AddItems