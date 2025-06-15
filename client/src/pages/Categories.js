import React from 'react';
import useCategory from '../hooks/useCategory';
import { useNavigate } from 'react-router-dom';
import LayoutNF from '../components/Layout/LayoutNF';
import "./Categories.css";

const Categories = () => {
    const categories = useCategory();
    const navigate = useNavigate();
  return (
    <LayoutNF title={"All Categories"}>
      <div className='ctg1 body'>
        <h1>All Categories</h1>
      <div className='ctg2 container'>
        <div className='ctg3 row'>
            {categories.map((c) => (
                <div className='ctg4 col-md-6 mt-5 mb-3 gx-3 gy-3' key={c._id}>
                  <div className="ctg5">
                    <img
                      src={`${process.env.REACT_APP_API}/api/categories/category/photoURL/${c._id}`}
                      className="ctg6"
                      alt={c.name}
                    />
                  </div>
                  <button 
                    onClick={() => navigate(`/category/${c.slug}`)}
                    className='ctg7 btn '>
                      {c.name}
                  </button>
                </div>
            ))}
        </div>
      </div>
      </div>
    </LayoutNF>
  )
};

export default Categories;