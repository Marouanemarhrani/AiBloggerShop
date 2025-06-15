import React from 'react';
import { useSearch } from '../context/search';
import toast from 'react-hot-toast';
import { useCart } from '../context/cart';
import { useNavigate } from 'react-router-dom';
import "./Search.css";
import LayoutNF from '../components/Layout/LayoutNF';

const Search = () => {
  const [values, setValues] = useSearch();
  const [cart, setCart] = useCart();

  const navigate = useNavigate();

  return (
    <LayoutNF title={'Search result'}>
      <div className='divsrch1 col-md-8 offset-1'>
        <div className='divsrch2'>
          <h5 className='text-center'>Search Result</h5>
          <h6 className='text-center'>{values?.results.length < 1 
          ? 'No Products found' 
          : `Found ${values?.results.length}`}
          </h6>
          <div className='divsrch3 d-flex flex-wrap'>
            {values?.results.map((p) => (
              <div className='srchpdct14 card m-2' style={{ width: '18rem' }} key={p._id}>
                <img
                  src={`${process.env.REACT_APP_API}/api/products/photoURL/${p._id}`}
                  className='srchpdct15 card-img-top'
                  alt={p.name}
                />
              <div className='srchpdct16 card-body'>
                <h5 className='srchpdct17 card-title'>{p.name}</h5>
                <p className='srchpdct18 card-text'>{p.description.substring(0, 30)}...</p>
                <p className='srchpdct19 card-text'>{p.price} €</p>
                <div className='srchpdct-buttons'>
                    <button
                      className='srchpdct20 btn ms-1'
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      More details
                    </button>
                    <button
                      className='srchpdct21 btn btn ms-1'
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
      </div>  
    </LayoutNF>
  )
};

export default Search;