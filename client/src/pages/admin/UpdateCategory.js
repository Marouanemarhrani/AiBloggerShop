import React, {useState, useEffect} from 'react';
import LayoutNF from '../../components/Layout/LayoutNF';
import AdminMenu from '../../components/Layout/AdminMenu';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import "./UpdateCategory.css";

const UpdateCategory = () => {
    const navigate =useNavigate();
    const params = useParams();
    const [name, setName] = useState("");
    const [photo, setPhoto] = useState("");
    const [id, setId] = useState("");


    //get single category
    const getSingleCategory = async () => {
        try {
            const {data} = await axios.get(
                `${process.env.REACT_APP_API}/api/categories/single-category/${params.slug}`
            );
            setName(data.category.name);
            setId(data.category._id);
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong in getting single category');
        }
    };
    useEffect(() => {
        getSingleCategory()
        //eslint-disable-next-line
    }, []);

        //update category
        const handleUpdate = async (e) => {
            e.preventDefault()
            try {
                const categoryData = new FormData();
                categoryData.append("name", name);
                photo && categoryData.append("photo", photo);
                const {data} = axios.put(
                    `${process.env.REACT_APP_API}/api/categories/update-category/${id}`,
                        categoryData
                );
                if(data?.success){
                    toast.success(data?.message);
                }else{
                    toast.success('Category updated successfully');
                    navigate('/dashboard/admin/categories');
                }
            } catch (error) {
                console.log(error);
                toast.error('Something went wrong in update');
            };
        };
    
        //delete category
        const handleDelete = async() => {
            try {
                let answer = window.prompt('Delete category?');
                if(!answer) return;
                const {data} = await axios.delete(
                    `${process.env.REACT_APP_API}/api/categories/delete-category/${id}`
                );
                toast.success('Category deleted successfully');
                navigate('/dashboard/admin/categories');
            } catch (error) {
                console.log(error);
                toast.error('Something wrong in delete');
            };
        };
  return (
    <LayoutNF title={"Update Category"}>
        <div className='upcate container-fluid '>
            <div className='upcate1 row'>
                <div className='upcate2 col-md-3'>
                    <AdminMenu />
                </div>
                <div className='upcate3 col-md-9'>
                    <h1>Update Category</h1>
                    <div className='upcate4 m-1 w-75'>
                         <div className='upcate6 mb-3'>
                            <label 
                                className='upcate7 btn btn-outline col-md-12'
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
                         <div className='upcate8 mb-3'>
                            {photo ? (
                                <div className='upcate9 text-center'> 
                                    <img 
                                        src={URL.createObjectURL(photo)} 
                                        alt="category-photo"
                                        height={'200px'} 
                                        className='upcate10 img img-responsive'
                                    />
                                </div>
                            ) : (
                            <div className='upcate11 text-center'> 
                                <img 
                                    src={`${process.env.REACT_APP_API}/api/categories/category/photoURL/${id}`} 
                                    alt="category-photo"
                                    height={'200px'} 
                                    className='upcate12 img img-responsive'
                                />
                            </div>)}
                         </div>
                         <div className='upcate13 mb-3'>
                            <input 
                                type="text"
                                value ={name}
                                placeholder="write a name"
                                className="upcate14 form-control"
                                onChange={(e) => setName(e.target.value)}
                            />
                         </div>
                        <div className='upcate20 mb-3'>
                            <button 
                                className='upcate21 btn btn'
                                onClick={handleUpdate}
                            >
                                Update Category
                            </button>
                        </div> 
                        <div className='upcate22 mb-3'>
                            <button 
                                className='upcate23 btn btn'
                                onClick={handleDelete}
                            >
                                Delete Category
                            </button>
                        </div> 
                    </div>
                </div>
            </div>
        </div>
    </LayoutNF>
  )
}

export default UpdateCategory;
