import React, {useState, useEffect} from 'react';
import LayoutNF from '../../components/Layout/LayoutNF';
import AdminMenu from '../../components/Layout/AdminMenu';
import toast from 'react-hot-toast';
import axios from 'axios';
import {Select} from 'antd';
import { useNavigate } from 'react-router-dom';
import "./CreateCompany.css";

const {Option} = Select;

const CreateCompany = () => {
    const navigate =useNavigate();
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [photo, setPhoto] = useState("");

    //get all categories
    const getAllCategory = async () => {
        try {
            const {data} = await axios.get(
                `${process.env.REACT_APP_API}/api/categories/get-category`
            );
            if(data?.success){
                setCategories(data?.categories);
            };
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong in getting category');
        };
    };
    useEffect(() => {
        getAllCategory();
    },[]);

    //create company function
    const handleCreate = async (e) => {
        e.preventDefault()
        try {
            const companyData = new FormData();
            companyData.append("name", name);
            companyData.append("photo", photo);
            companyData.append("category", category);
            const {data} = axios.post(
                `${process.env.REACT_APP_API}/api/companies/create-company`,
                    companyData
            );
            if(data?.success){
                toast.error(data?.message);
            }else{
                toast.success('Company created successfully');
                navigate('/dashboard/admin/companies');
            }
        } catch (error) {
            console.log(error);
            toast.error('Somthing went wrong in create');
        };
    };
  return (
    <LayoutNF title={"Create Company"}>
        <div className='ccmp container-fluid'>
            <div className='ccmp1 row'>
                <div className='ccmp2 col-md-3'>
                    <AdminMenu />
                </div>
                <div className='ccmp3 col-md-9'>
                    <h1>Create Company</h1>
                    <div className='ccmp4 m-1 w-75'>
                        <Select bordered={false}
                            placeholder="Select a category"
                            size="large"
                            showSearch
                            className='ccmp5 form-select mb-3' 
                            onChange={(value) => {
                                setCategory(value);
                            }}
                        >
                            {categories?.map((c) => (
                                <Option key={c._id} value={c._id}>
                                    {c.name}
                                </Option>
                            ))}
                         </Select>
                         <div className='ccmp6 mb-3'>
                            <label 
                                className='ccmp7 btn btn-outline col-md-12'
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
                         <div className='ccmp8 mb-3'>
                            {photo && (
                                <div className='ccmp9 text-center'> 
                                    <img 
                                        src={URL.createObjectURL(photo)} 
                                        alt="company-photo"
                                        height={'200px'} 
                                        className='img img-responsive'
                                    />
                                </div>
                            )}
                         </div>
                         <div className='ccmp10 mb-3'>
                            <input 
                                type="text"
                                value ={name}
                                placeholder="write a name"
                                className="form-control"
                                onChange={(e) => setName(e.target.value)}
                            />
                         </div>
                        <div className='ccmp17 mb-3'>
                            <button 
                                className='ccmp18 btn '
                                onClick={handleCreate}
                            >
                                Create Company
                            </button>
                        </div> 
                    </div>
                </div>
            </div>
        </div>
    </LayoutNF>
  );
};

export default CreateCompany;
