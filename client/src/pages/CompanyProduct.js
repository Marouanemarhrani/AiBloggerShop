import React, { useState, useEffect } from 'react';
import LayoutNF from '../components/Layout/LayoutNF';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useCart } from '../context/cart';
import "./CompanyProduct.css";

const CompanyProduct = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [company, setCompany] = useState([]);
    const [cart, setCart] = useCart();

    useEffect(() => {
        if(params?.slug) getProductsBycomp()
    }, [params?.slug])
    const getProductsBycomp = async () => {
        try {
            const {data} = await axios.get(
                `${process.env.REACT_APP_API}/api/products/product/company/${params.slug}`
            );
            setProducts(data?.products);
            setCompany(data?.company);
        } catch (error) {
            console.log(error);
        }
    };
  return (
    <LayoutNF title={"Our catalogue"}>
      <div className='cmppdct col-md-8 offset-1'>
        <div className='cmpcpdct14'>
            <h5 className='cmppdct1 text-center'>{company?.name}</h5>
            <h6 className='cmppdct2 text-center'>{products?.length} result found</h6>
        </div>
            <div className='cmppdct5 d-flex flex-wrap'>
                {products?.map((p) => (
                <div className='cmppdct6 card m-2' style={{ width: '18rem' }} key={p._id}>
                    <img
                    src={`${process.env.REACT_APP_API}/api/products/photoURL/${p._id}`}
                    className='cmppdct7 card-img-top'
                    alt={p.name}
                    />
                    <div className='cmppdct8 card-body'>
                        <h5 className='cmppdct9 card-title'>{p.name}</h5>
                        <p className='cmppdct10 card-text'>{p.description.substring(0, 30)}...</p>
                        <p className='cmppdct11 card-text'>€ {p.price}</p>
                        <div className='cmppdct-buttons'>
                            <button 
                                className='cmppdct12 btn btn ms-1'
                                onClick={() => navigate(`/product/${p.slug}`)}
                            >
                                More details
                            </button>
                            <button
                                className='cmppdct13 btn btn ms-1'
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

export default CompanyProduct;
