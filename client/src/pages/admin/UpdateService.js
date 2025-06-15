import React, {useState, useEffect} from 'react';
import LayoutNF from '../../components/Layout/LayoutNF';
import AdminMenu from '../../components/Layout/AdminMenu';
import toast from 'react-hot-toast';
import axios from 'axios';
import {Select} from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import "./UpdateService.css";

const {Option} = Select;

const UpdateService = () => {
    const navigate =useNavigate();
    const params = useParams();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [duration, setDuration] = useState("");
    const [photo, setPhoto] = useState("");
    const [id, setId] = useState("");


    //get single service
    const getSingleService = async () => {
        try {
            const {data} = await axios.get(
                `${process.env.REACT_APP_API}/api/services/single-service/${params.slug}`
            );
            setName(data.service.name);
            setId(data.service._id);
            setDescription(data.service.description);
            setDuration(data.service.duration);
            setPrice(data.service.price)
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong in getting single service');
        }
    };
    useEffect(() => {
        getSingleService()
        //eslint-disable-next-line
    }, []);

    //update service function
    const handleUpdate = async (e) => {
        e.preventDefault()
        try {
            const serviceData = new FormData();
            serviceData.append("name", name);
            serviceData.append("description", description);
            serviceData.append("price", price);
            serviceData.append("duration", duration);
            photo && serviceData.append("photo", photo);
            const {data} = axios.put(
                `${process.env.REACT_APP_API}/api/services/update-service/${id}`,
                    serviceData
            );
            if(data?.success){
                toast.error(data?.message);
            }else{
                toast.success('service updated successfully');
                navigate('/dashboard/admin/services');
            }
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong in update');
        };
    };

    //delete service 
    const handleDelete = async() => {
        try {
            let answer = window.prompt('Delete service?');
            if(!answer) return;
            const {data} = await axios.delete(
                `${process.env.REACT_APP_API}/api/services/delete-service/${id}`
            );
            toast.success('Service deleted successfully');
            navigate('/dashboard/admin/services');
        } catch (error) {
            console.log(error);
            toast.error('Something wrong in delete');
        };
    };
  return (
    <LayoutNF title={"Update Service"}>
        <div className='upsrvcs container-fluid '>
            <div className='upsrvcs1 row'>
                <div className='upsrvcs2 col-md-3'>
                    <AdminMenu />
                </div>
                <div className='upsrvcs3 col-md-9'>
                    <h1>Update Service</h1>
                    <div className='upsrvcs4 m-1 w-75'>
                         <div className='upsrvcs6 mb-3'>
                            <label 
                                className='upsrvcs7 btn btn-outline col-md-12'
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
                         <div className='upsrvcs8 mb-3'>
                            {photo ? (
                                <div className='upsrvcs9 text-center'> 
                                    <img 
                                        src={URL.createObjectURL(photo)} 
                                        alt="service-photo"
                                        height={'200px'} 
                                        className='upsrvcs10 img img-responsive'
                                    />
                                </div>
                            ) : (
                            <div className='upsrvcs11 text-center'> 
                                <img 
                                    src={`${process.env.REACT_APP_API}/api/services/service/photoURL/${id}`} 
                                    alt="service-photo"
                                    height={'200px'} 
                                    className='upsrvcs12 img img-responsive'
                                />
                            </div>)}
                         </div>
                         <div className='upsrvcs13 mb-3'>
                            <input 
                                type="text"
                                value ={name}
                                placeholder="write a name"
                                className="upsrvcs14 form-control"
                                onChange={(e) => setName(e.target.value)}
                            />
                         </div>
                         <div className='upsrvcs15 mb-3'>
                            <textarea 
                                type="text"
                                value ={description}
                                placeholder="write a description"
                                className="upsrvcs16 form-control"
                                onChange={(e) => setDescription(e.target.value)}
                            />
                         </div>
                         <div className='upsrvcs17 mb-3'>
                            <input 
                                type="number"
                                value ={price}
                                placeholder="write a price"
                                className="upsrvcs18 form-control"
                                onChange={(e) => setPrice(e.target.value)}
                            />
                         </div>
                         <div className='upsrvcs19 mb-3'>
                            <input 
                                type="text"
                                value ={duration}
                                placeholder="write a duration"
                                className="form-control"
                                onChange={(e) => setDuration(e.target.value)}
                            />
                         </div>
                        <div className='upsrvcs20 mb-3'>
                            <button 
                                className='upsrvcs21 btn btn'
                                onClick={handleUpdate}
                            >
                                Update Service
                            </button>
                        </div> 
                        <div className='upsrvcs22 mb-3'>
                            <button 
                                className='upsrvcs23 btn btn'
                                onClick={handleDelete}
                            >
                                Delete Service
                            </button>
                        </div> 
                    </div>
                </div>
            </div>
        </div>
    </LayoutNF>
  )
}

export default UpdateService;
