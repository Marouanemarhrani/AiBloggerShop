import React, {useState, useEffect} from 'react';
import AdminMenu from '../../components/Layout/AdminMenu';
import LayoutNF from '../../components/Layout/LayoutNF';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link } from "react-router-dom";
import "./Companies.css";

const Companies = () => {
    const [companies, setCompanies] = useState([]);

    //get all companies
    const getAllCompanies = async () => {
        try {
            const {data} = await axios.get(
                `${process.env.REACT_APP_API}/api/companies/get-company`
            );
            setCompanies(data.companies);
        } catch (error) {
            console.log(error);
            toast.error('error in get companies');
        }
    };

    useEffect(()=> {
        getAllCompanies();
    }, []);
  return (
    <LayoutNF title={"Companies"}>
    <div className='cmp container-fluid'>
      <div className='cmp1 row'>
        <div className='cmp2 col-md-3'>
            <AdminMenu />
        </div>
        <div className='cmp3 col-md-9'>
            <h1 className='cmp4 text-center'>All Companies List </h1>
            <div className='cmp5 d-flex'>
                {companies?.map((p) => (
                    <Link 
                        key={p._id}
                        to={`/dashboard/admin/company/${p.slug}`}
                        className='cmp6 company-link'
                    >
                        <div className="cmp7 card m-2" style={{width: '18rem'}}>
                            <img 
                                src={`${process.env.REACT_APP_API}/api/companies/company/photoURL/${p._id}`}
                                className="cmp8 card-img-top" 
                                alt={p.name} 
                            />
                            <div className="cmp9 card-body">
                                <h5 className="cmp10 card-title">{p.category?.name}</h5>
                                <h5 className="cmp10 card-title">{p.name}</h5>
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

export default Companies;
