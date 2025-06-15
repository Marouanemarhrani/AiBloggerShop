import React, {useState, useEffect} from 'react';
import LayoutNF from '../../components/Layout/LayoutNF';
import AdminMenu from '../../components/Layout/AdminMenu';
import toast from 'react-hot-toast';
import axios from 'axios';
import {Select} from 'antd';
import { useNavigate } from 'react-router-dom';
import "./CreateProduct.css";

const {Option} = Select;

const CreateProduct = () => {
    const navigate =useNavigate();
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [company, setCompany] = useState("");
    const [brand, setBrand] = useState("");
    const [quantity, setQuantity] = useState("");
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

    //get all brands
    const getAllBrand = async () => {
        try {
            const {data} = await axios.get(
                `${process.env.REACT_APP_API}/api/brands/get-brand`
            );
            if(data?.success){
                setBrands(data?.brands);
            };
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong in getting brand');
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
        getAllCompany();
        getAllCategory();
        getAllBrand();
    },[]);

    //create product function
    const handleCreate = async (e) => {
        e.preventDefault()
        try {
            const productData = new FormData();
            productData.append("name", name);
            productData.append("description", description);
            productData.append("price", price);
            productData.append("quantity", quantity);
            productData.append("photo", photo);
            productData.append("brand", brand);
            productData.append("category", category);
            productData.append("company", company);
            const {data} = axios.post(
                `${process.env.REACT_APP_API}/api/products/product`,
                    productData
            );
            if(data?.success){
                toast.error(data?.message);
            }else{
                toast.success('Product created successfully');
                navigate('/dashboard/admin/products');
            }
        } catch (error) {
            console.log(error);
            toast.error('Somthing went wrong in create');
        };
    };
  return (
    <LayoutNF title={"Create Product"}>
        <div className='cpdct container-fluid'>
            <div className='cpdct1 row'>
                <div className='cpdct2 col-md-3'>
                    <AdminMenu />
                </div>
                <div className='cpdct3 col-md-9'>
                    <h1>Create Product</h1>
                    <div className='cpdct4 m-1 w-75'>
                        <Select bordered={false}
                            placeholder="Select a category"
                            size="large"
                            showSearch
                            className='cpdct5 form-select mb-3' 
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
                            className='cpdct5 form-select mb-3' 
                            onChange={(value) => {
                                setCompany(value);
                            }}
                        >
                            {companies?.map((c) => (
                                <Option key={c._id} value={c._id}>
                                    {c.name}
                                </Option>
                            ))}
                         </Select>
                         <Select bordered={false}
                            placeholder="Select a Brand"
                            size="large"
                            showSearch
                            className='cpdct5 form-select mb-3' 
                            onChange={(value) => {
                                setBrand(value);
                            }}
                        >
                            {brands?.map((c) => (
                                <Option key={c._id} value={c._id}>
                                    {c.name}
                                </Option>
                            ))}
                         </Select>
                         <div className='cpdct6 mb-3'>
                            <label 
                                className='cpdct7 btn btn-outline col-md-12'
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
                         <div className='cpdct8 mb-3'>
                            {photo && (
                                <div className='cpdct9 text-center'> 
                                    <img 
                                        src={URL.createObjectURL(photo)} 
                                        alt="product-photo"
                                        height={'200px'} 
                                        className='img img-responsive'
                                    />
                                </div>
                            )}
                         </div>
                         <div className='cpdct10 mb-3'>
                            <input 
                                type="text"
                                value ={name}
                                placeholder="write a name"
                                className="form-control"
                                onChange={(e) => setName(e.target.value)}
                            />
                         </div>
                         <div className='cpdct11 mb-3'>
                            <textarea 
                                type="text"
                                value ={description}
                                placeholder="write a description"
                                className="cpdct12 form-control"
                                onChange={(e) => setDescription(e.target.value)}
                            />
                         </div>
                         <div className='cpdct13 mb-3'>
                            <input 
                                type="number"
                                value ={price}
                                placeholder="write a price"
                                className="cpdct14 form-control"
                                onChange={(e) => setPrice(e.target.value)}
                            />
                         </div>
                         <div className='cpdct15 mb-3'>
                            <input 
                                type="number"
                                value ={quantity}
                                placeholder="write a quantity"
                                className="cpdct16 form-control"
                                onChange={(e) => setQuantity(e.target.value)}
                            />
                         </div>
                        <div className='cpdct17 mb-3'>
                            <button 
                                className='cpdct18 btn '
                                onClick={handleCreate}
                            >
                                Create Product
                            </button>
                        </div> 
                    </div>
                </div>
            </div>
        </div>
    </LayoutNF>
  );
};

export default CreateProduct;
