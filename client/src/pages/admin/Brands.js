import React, {useState, useEffect} from 'react';
import AdminMenu from '../../components/Layout/AdminMenu';
import LayoutNF from '../../components/Layout/LayoutNF';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link } from "react-router-dom";
import "./Brands.css";

const Brands = () => {
    const [brands, setBrands] = useState([]);

    //get all brands
    const getAllBrands = async () => {
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
    useEffect(() => {
        getAllBrands();
    },[]);
  return (
    <LayoutNF title={"Brands"}>
    <div className='ctgries container-fluid'>
      <div className='ctgries1 row'>
        <div className='ctgries2 col-md-3'>
            <AdminMenu />
        </div>
        <div className='ctgries3 col-md-9'>
            <h1 className='ctgries4 text-center'>Brands List </h1>
            <div className='ctgries5 d-flex'>
                {brands?.map((p) => (
                    <Link 
                        key={p._id}
                        to={`/dashboard/admin/brand/${p.slug}`}
                        className='ctgries6 brand-link'
                    >
                        <div className="ctgries7 card m-2" style={{width: '18rem'}}>
                            <img 
                                src={`${process.env.REACT_APP_API}/api/brands/brand/photoURL/${p._id}`}
                                className="ctgries8 card-img-top" 
                                alt={p.name} 
                            />
                            <div className="ctgries9 card-body">
                                <h5 className="ctgries10 card-title">{p.category?.name}</h5>
                                <h5 className="ctgries10 card-title">{p.company?.name}</h5>
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

export default Brands;
