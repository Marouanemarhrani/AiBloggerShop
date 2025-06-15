import React, {useState, useEffect} from 'react';
import LayoutNF from '../../components/Layout/LayoutNF';
import AdminMenu from '../../components/Layout/AdminMenu';
import toast from 'react-hot-toast';
import axios from 'axios';
import {Select} from 'antd';
import { useNavigate } from 'react-router-dom';
import "./CreateBrand.css";

const {Option} = Select;

const CreateBrand = () => {
    const navigate =useNavigate();
    const [categories, setCategories] = useState([]);
    const [companies, setcompanies] = useState([]);
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [company, setcompany] = useState("");
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

    //get all companies
    const getAllcompany = async () => {
        try {
            const {data} = await axios.get(
                `${process.env.REACT_APP_API}/api/companies/get-company`
            );
            if(data?.success){
                setcompanies(data?.companies);
            };
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong in getting company');
        };
    };
    useEffect(() => {
        getAllCategory();
        getAllcompany();
    },[]);

    //create brand function
    const handleCreate = async (e) => {
        e.preventDefault()
        try {
            const brandData = new FormData();
            brandData.append("name", name);
            brandData.append("photo", photo);
            brandData.append("category", category);
            brandData.append("company", company);
            const {data} = axios.post(
                `${process.env.REACT_APP_API}/api/brands/create-brand`,
                    brandData
            );
            if(data?.success){
                toast.error(data?.message);
            }else{
                toast.success('Brand created successfully');
                navigate('/dashboard/admin/brands');
            }
        } catch (error) {
            console.log(error);
            toast.error('Somthing went wrong in create');
        };
    };
  return (
    <LayoutNF title={"Create Brand"}>
        <div className='cbrnd container-fluid'>
            <div className='cbrnd1 row'>
                <div className='cbrnd2 col-md-3'>
                    <AdminMenu />
                </div>
                <div className='cbrnd3 col-md-9'>
                    <h1>Create Brand</h1>
                    <div className='cbrnd4 m-1 w-75'>
                        <Select bordered={false}
                            placeholder="Select a category"
                            size="large"
                            showSearch
                            className='cbrnd5 form-select mb-3' 
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
                         <Select bordered={false}
                            placeholder="Select a company"
                            size="large"
                            showSearch
                            className='cbrnd5 form-select mb-3' 
                            onChange={(value) => {
                                setcompany(value);
                            }}
                        >
                            {companies?.map((c) => (
                                <Option key={c._id} value={c._id}>
                                    {c.name}
                                </Option>
                            ))}
                         </Select>
                         <div className='cbrnd6 mb-3'>
                            <label 
                                className='cbrnd7 btn btn-outline col-md-12'
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
                         <div className='cbrnd8 mb-3'>
                            {photo && (
                                <div className='cbrnd9 text-center'> 
                                    <img 
                                        src={URL.createObjectURL(photo)} 
                                        alt="brand-photo"
                                        height={'200px'} 
                                        className='img img-responsive'
                                    />
                                </div>
                            )}
                         </div>
                         <div className='cbrnd10 mb-3'>
                            <input 
                                type="text"
                                value ={name}
                                placeholder="write a name"
                                className="form-control"
                                onChange={(e) => setName(e.target.value)}
                            />
                         </div>
                        <div className='cbrnd17 mb-3'>
                            <button 
                                className='cbrnd18 btn '
                                onClick={handleCreate}
                            >
                                Create Brand
                            </button>
                        </div> 
                    </div>
                </div>
            </div>
        </div>
    </LayoutNF>
  );
};

export default CreateBrand;
