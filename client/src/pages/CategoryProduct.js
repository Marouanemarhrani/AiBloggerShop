import React, { useState, useEffect } from 'react';
import LayoutNF from '../components/Layout/LayoutNF';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useCart } from '../context/cart';
import "./CategoryProduct.css";

const CategoryProduct = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState([]);
    const [cart, setCart] = useCart();

    useEffect(() => {
        if(params?.slug) getProductsByCat()
    }, [params?.slug])
    const getProductsByCat = async () => {
        try {
            const {data} = await axios.get(
                `${process.env.REACT_APP_API}/api/products/product/category/${params.slug}`
            );
            setProducts(data?.products);
            setCategory(data?.category);
        } catch (error) {
            console.log(error);
        }
    };
  return (
    <LayoutNF title={"Our Catalogue"}>
      <div className='catpdct col-md-8 offset-1'>
        <div className='catcpdct14'>
            <h5 className='catpdct1 text-center'>{category?.name}</h5>
            <h6 className='catpdct2 text-center'>{products?.length} result found</h6>
        </div>
            <div className='catpdct5 d-flex flex-wrap'>
                {products?.map((p) => (
                <div className='catpdct6 card m-2' style={{ width: '18rem' }} key={p._id}>
                    <img
                    src={`${process.env.REACT_APP_API}/api/products/photoURL/${p._id}`}
                    className='catpdct7 card-img-top'
                    alt={p.name}
                    />
                    <div className='catpdct8 card-body'>
                        <h5 className='catpdct9 card-title'>{p.name}</h5>
                        <p className='catpdct10 card-text'>{p.description.substring(0, 30)}...</p>
                        <p className='catpdct11 card-text'>€ {p.price}</p>
                        <div className='catpdct-buttons'>
                            <button 
                                className='catpdct12 btn ms-1'
                                onClick={() => navigate(`/product/${p.slug}`)}
                            >
                                More details
                            </button>
                            <button
                                className='catpdct13 btn btn ms-1'
                                onClick={() => {
                                    setCart([...cart, p]);
                                    toast.success('Item added to cart');
                                }}
                                >
                                Add to cart
                            </button>
                        </div>
                    </div>
                </div>
                ))}
            </div>
      </div>
    </LayoutNF>
  )
};

export default CategoryProduct;
