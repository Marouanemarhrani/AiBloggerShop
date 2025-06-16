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
    const [errorMatch, setErrorMatch] = useState(false);

    const navigate = useNavigate();

    const togglePasswordVisibility = () => setShowPassword(!showPassword);
    const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

    const validatePassword = (value) => {
        return {
            lowercase: /[a-z]/.test(value),
            uppercase: /[A-Z]/.test(value),
            number: /\d/.test(value),
            specialChar: /[!@#$%^&*()_\-+=]/.test(value),
            length: value.length >= 8
        };
    };

    const rules = validatePassword(password);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setErrorMatch(true);
            return;
        }
        setErrorMatch(false);

        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/users/register`, {
                firstname,
                lastname,
                email,
                password,
                confirmPassword
            });

            if (res && res.data.success) {
                toast.success(res.data.message);
                navigate('/login');
            } else {
                toast.error(res.data.message || "Registration failed.");
            }
        } catch (error) {
            const serverMessage = error?.response?.data?.message;
            if (serverMessage) {
                toast.error(serverMessage);
            } else {
                toast.error("An unexpected error occurred. Please try again.");
            }
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

                        <div className="regdiv4 mb-2">
                            <div className="password-wrapper">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="reginput form-control"
                                    placeholder='Password'
                                    required
                                />
                                <span className="password-toggle-icon" onClick={togglePasswordVisibility}>
                                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                                </span>
                            </div>
                            <ul className="password-checklist">
                                <li className={rules.lowercase ? 'valid' : 'invalid'}>
                                A lowercase letter
                                </li>
                                <li className={rules.uppercase ? 'valid' : 'invalid'}>
                                A capital (uppercase) letter
                                </li>
                                <li className={rules.number ? 'valid' : 'invalid'}>
                                A number
                                </li>
                                <li className={rules.specialChar ? 'valid' : 'invalid'}>
                                A special character (&%$!_-)
                                </li>
                                <li className={rules.length ? 'valid' : 'invalid'}>
                                Minimum 8 characters
                                </li>
                            </ul>
                        </div>

                        <div className="regdiv4 mb-3">
                            <div className={`password-wrapper ${errorMatch ? 'invalid' : ''}`}>
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="reginput form-control"
                                    placeholder='Confirm Password'
                                    required
                                />
                                <span className="password-toggle-icon" onClick={toggleConfirmPasswordVisibility}>
                                    <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
                                </span>
                            </div>
                            {errorMatch && (
                                <div className="error-text">Password and Confirm Password must match.</div>
                            )}
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