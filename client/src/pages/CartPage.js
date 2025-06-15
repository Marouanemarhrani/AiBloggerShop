import LayoutNF from "../components/Layout/LayoutNF";
import React, { useState, useEffect } from "react";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import Modal from 'react-modal';
import "./CartPage.css";

const CartPage = () => { 
    const [auth, setAuth] = useAuth();
    const [cart, setCart] = useCart();
    const [clientToken, setClientToken] = useState("");
    const [instance, setInstance] = useState("");
    const [loading, setLoading] = useState(false);
    const [address, setAddress] = useState("");
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    // Get user data and address safely
    useEffect(() => {
        if (auth?.user) {
            const { address } = auth.user;
            setAddress(address || '');  // Set an empty string if address is undefined
        }
    }, [auth?.user]);

    // Calculate total price
    const totalPrice = () => {
        try {
            let total = 0;
            cart?.forEach((item) => {
                total += item.price;
            });
            return total.toLocaleString("en-US", {
                style:"currency",
                currency: "EUR",
            });
        } catch (error) {
            console.log(error);
            toast.error("There was an error calculating the total");
        }
    };

    // Delete item from cart
    const removeCartItem = (pid) => {
        try {
            let myCart = [...cart];
            let index = myCart.findIndex(item => item._id === pid);
            myCart.splice(index, 1);
            setCart(myCart);
            localStorage.setItem("cart", JSON.stringify(myCart));
        } catch (error) {
           console.log(error);
           toast.error("There was an error removing the item") 
        }
    };

    // Update address
    const handleSaveAddress = async(e) => {
        e.preventDefault();
        try {
            const {data} = await axios.put(
            `${process.env.REACT_APP_API}/api/users/update-address`,{
                address,
            });
            if(data?.error){
                toast.error(data?.error)
            }else{
                setAuth({...auth, user:data?.updatedAddress});
                let ls = localStorage.getItem("auth");
                ls = JSON.parse(ls);
                ls.user = data.updatedAddress;
                localStorage.setItem("auth", JSON.stringify(ls));
                toast.success("Address Updated successfully");
            }
        } catch (error) {
            console.log(error);
            toast.error('Oops.. Something went wrong, Try again');
        }
    };

    // Get payment gateway token
    const getToken = async () => {
        try {
            const {data} = await axios.get(
                `${process.env.REACT_APP_API}/api/products/braintree/token`
            );
            setClientToken(data?.clientToken)
        } catch (error) {
            console.log(error);
            toast.error("There was an error fetching the payment token")
        }
    };

    useEffect(() => {
        getToken();
    }, [auth?.token]);

    // Handle payment
    const handlePayment = async () => {
        try {
            setLoading(true);
            const {nonce} = await instance.requestPaymentMethod();
            const {data} = await axios.post(
                `${process.env.REACT_APP_API}/api/products/braintree/payment`,{
                    nonce, 
                    cart,
                }
            );
            setLoading(false);
            localStorage.removeItem("cart");
            setCart([]);
            navigate('/dashboard/user/orders');
            toast.success("Payment Completed Successfully");
        } catch (error) {
            console.log(error);
            setLoading(false);
            toast.error("There was an issue with the payment");
        }
    };

    return (
        <LayoutNF title={"Your cart | SMARTFIX"}>
            <div className="div-cart container">
                <div className="div-cart2 row">
                    <div className="div-cart3 col-md-12">
                        <h1 className="div-cart4-h1 text-center bg-light p-2 mb-1">
                            {`Hello ${auth?.token && auth?.user?.firstname}`}
                        </h1>
                        <h4 className="div-cart5-h4 text-center">
                            {cart?.length
                                ? ` You have ${cart.length} items in your cart 
                                ${auth?.token ? "" : "You need to login first before proceeding to checkout"} `
                                : "Your cart is empty" 
                            }
                        </h4>
                    </div>
                </div>
                <div className="div-cart6 row">
                    <div className="div-cart7 col-md-8">
                        {cart?.map((p) => (
                            <div className="div-cart8 row mb-2 p-3 card flex-row" key={p._id}>
                                <div className="div-cart8 col-md-4">
                                    <img 
                                        src={`${process.env.REACT_APP_API}/api/products/photoURL/${p?._id}`} 
                                        className="div-cart9 card-img-top" 
                                        alt={p.name}
                                        width="100px" 
                                        height={"100px"}
                                    />
                                </div>
                                <div className="div-cart10 col-md-8">
                                    <h2 className="cart-h2">{p.name}</h2>
                                    <p className="cart-p">{p.description.substring(0, 30)}</p>
                                    <p className="cart-p">Price: {p.price} €</p>
                                    <button 
                                        className="btn-remove btn"
                                        onClick={() => removeCartItem(p._id)}
                                    >
                                        Remove
                                    </button>
                                </div>    
                            </div>
                        ))}
                    </div>
                    <div className="div-cart11-summary col-md-4 text-center">
                        <h2 className="div-cart11-h2">Cart Summary</h2>
                        <p className="div-cart11-p">Total | Checkout | Payment</p>
                        <hr />
                        <h4 className="div-cart11-h4">Total : {totalPrice()}</h4>
                        {auth?.user?.address ? (
                            <>
                                <div className="div-cart12-address mb-3">
                                    <h4 className="div-cart12-h4">Current Address</h4>
                                    <h5 className="div-cart12-h5">{auth?.user?.address}</h5>
                                </div>
                                <button 
                                    className="btn-update-cart12 btn"
                                    onClick={() => setShowModal(true)}
                                >
                                    Edit Address
                                </button>
                            </>
                        ): (
                            <div className="div-cart13 mb-3">
                                    <button 
                                        className="btn-login-cart13 btn" 
                                        onClick={() => navigate('/login', {
                                            state:"/cart",
                                        })}
                                    >
                                        Please Login To Checkout
                                    </button>
                            </div>
                        )}
                        <div className="div-cart14 mt-2">
                            {!clientToken || !cart?.length ? (""): (
                                <>
                                    <DropIn
                                        options={{
                                            authorization: clientToken,
                                            paypal:{
                                                flow:'vault',
                                            },
                                        }}
                                        onInstance={(instance) => setInstance(instance)}
                                    />
                                    <button 
                                        className="make-payment-btn-cart14 btn" 
                                        onClick={handlePayment}
                                        disabled={loading || !instance || !auth?.user?.address} 
                                    >
                                        { loading ? "Processing ..." : "Make Payment"} 
                                    </button>  
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                isOpen={showModal}
                onRequestClose={() => setShowModal(false)}
                contentLabel="Edit Address"
                className="Modal"
                overlayClassName="Overlay"
            >
                <h2>Edit Address</h2>
                <form onSubmit={handleSaveAddress} >
                    <input 
                        type="text" 
                        value={address}
                        onChange={(e) =>setAddress(e.target.value)}
                        id="exampleInputEmail1"
                        placeholder="Address"
                        className="form-control mb-3"
                        autofocus
                    />
                    <button type="submit" className="btn-edit-address btn">Save Address</button>
                    <button className="btn-edit-address btn" onClick={() => setShowModal(false)}>Cancel</button>
                </form>
            </Modal>
        </LayoutNF>
    );
};

export default CartPage;
