import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout/Layout';
import UserMenu from '../../components/Layout/UserMenu';
import axios from 'axios';
import { useAuth } from '../../context/auth';
import toast from 'react-hot-toast';
import './Profile.css';

const Profile = () => {
    const [auth, setAuth] = useAuth();
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [country, setCountry] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    useEffect(() => {
        const { firstname, lastname, email, phone, street, city, postalCode, country } = auth?.user;
        setFirstname(firstname);
        setLastname(lastname);
        setEmail(email);
        setPhone(phone || '');
        setStreet(street || '');
        setCity(city || '');
        setPostalCode(postalCode || '');
        setCountry(country || '');
    }, [auth?.user]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { data } = await axios.put(
                `${process.env.REACT_APP_API}/api/users/profile`, {
                firstname,
                lastname,
                email,
                phone,
                oldPassword,
                newPassword,
                confirmPassword,
                street,
                city,
                postalCode,
                country
            });

            if (!data?.success) {
                toast.error(data?.message || 'Something went wrong');
            } else {
                setAuth({ ...auth, user: data?.updatedUser });
                localStorage.setItem('auth', JSON.stringify({ ...auth, user: data?.updatedUser }));
                toast.success('Profile updated successfully');
            }            
        } catch (err) {
            toast.error('Something went wrong');
        }
    };

    return (
        <Layout title={'Your Profile'}>
            <div className='profuser container-fluid p-3'>
                <div className='profuser1 row'>
                    <div className='profuser2 col-md-3'>
                        <UserMenu />
                    </div>
                    <div className='profuser3 col-md-9'>
                        <div className='profuser4'>
                            <h3 className='profuser5'>Profile</h3>
                            <form onSubmit={handleSubmit}>
                                <div className='profuser6'>
                                    <label>Firstname</label>
                                    <input type="text" className='profuser7' value={firstname} onChange={(e) => setFirstname(e.target.value)} required />
                                </div>
                                <div className='profuser8'>
                                    <label>Lastname</label>
                                    <input type="text" className='profuser9' value={lastname} onChange={(e) => setLastname(e.target.value)} required />
                                </div>
                                <div className='profuser10'>
                                    <label>Email</label>
                                    <input type="email" className='profuser11' value={email} disabled />
                                </div>
                                <div className='profuser12'>
                                    <label>Phone</label>
                                    <input type="text" className='profuser13' value={phone} onChange={(e) => setPhone(e.target.value)} />
                                </div>

                                <div className="address-group">
                                    <label className="address-label">Address</label>
                                    <div className='profuser12'>
                                        <input type="text" className='profuser13' placeholder='Street' value={street} onChange={(e) => setStreet(e.target.value)} />
                                    </div>
                                    <div className='profuser-address-row'>
                                        <input type="text" className='profuser13 half-width' placeholder='City' value={city} onChange={(e) => setCity(e.target.value)} />
                                        <input type="text" className='profuser13 half-width' placeholder='Postal Code' value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
                                    </div>
                                    <div className='profuser12'>
                                        <input type="text" className='profuser13' placeholder='Country' value={country} onChange={(e) => setCountry(e.target.value)} />
                                    </div>
                                </div>

                                <hr />

                                <div className='profuser14'>
                                    <label>Old Password</label>
                                    <input type="password" className='profuser15' value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
                                </div>
                                <div className='profuser14'>
                                    <label>New Password</label>
                                    <input type="password" className='profuser15' value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                                </div>
                                <div className='profuser14'>
                                    <label>Confirm New Password</label>
                                    <input type="password" className='profuser15' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                                </div>

                                <button type="submit" className='profuser18'>Update</button>
                            </form>

                            <hr />
                            <div className="mt-3 text-end">
                                <button className="btn btn-danger">Delete Account</button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Profile;