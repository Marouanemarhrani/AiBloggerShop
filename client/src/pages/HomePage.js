import React, { useState, useEffect, useRef } from 'react';
import Layout from '../components/Layout/Layout';
import axios from 'axios';
import {useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useCart } from '../context/cart';
import './HomePage.css';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [bestseller, setBestseller] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useCart();

  const carouselRef = useRef(null);
  const navigate = useNavigate();

  const scrollRight = () => {
    const carousel = carouselRef.current;
    const scrollAmount = carousel.offsetWidth;

    carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    if (carousel.scrollLeft + scrollAmount >= carousel.scrollWidth) {
      setTimeout(() => {
        carousel.scrollTo({ left: 0, behavior: 'smooth' });
      }, 300);
    }
  };

  const scrollLeft = () => {
    const carousel = carouselRef.current;
    const scrollAmount = carousel.offsetWidth;

    carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    if (carousel.scrollLeft <= 0) {
      setTimeout(() => {
        carousel.scrollTo({ left: carousel.scrollWidth, behavior: 'smooth' });
      }, 300);
    }
  };

  const getBestSeller = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/products/bestseller`
      );
      setBestseller(data?.bestsellers);
    } catch (error) {
      toast.error('Error getting bestsellers');
    }
  };

  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/products/product-list/${page}`
      );
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      toast.error('Error getting products');
    }
  };

  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/products/product-count`
      );
      setTotal(data.total);
    } catch (error) {
      toast.error('Error getting total product count');
    }
  };

  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/products/product-list/${page}`
      );
      setLoading(false);
      setProducts([...products, ...data.products]);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllProducts();
    getBestSeller();
    getTotal();
  }, []);

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  return (
    <Layout title={'SmartFix - Home'}>
      <div className="home3 container-fluid row mt-3">
        <div className="home37 bestsellers-section">
          <h5 className="home38 bestseller-title">Our Bestsellers</h5>
          <p className="home39 bestseller-subtitle">It goes faster than chocolates</p>
          <div className="home40 bestseller-carousel-wrapper">
            <div className="home40 bestseller-carousel" ref={carouselRef}>
              {bestseller.slice(0, 12).map((c, index) => (
                <div key={c._id} className={`home41 bestseller-card ${index >= 4 ? 'hidden' : ''}`}>
                  <img
                    src={`${process.env.REACT_APP_API}/api/products/photoURL/${c._id}`}
                    alt={c.name}
                    className="home42 bestseller-image"
                  />
                  <div className="home43 bestseller-details">
                    <h6 className="home44 bestseller-name">{c.name}</h6>
                    <p className="home45 bestseller-price">From {c.price} €</p>
                    <p className="home46 bestseller-rating">★ {c.rating}/5</p>
                    <button
                      className="home47 btn"
                      onClick={() => navigate(`/product/${c.slug}`)}
                    >
                      See More
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="carousel-arrow carousel-arrow-left" onClick={scrollLeft}>
              &#8249;
            </div>
            <div className="carousel-arrow carousel-arrow-right" onClick={scrollRight}>
              &#8250;
            </div>
          </div>
        </div>

        <div className="home11 col-md-8 offset-1">
          <div className="home12">
            <h5>All Products</h5>
            <h10>Enjoy our bunch of products...</h10>
          </div>
          <div className="home13 d-flex flex-wrap">
            {products.map((p) => (
              <div className="home14 card m-2" style={{ width: '18rem' }} key={p._id}>
                <img
                  src={`${process.env.REACT_APP_API}/api/products/photoURL/${p._id}`}
                  className="home15 card-img-top"
                  alt={p.name}
                />
                <div className="home16 card-body">
                  <h5 className="home17 card-title">{p.name}</h5>
                  <p className="home18 card-text">{p.description.substring(0, 30)}...</p>
                  <p className="home19 card-text">{p.price} €</p>
                  <div className="home-buttons">
                    <button
                      className="home20 btn ms-1"
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      More details
                    </button>
                    <button
                      className="home21 btn ms-1"
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
          <div className="home22 m-2 p-3">
            {products && products.length < total && (
              <button
                className="home23 btn"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? 'Loading ...' : 'Load more'}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
