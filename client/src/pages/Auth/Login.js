import React, { useState } from 'react';
import LayoutLogin from "./../../components/Layout/LayoutLogin";
import axios from "axios";
import { useNavigate, useLocation } from 'react-router-dom';
import toast from "react-hot-toast";
import { useAuth } from '../../context/auth';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import "./Login.css";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [auth, setAuth] = useAuth();
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    // Toggle password visibility
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    //form function
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(
                `${process.env.REACT_APP_API}/api/users/login`, {
                email,
                password,
            });
            if (res && res.data.success) {
                toast.success(res.data && res.data.message);
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token,
                });
                localStorage.setItem("auth", JSON.stringify(res.data));
                navigate(location.state || '/');
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong');
        }
    };

    return (
        <div className='bodylogin'>
            <LayoutLogin title="Login">
                <div className='login'>
                    <h1 className='h1'>Who goes there?</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="divemail mb-3">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="fclas form-control"
                                id="InputEmail1"
                                placeholder='Email address'
                                required
                            />
                        </div>
                        <div className="divpass mb-3">
                            <div className="password-wrapper">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="fclas form-control"
                                    id="exampleInputPassword1"
                                    placeholder='Password'
                                    required
                                />
                                {password && (
                                    <span onClick={togglePasswordVisibility} className="password-toggle-icon">
                                        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                                    </span>
                                )}
                            </div>
                        </div>
                        <button type="submit" className="btncls btn btn">
                            It's me
                        </button>
                        <div className='divbtn mb-3'>
                            <button
                                type="button"
                                className="frgtclass btn"
                                onClick={() => { navigate('/forgot-password'); }}>
                                Forgot Password
                            </button>
                        </div>
                        <div className='divreg'>
                            <Link to="/register" className='registercls'>
                                Don't have an account, register now!
                            </Link>
                        </div>
                    </form>
                </div>
            </LayoutLogin>
        </div>
    );
};

export default Login;
