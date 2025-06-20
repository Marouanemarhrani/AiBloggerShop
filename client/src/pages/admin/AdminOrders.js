import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useAuth } from '../../context/auth';
import { toast } from 'react-hot-toast';
import moment from "moment";
import AdminMenu from "../../components/Layout/AdminMenu";
import LayoutNF from "../../components/Layout/LayoutNF";
import { Select } from "antd";
import './AdminOrders.css'

const { Option } = Select;

const AdminOrders = () => {
    const [status, setStatus] = useState(["Not Process", "Processing", "Done"]);
    const [changeStatus, setChangeStatus] = useState("");
    const [orders, setOrders] = useState([]);
    const [auth, setAuth] = useAuth();

    const getOrders = async () => {
        try {
            const { data } = await axios.get(
                `${process.env.REACT_APP_API}/api/users/all-orders`
            );
            setOrders(data);
            toast.success('Orders fetched successfully!');
        } catch (error) {
            console.log(error);
            toast.error("Error fetching orders.");
        }
    };

    useEffect(() => {
        if (auth?.token) getOrders();
    }, [auth?.token]);

    const handleChange = async (orderId, value) => {
        try {
            await axios.put(
                `${process.env.REACT_APP_API}/api/users/order-status/${orderId}`, {
                    status: value,
                }
            );
            getOrders();
            toast.success("Order status updated successfully!");
        } catch (error) {
            console.log(error);
            toast.error("Error updating order status.");
        }
    };

    return (
        <LayoutNF title={"All Orders"}>
            <div id="admin-orders-container" className='container-fluid'>
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <h1 id="admin-orders-title" className="text-center">All Orders</h1>
                        {orders?.map((o, i) => (
                            <div key={o._id} className='admin-order-card border shadow'>
                                <table className='table admin-order-table'>
                                    <thead>
                                        <tr>
                                            <th scope='col'>#</th>
                                            <th scope='col'>Status</th>
                                            <th scope='col'>Buyer</th>
                                            <th scope='col'>Date</th>
                                            <th scope='col'>Payment</th>
                                            <th scope='col'>Quantity</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{i + 1}</td>
                                            <td>
                                                <Select
                                                    bordered={false}
                                                    className="admin-order-status-select"
                                                    onChange={(value) => handleChange(o._id, value)}
                                                    defaultValue={o?.status}
                                                >
                                                    {status.map((s, i) => (
                                                        <Option key={i} value={s}>
                                                            {s}
                                                        </Option>
                                                    ))}
                                                </Select>
                                            </td>
                                            <td>{o?.buyer?.name}</td>
                                            <td>{moment(o?.createdAt).fromNow()}</td>
                                            <td>{o?.payment?.success ? "Success" : "Failed"}</td>
                                            <td>{o?.products?.length}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div id="admin-order-products-container" className='container'>
                                    {o?.products?.map((p, i) => (
                                        <div className="row mb-2 p-3 admin-product-card flex-row" key={p._id}>
                                            <div className="col-md-4">
                                                <img
                                                    src={`${process.env.REACT_APP_API}/api/products/photoURL/${p._id}`}
                                                    className="admin-product-img card-img-top"
                                                    alt={p.name}
                                                />
                                            </div>
                                            <div className="col-md-8">
                                                <h2>{p.name}</h2>
                                                <p>{p.description.substring(0, 30)}</p>
                                                <p>Price: {p.price}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </LayoutNF>
    );
};

export default AdminOrders;
