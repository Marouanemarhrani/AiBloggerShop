import  React, {useEffect, useState}  from 'react';
import LayoutNF from '../../components/Layout/LayoutNF';
import AdminMenu from '../../components/Layout/AdminMenu';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CreateCategory.css';

const CreateCategory = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [photo, setPhoto] = useState("");
    //Handle Form
    const handleSubmit = async (e) =>{
        e.preventDefault();
        try {
            const categoryData = new FormData();
            categoryData.append("name", name);
            categoryData.append("photo", photo);
            const {data} = await axios.post(
                `${process.env.REACT_APP_API}/api/categories/create-category`,
                categoryData,
            );
            if(data?.success){
                toast.success('Category created successfully');
                navigate('/dashboard/admin/categories');
            }else{
                toast.error('Error in creating');
            };
        } catch (error) {
            console.log(error);
            toast.error('something went wrong in input form');
        };
    };
  return (
    <LayoutNF title={"Create Category"}>
    <div className='ccat container-fluid '>
        <div className='ccat1 row'>
            <div className='ccat2 col-md-3'>
                <AdminMenu />
            </div>
            <div className='ccat3 col-md-9'>
                <h1>Manage Categories</h1>
                <div className='ccat4 p-3 w-50'>
                    <div className='ccat5 mb-3'>
                        <input 
                            type="text"
                            value ={name}
                            placeholder="write a name"
                            className="ccat13 form-control"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className='ccat6 mb-3'>
                        <label 
                            className='ccat7 btn btn-outline col-md-12'
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
                    <div className='ccat8 mb-3'>
                        {photo && (
                            <div className='ccat9 text-center'> 
                                <img 
                                    src={URL.createObjectURL(photo)} 
                                    alt="category-photo"
                                    height={'200px'} 
                                    className='ccat10 img-responsive'
                                />
                            </div>
                        )}
                    </div>
                    <div className='ccat11 mb-3'>
                        <button 
                            className='ccat12 btn '
                            onClick={handleSubmit}
                        >
                            Create Category
                        </button>
                    </div> 
                </div>
            </div>
        </div>
    </div>
    </LayoutNF>
  );
};

export default CreateCategory;
