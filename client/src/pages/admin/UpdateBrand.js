import React, {useState, useEffect} from 'react';
import LayoutNF from '../../components/Layout/LayoutNF';
import AdminMenu from '../../components/Layout/AdminMenu';
import toast from 'react-hot-toast';
import axios from 'axios';
import {Select} from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import "./UpdateBrand.css";

const {Option} = Select;

const UpdateBrand = () => {
    const navigate =useNavigate();
    const params = useParams();
    const [categories, setCategories] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [company, setCompany] = useState("");
    const [photo, setPhoto] = useState("");
    const [id, setId] = useState("");


    //get single brand
    const getSingleBrand= async () => {
        try {
            const {data} = await axios.get(
                `${process.env.REACT_APP_API}/api/brands/single-brand/${params.slug}`
            );
            setName(data.brand.name);
            setId(data.brand._id);
            setCompany(data.brand.company._id);
            setCategory(data.brand.category._id);
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong in getting single brand');
        }
    };
    useEffect(() => {
        getSingleBrand()
        //eslint-disable-next-line
    }, []);

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
    const getAllCompany = async () => {
        try {
            const {data} = await axios.get(
                `${process.env.REACT_APP_API}/api/companies/get-company`
            );
            if(data?.success){
                setCompanies(data?.companies);
            };
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong in getting company');
        };
    };

    useEffect(() => {
        getAllCategory();
        getAllCompany();
    },[]);

    //update brand function
    const handleUpdate = async (e) => {
        e.preventDefault()
        try {
            const brandData = new FormData();
            brandData.append("name", name);
            photo && brandData.append("photo", photo);
            brandData.append("category", category);
            brandData.append("company", company);
            const {data} = axios.put(
                `${process.env.REACT_APP_API}/api/brands/update-brand/${id}`,
                    brandData
            );
            if(data?.success){
                toast.error(data?.message);
            }else{
                toast.success('Brand updated successfully');
                navigate('/dashboard/admin/brands');
            }
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong in update');
        };
    };

    //delete brand 
    const handleDelete = async() => {
        try {
            let answer = window.prompt('Delete brand?');
            if(!answer) return;
            const {data} = await axios.delete(
                `${process.env.REACT_APP_API}/api/brands/delete-brand/${id}`
            );
            toast.success('Brand deleted successfully');
            navigate('/dashboard/admin/brands');
        } catch (error) {
            console.log(error);
            toast.error('Something wrong in delete');
        };
    };
  return (
    <LayoutNF title={"Update Brand"}>
        <div className='upbrnd container-fluid '>
            <div className='upbrnd1 row'>
                <div className='upbrnd2 col-md-3'>
                    <AdminMenu />
                </div>
                <div className='upbrnd3 col-md-9'>
                    <h1>Update Brand</h1>
                    <div className='upbrnd4 m-1 w-75'>
                        <Select bordered={false}
                            placeholder="Select a category"
                            size="large"
                            showSearch
                            className='upbrnd5 form-select mb-3' 
                            onChange={(value) => {
                                setCategory(value);
                            }}
                            value={category}
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
                            className='upbrnd5 form-select mb-3' 
                            onChange={(value) => {
                                setCompany(value);
                            }}
                            value={company}
                        >
                            {companies?.map((c) => (
                                <Option key={c._id} value={c._id}>
                                    {c.name}
                                </Option>
                            ))}
                         </Select>
                         <div className='upbrnd6 mb-3'>
                            <label 
                                className='upbrnd7 btn btn-outline col-md-12'
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
                         <div className='upbrnd8 mb-3'>
                            {photo ? (
                                <div className='upbrnd9 text-center'> 
                                    <img 
                                        src={URL.createObjectURL(photo)} 
                                        alt="brand-photo"
                                        height={'200px'} 
                                        className='upbrnd10 img img-responsive'
                                    />
                                </div>
                            ) : (
                            <div className='upbrnd11 text-center'> 
                                <img 
                                    src={`${process.env.REACT_APP_API}/api/brands/brand/photoURL/${id}`} 
                                    alt="brand-photo"
                                    height={'200px'} 
                                    className='upbrnd12 img img-responsive'
                                />
                            </div>)}
                         </div>
                         <div className='upbrnd13 mb-3'>
                            <input 
                                type="text"
                                value ={name}
                                placeholder="write a name"
                                className="upbrnd14 form-control"
                                onChange={(e) => setName(e.target.value)}
                            />
                         </div>
                        <div className='upbrnd20 mb-3'>
                            <button 
                                className='upbrnd21 btn btn'
                                onClick={handleUpdate}
                            >
                                Update Brand
                            </button>
                        </div> 
                        <div className='upbrnd22 mb-3'>
                            <button 
                                className='upbrnd23 btn btn'
                                onClick={handleDelete}
                            >
                                Delete Brand
                            </button>
                        </div> 
                    </div>
                </div>
            </div>
        </div>
    </LayoutNF>
  )
}

export default UpdateBrand;
