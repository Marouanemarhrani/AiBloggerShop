import React, {useState, useEffect} from 'react';
import AdminMenu from '../../components/Layout/AdminMenu';
import LayoutNF from '../../components/Layout/LayoutNF';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link } from "react-router-dom";
import "./CategoriesAdm.css";

const CategoriesAdm = () => {
    const [categories, setCategories] = useState([]);

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
  return (
    <LayoutNF title={"Categories"}>
    <div className='ctgries container-fluid'>
      <div className='ctgries1 row'>
        <div className='ctgries2 col-md-3'>
            <AdminMenu />
        </div>
        <div className='ctgries3 col-md-9'>
            <h1 className='ctgries4 text-center'>Categories List </h1>
            <div className='ctgries5 d-flex'>
                {categories?.map((p) => (
                    <Link 
                        key={p._id}
                        to={`/dashboard/admin/category/${p.slug}`}
                        className='ctgries6 category-link'
                    >
                        <div className="ctgries7 card m-2" style={{width: '18rem'}}>
                            <img 
                                src={`${process.env.REACT_APP_API}/api/categories/category/photoURL/${p._id}`}
                                className="ctgries8 card-img-top" 
                                alt={p.name} 
                            />
                            <div className="ctgries9 card-body">
                                <h5 className="ctgries10 card-title">{p.name}</h5>
                            </div>
                        </div>
                    </Link>    
                ))}
            </div>
            </div>
        </div>
      </div>
    </LayoutNF>
  );
};

export default CategoriesAdm;
