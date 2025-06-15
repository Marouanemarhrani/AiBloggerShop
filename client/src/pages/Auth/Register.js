import React, { useState } from 'react';
import LayoutLogin from "./../../components/Layout/LayoutLogin";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import "./Register.css";

const Register = () => {
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    // Toggle password visibility
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    //form function
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(
                `${process.env.REACT_APP_API}/api/users/register`, {
                firstname,
                lastname,
                email,
                password,
                phone,
                address,
            });
            if (res && res.data.success) {
                toast.success(res.data.message);
                navigate('/login');
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong');
        }
    };

    return (
        <div className='regbody'>
            <LayoutLogin title="Register">
                <div className='register'>
                    <form onSubmit={handleSubmit}>
                        <h1 className='reg-title'>Join us now </h1>
                        <div className="regdiv mb-3">
                            <input
                                type="text"
                                value={firstname}
                                onChange={(e) => setFirstname(e.target.value)}
                                className="reginput form-control"
                                id="exampleInputName"
                                placeholder='Firstname'
                                required
                            />
                        </div>
                        <div className="regdiv2 mb-3">
                            <input
                                type="text"
                                value={lastname}
                                onChange={(e) => setLastname(e.target.value)}
                                className="reginput form-control"
                                id="exampleInputName"
                                placeholder='Lastname'
                                required
                            />
                        </div>
                        <div className="regdiv3 mb-3">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="reginput form-control"
                                id="exampleInputEmail1"
                                placeholder='Email address'
                                required
                            />
                        </div>
                        <div className="regdiv4 mb-3">
                            <div className="password-wrapper">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="reginput form-control"
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
                        <div className="regdiv5 mb-3">
                            <input
                                type="text"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="reginput form-control"
                                id="exampleInputEmail1"
                                placeholder='Phone number'
                                required
                            />
                        </div>
                        <div className="regdiv6 mb-3">
                            <input
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                className="reginput form-control"
                                id="exampleInputEmail1"
                                placeholder='Address'
                                required
                            />
                        </div>
                        <button type="submit" className="regbtn btn">
                            Let's go
                        </button>
                        <div className='logindiv'>
                            <Link to="/login" className='Logincls'>
                                Already have an account, Login..
                            </Link>
                        </div>
                    </form>
                </div>
            </LayoutLogin>
        </div>
    );
};

export default Register;
