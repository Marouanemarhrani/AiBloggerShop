import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useCart } from '../context/cart';
import "./ProductDetails.css";

const ProductDetails = () => {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [cart, setCart] = useCart();
  const [relatedProducts, setRelatedProducts] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/products/product/slug/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/products/product/related/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={"Product Details"}>
      <div className="dtls16-product-container">
        <div className="dtls5 text-center">
          <h3 className="dtls6">
            {product?.category?.name} - {product.name}
          </h3>
        </div>
        <div className="dtls17-product-details">
          <div className="dtls2">
            <img
              src={`${process.env.REACT_APP_API}/api/products/photoURL/${product._id}`}
              className="dtls3"
              alt={product.name}
            />
          </div>
          <div className="dtls4">
            <div className="dtls7-btn-container">
              <h4 className="dtls8 text-success">{product.price} €</h4>
              <button
                className="dtls9 btn btn-lg"
                onClick={() => {
                  setCart([...cart, product]);
                  toast.success('Item added to cart');
                }}
              >
                Add to cart
              </button>
            </div>
            <div className="dtls10">
              <h6 className="dtls11">{product.description}</h6>
            </div>
            <div className="dtls12 mt-3">
              <p>Free delivery between 27th Aug and 28th Aug</p>
              <p>Free return within 30 days</p>
              <p>12 months warranty</p>
            </div>
          </div>
        </div>
      </div>
      <div className="dtls13 row container">
        <h6>Other products related to your search</h6>
        {relatedProducts.length < 1 && (
          <p className="dtls14 text-center">Sorry.. We haven't find any related product to your search</p>
        )}
        <div className="dtls15 d-flex flex-wrap">
          {relatedProducts?.map((p) => (
            <div className="dtls18 card m-2" style={{ width: '18rem' }} key={p._id}>
              <img
                src={`${process.env.REACT_APP_API}/api/products/photoURL/${p._id}`}
                className="dtls19 card-img-top"
                alt={p.name}
              />
              <div className="dtls20 card-body">
                <h5 className="dtls21 card-title">{p.name}</h5>
                <p className="dtls22 card-text">
                  {p.description.substring(0, 30)}...
                </p>
                <p className="dtls23 card-text">€ {p.price}</p>
                <div className='dtls26-home-buttons'>
                    <button
                      className='dtls24 btn ms-1'
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      More details
                    </button>
                    <button
                      className='dtls25 btn ms-1'
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
    </Layout>
  );
};

export default ProductDetails;
