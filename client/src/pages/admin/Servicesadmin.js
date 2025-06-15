import React, {useState, useEffect} from 'react';
import AdminMenu from '../../components/Layout/AdminMenu';
import LayoutNF from '../../components/Layout/LayoutNF';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link } from "react-router-dom";
import "./Servicesadmin.css";

const Services = () => {
    const [services, setServices] = useState([]);

    //get all Services
    const getAllServices = async () => {
        try {
            const {data} = await axios.get(
                `${process.env.REACT_APP_API}/api/services/services`
            );
            setServices(data.services);
        } catch (error) {
            console.log(error);
            toast.error('error in get services');
        }
    };

    useEffect(()=> {
        getAllServices();
    }, []);
  return (
    <LayoutNF title={"Services"}>
    <div className='srvces container-fluid'>
      <div className='srvces1 row'>
        <div className='srvces2 col-md-3'>
            <AdminMenu />
        </div>
        <div className='srvces3 col-md-9'>
            <h1 className='srvces4 text-center'>All Services List </h1>
            <div className='srvces5 d-flex'>
                {services?.map((p) => (
                    <Link 
                        key={p._id}
                        to={`/dashboard/admin/service/${p.slug}`}
                        className='srvces6 service-link'
                    >
                        <div className="srvces7 card m-2" style={{width: '18rem'}}>
                            <img 
                                src={`${process.env.REACT_APP_API}/api/services/service/photoURL/${p._id}`}
                                className="srvces8 card-img-top" 
                                alt={p.name} 
                            />
                            <div className="srvces9 card-body">
                                <h5 className="srvces10 card-title">{p.name}</h5>
                                <p className="srvces11 card-text">{p.description}</p>
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

export default Services;
