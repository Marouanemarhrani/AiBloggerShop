import React, {useState, useEffect} from 'react';
import LayoutNF from '../../components/Layout/LayoutNF';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link } from "react-router-dom";
import AdminMenu from '../../components/Layout/AdminMenu';
import "./AdminOffers.css";

const AdminOffers = () => {
    const [sells, setSells] = useState([]);

    //get all Sells
    const getAllSells = async () => {
        try {
            const {data} = await axios.get(
                `${process.env.REACT_APP_API}/api/sells/list`
            );
            setSells(data.sells);
        } catch (error) {
            console.log(error);
            toast.error('error in get sells');
        }
    };

    useEffect(()=> {
        getAllSells();
    }, []);
  return (
    <LayoutNF title={"Offers"}>
        <div className='app container-fluid '>
        <div className='app1 row'>
            <div className='app2 col-md-3'>
                <AdminMenu />
            </div>
            <div className='app3 col-md-9'>
                <h1 className='app4 text-center'>All Sells List </h1>
                <div className='app5 d-flex'>
                    {sells?.map((p) => (
                        <Link 
                            key={p._id}
                            className='app6 appointment-link'
                        >
                            <div className="app7 card m-2" style={{width: '18rem'}}>
                                
                                <div className="app8 card-body">
                                    <h5 className="app9 card-title">Device: {p.deviceName}</h5>
                                    <p className="app10 card-text">PriceIA: {p.estimatedPrice}</p>
                                    <p className="app11 card-text">Phone: {p.phoneNumber}</p>
                                    <p className="app11 card-text">User Offer: {p.userOffer}</p>
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

export default AdminOffers;
