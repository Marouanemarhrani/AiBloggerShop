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
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        try {
            const res = await axios.post(
                `${process.env.REACT_APP_API}/api/users/register`,
                { firstname, lastname, email, password, confirmPassword }
              );              
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
                        <h1 className='reg-title'>Join us now</h1>

                        <div className="regdiv mb-3">
                            <input
                                type="text"
                                value={firstname}
                                onChange={(e) => setFirstname(e.target.value)}
                                className="reginput form-control"
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

                        <div className="regdiv4 mb-3">
                            <div className="password-wrapper">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="reginput form-control"
                                    placeholder='Confirm Password'
                                    required
                                />
                                {confirmPassword && (
                                    <span onClick={toggleConfirmPasswordVisibility} className="password-toggle-icon">
                                        <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
                                    </span>
                                )}
                            </div>
                        </div>

                        <button type="submit" className="regbtn btn">
                            Let's go
                        </button>

                        <div className='logindiv'>
                            <Link to="/login" className='Logincls'>
                                Already have an account? Login..
                            </Link>
                        </div>
                    </form>
                </div>
            </LayoutLogin>
        </div>
    );
};

export default Register;
