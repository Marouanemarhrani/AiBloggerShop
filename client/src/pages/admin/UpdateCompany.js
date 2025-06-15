import React, {useState, useEffect} from 'react';
import LayoutNF from '../../components/Layout/LayoutNF';
import AdminMenu from '../../components/Layout/AdminMenu';
import toast from 'react-hot-toast';
import axios from 'axios';
import {Select} from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import "./UpdateCompany.css";

const {Option} = Select;

const UpdateCompany = () => {
    const navigate =useNavigate();
    const params = useParams();
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [photo, setPhoto] = useState("");
    const [id, setId] = useState("");


    //get single company
    const getSingleCompany = async () => {
        try {
            const {data} = await axios.get(
                `${process.env.REACT_APP_API}/api/companies/single-company/${params.slug}`
            );
            setName(data.company.name);
            setId(data.company._id);
            setCategory(data.company.category._id);
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong in getting single company');
        }
    };
    useEffect(() => {
        getSingleCompany()
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

    useEffect(() => {
        getAllCategory();
    },[]);

    //update company function
    const handleUpdate = async (e) => {
        e.preventDefault()
        try {
            const companyData = new FormData();
            companyData.append("name", name);
            photo && companyData.append("photo", photo);
            companyData.append("category", category);
            const {data} = axios.put(
                `${process.env.REACT_APP_API}/api/companies/update-company/${id}`,
                    companyData
            );
            if(data?.success){
                toast.error(data?.message);
            }else{
                toast.success('Company updated successfully');
                navigate('/dashboard/admin/companies');
            }
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong in update');
        };
    };

    //delete company 
    const handleDelete = async() => {
        try {
            let answer = window.prompt('Delete company?');
            if(!answer) return;
            const {data} = await axios.delete(
                `${process.env.REACT_APP_API}/api/companies/delete-company/${id}`
            );
            toast.success('Company deleted successfully');
            navigate('/dashboard/admin/companies');
        } catch (error) {
            console.log(error);
            toast.error('Something wrong in delete');
        };
    };
  return (
    <LayoutNF title={"Update Company"}>
        <div className='upcmp container-fluid '>
            <div className='upcmp1 row'>
                <div className='upcmp2 col-md-3'>
                    <AdminMenu />
                </div>
                <div className='upcmp3 col-md-9'>
                    <h1>Update Company</h1>
                    <div className='upcmp4 m-1 w-75'>
                        <Select bordered={false}
                            placeholder="Select a category"
                            size="large"
                            showSearch
                            className='upcmp5 form-select mb-3' 
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
                         <div className='upcmp6 mb-3'>
                            <label 
                                className='upcmp7 btn btn-outline col-md-12'
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
                         <div className='upcmp8 mb-3'>
                            {photo ? (
                                <div className='upcmp9 text-center'> 
                                    <img 
                                        src={URL.createObjectURL(photo)} 
                                        alt="company-photo"
                                        height={'200px'} 
                                        className='upcmp10 img img-responsive'
                                    />
                                </div>
                            ) : (
                            <div className='upcmp11 text-center'> 
                                <img 
                                    src={`${process.env.REACT_APP_API}/api/companies/company/photoURL/${id}`} 
                                    alt="company-photo"
                                    height={'200px'} 
                                    className='upcmp12 img img-responsive'
                                />
                            </div>)}
                         </div>
                         <div className='upcmp13 mb-3'>
                            <input 
                                type="text"
                                value ={name}
                                placeholder="write a name"
                                className="upcmp14 form-control"
                                onChange={(e) => setName(e.target.value)}
                            />
                         </div>
                        <div className='upcmp20 mb-3'>
                            <button 
                                className='upcmp21 btn btn'
                                onClick={handleUpdate}
                            >
                                Update Company
                            </button>
                        </div> 
                        <div className='upcmp22 mb-3'>
                            <button 
                                className='upcmp23 btn btn'
                                onClick={handleDelete}
                            >
                                Delete Company
                            </button>
                        </div> 
                    </div>
                </div>
            </div>
        </div>
    </LayoutNF>
  )
}

export default UpdateCompany;
