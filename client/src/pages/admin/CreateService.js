import React, {useState, useEffect} from 'react';
import LayoutNF from '../../components/Layout/LayoutNF';
import AdminMenu from '../../components/Layout/AdminMenu';
import toast from 'react-hot-toast';
import axios from 'axios';
import {Select} from 'antd';
import { useNavigate } from 'react-router-dom';
import "./CreateService.css";

const CreateService = () => {
    const navigate =useNavigate();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [duration, setDuration] = useState("");
    const [photo, setPhoto] = useState("");

    //create Service function
    const handleCreate = async (e) => {
        e.preventDefault()
        try {
            const ServiceData = new FormData();
            ServiceData.append("name", name);
            ServiceData.append("description", description);
            ServiceData.append("price", price);
            ServiceData.append("duration", duration);
            ServiceData.append("photo", photo);
            const {data} = axios.post(
                `${process.env.REACT_APP_API}/api/Services/create-service`,
                    ServiceData
            );
            if(data?.success){
                toast.error('Error in creating');
            }else{
                toast.success('Service created successfully');
                navigate('/dashboard/admin/services');
            };
        } catch (error) {
            console.log(error);
            toast.error('Somthing went wrong in create service');
        };
    };
  return (
    <LayoutNF title={"Create Service"}>
        <div className='csrvcs container-fluid'>
            <div className='csrvcs1 row'>
                <div className='csrvcs2 col-md-3'>
                    <AdminMenu />
                </div>
                <div className='csrvcs3 col-md-9'>
                    <h1>Create Service</h1>
                    <div className='csrvcs4 m-1 w-75'>
                         <div className='csrvcs6 mb-3'>
                            <label 
                                className='csrvcs7 btn btn-outline col-md-12'
                            >
                                {photo ? photo.name : "upload Photo" }
                                <input 
                                    type="file" 
                                    name="photo"
                                    accept="image/*"
                                    onChange={(e) => setPhoto(e.target.files[0])} 
                                    hidden 
                                />
                            </label>
                         </div>
                         <div className='csrvcs8 mb-3'>
                            {photo && (
                                <div className='csrvcs9 text-center'> 
                                    <img 
                                        src={URL.createObjectURL(photo)} 
                                        alt="Service-photo"
                                        height={'200px'} 
                                        className='img img-responsive'
                                    />
                                </div>
                            )}
                         </div>
                         <div className='csrvcs10 mb-3'>
                            <input 
                                type="text"
                                value ={name}
                                placeholder="write a name"
                                className="form-control"
                                onChange={(e) => setName(e.target.value)}
                            />
                         </div>
                         <div className='csrvcs11 mb-3'>
                            <textarea 
                                type="text"
                                value ={description}
                                placeholder="write a description"
                                className="csrvcs12 form-control"
                                onChange={(e) => setDescription(e.target.value)}
                            />
                         </div>
                         <div className='csrvcs13 mb-3'>
                            <input 
                                type="number"
                                value ={price}
                                placeholder="write a price"
                                className="csrvcs14 form-control"
                                onChange={(e) => setPrice(e.target.value)}
                            />
                         </div>
                         <div className='csrvcs15 mb-3'>
                            <input 
                                type="text"
                                value ={duration}
                                placeholder="write a duration"
                                className="csrvcs16 form-control"
                                onChange={(e) => setDuration(e.target.value)}
                            />
                         </div>
                        <div className='csrvcs17 mb-3'>
                            <button 
                                className='csrvcs18 btn'
                                onClick={handleCreate}
                            >
                                Create Service
                            </button>
                        </div> 
                    </div>
                </div>
            </div>
        </div>
    </LayoutNF>
  );
};

export default CreateService;
