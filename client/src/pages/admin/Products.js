import React, {useState, useEffect} from 'react';
import AdminMenu from '../../components/Layout/AdminMenu';
import LayoutNF from '../../components/Layout/LayoutNF';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link } from "react-router-dom";
import "./Products.css";

const Products = () => {
    const [products, setProducts] = useState([]);

    //get all products
    const getAllProducts = async () => {
        try {
            const {data} = await axios.get(
                `${process.env.REACT_APP_API}/api/products/products`
            );
            setProducts(data.products);
        } catch (error) {
            console.log(error);
            toast.error('error in get products');
        }
    };

    useEffect(()=> {
        getAllProducts();
    }, []);
  return (
    <LayoutNF title={"Products"}>
    <div className='pdcts container-fluid'>
      <div className='pdcts1 row'>
        <div className='pdcts2 col-md-3'>
            <AdminMenu />
        </div>
        <div className='pdcts3 col-md-9'>
            <h1 className='pdcts4 text-center'>All Products List </h1>
            <div className='pdcts5 d-flex'>
                {products?.map((p) => (
                    <Link 
                        key={p._id}
                        to={`/dashboard/admin/product/${p.slug}`}
                        className='pdcts6 product-link'
                    >
                        <div className="pdcts7 card m-2" style={{width: '18rem'}}>
                            <img 
                                src={`${process.env.REACT_APP_API}/api/products/photoURL/${p._id}`}
                                className="pdcts8 card-img-top" 
                                alt={p.name} 
                            />
                            <div className="pdcts9 card-body">
                                <h5 className="pdcts10 card-title">{p.name}</h5>
                                <p className="pdcts11 card-text">{p.description}</p>
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

export default Products;
