import React, {useState, useEffect} from 'react';
import LayoutNF from '../../components/Layout/LayoutNF';
import AdminMenu from '../../components/Layout/AdminMenu';
import toast from 'react-hot-toast';
import axios from 'axios';
import {Select} from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import "./UpdateProduct.css";

const {Option} = Select;

const UpdateProduct = () => {
    const navigate =useNavigate();
    const params = useParams();
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [company, setcompany] = useState("");
    const [brand, setBrand] = useState("");
    const [quantity, setQuantity] = useState("");
    const [bestseller, setBestseller] = useState("");
    const [photo, setPhoto] = useState("");
    const [id, setId] = useState("");


    //get single product
    const getSingleProduct = async () => {
        try {
            const {data} = await axios.get(
                `${process.env.REACT_APP_API}/api/products/product/slug/${params.slug}`
            );
            setName(data.product.name);
            setId(data.product._id);
            setDescription(data.product.description);
            setPrice(data.product.price);
            setQuantity(data.product.quantity);
            setBrand(data.product.brand._id);
            setBestseller(data.product.bestseller);
            setCategory(data.product.category._id);
            setcompany(data.product.company._id);
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong in getting single product');
        }
    };
    useEffect(() => {
        getSingleProduct()
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

    //update product function
    const handleUpdate = async (e) => {
        e.preventDefault()
        try {
            const productData = new FormData();
            productData.append("name", name);
            productData.append("description", description);
            productData.append("price", price);
            productData.append("quantity", quantity);
            photo && productData.append("photo", photo);
            productData.append("brand", brand);
            productData.append("bestseller", bestseller);
            productData.append("category", category);
            productData.append("company", company);
            const {data} = axios.put(
                `${process.env.REACT_APP_API}/api/products/product/${id}`,
                    productData
            );
            if(data?.success){
                toast.error(data?.message);
            }else{
                toast.success('Product updated successfully');
                navigate('/dashboard/admin/products');
            }
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong in update');
        };
    };

    //delete product 
    const handleDelete = async() => {
        try {
            let answer = window.prompt('Delete product?');
            if(!answer) return;
            const {data} = await axios.delete(
                `${process.env.REACT_APP_API}/api/products/delete-product/${id}`
            );
            toast.success('Product deleted successfully');
            navigate('/dashboard/admin/products');
        } catch (error) {
            console.log(error);
            toast.error('Something wrong in delete');
        };
    };
  return (
    <LayoutNF title={"Update Product"}>
        <div className='updct container-fluid '>
            <div className='updct1 row'>
                <div className='updct2 col-md-3'>
                    <AdminMenu />
                </div>
                <div className='updct3 col-md-9'>
                    <h1>Update Product</h1>
                    <div className='updct4 m-1 w-75'>
                        <Select bordered={false}
                            placeholder="Select a category"
                            size="large"
                            showSearch
                            className='updct5 form-select mb-3' 
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
                            className='updct5 form-select mb-3' 
                            onChange={(value) => {
                                setcompany(value);
                            }}
                            value={company}
                        >
                            {companies?.map((c) => (
                                <Option key={c._id} value={c._id}>
                                    {c.name}
                                </Option>
                            ))}
                         </Select>
                         <Select bordered={false}
                            placeholder="Select a brand"
                            size="large"
                            showSearch
                            className='updct5 form-select mb-3' 
                            onChange={(value) => {
                                setBrand(value);
                            }}
                            value={brand}
                        >
                            {brands?.map((c) => (
                                <Option key={c._id} value={c._id}>
                                    {c.name}
                                </Option>
                            ))}
                         </Select>
                         <div className='updct6 mb-3'>
                            <label 
                                className='updct7 btn btn-outline col-md-12'
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
                         <div className='updct8 mb-3'>
                            {photo ? (
                                <div className='updct9 text-center'> 
                                    <img 
                                        src={URL.createObjectURL(photo)} 
                                        alt="product-photo"
                                        height={'200px'} 
                                        className='updct10 img img-responsive'
                                    />
                                </div>
                            ) : (
                            <div className='updct11 text-center'> 
                                <img 
                                    src={`${process.env.REACT_APP_API}/api/products/photoURL/${id}`} 
                                    alt="product-photo"
                                    height={'200px'} 
                                    className='updct12 img img-responsive'
                                />
                            </div>)}
                         </div>
                         <div className='updct13 mb-3'>
                            <input 
                                type="text"
                                value ={name}
                                placeholder="write a name"
                                className="updct14 form-control"
                                onChange={(e) => setName(e.target.value)}
                            />
                         </div>
                         <div className='updct15 mb-3'>
                            <textarea 
                                type="text"
                                value ={description}
                                placeholder="write a description"
                                className="updct16 form-control"
                                onChange={(e) => setDescription(e.target.value)}
                            />
                         </div>
                         <div className='updct17 mb-3'>
                            <input 
                                type="number"
                                value ={price}
                                placeholder="write a price"
                                className="updct18 form-control"
                                onChange={(e) => setPrice(e.target.value)}
                            />
                         </div>
                         <div className='updct19 mb-3'>
                            <input 
                                type="number"
                                value ={quantity}
                                placeholder="write a quantity"
                                className="form-control"
                                onChange={(e) => setQuantity(e.target.value)}
                            />
                         </div>
                         <div className='updct19 mb-3'>
                            <Select
                                bordered={false}
                                placeholder="BestSeller??"
                                size='large'
                                showSearch
                                className='updct5 form-select mb-3'
                                onChange={(value) =>{
                                    setBestseller(value);
                                }}
                                value={bestseller ? "yes" : "No"}
                            >
                                <Option value="0">No</Option>
                                <Option value="1">Yes</Option>
                            </Select>
                        </div>

                        <div className='updct20 mb-3'>
                            <button 
                                className='updct21 btn btn'
                                onClick={handleUpdate}
                            >
                                Update Product
                            </button>
                        </div> 
                        <div className='updct22 mb-3'>
                            <button 
                                className='updct23 btn btn'
                                onClick={handleDelete}
                            >
                                Delete Product
                            </button>
                        </div> 
                    </div>
                </div>
            </div>
        </div>
    </LayoutNF>
  )
}

export default UpdateProduct
