import React, { useState, useEffect } from 'react';
import LayoutNF from '../../components/Layout/LayoutNF';
import UserMenu from '../../components/Layout/UserMenu';
import { useAuth } from '../../context/auth';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap'; // Import Bootstrap components

const Profile = () => {
    //context
    const [auth, setAuth] = useAuth();
    //state
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [showModal, setShowModal] = useState(false); // State to handle modal

    const navigate = useNavigate();

    // Check if the user exists before accessing the properties
    useEffect(() => {
        if (auth?.user) {
            const { firstname, lastname, email, phone, address } = auth?.user;
            setFirstname(firstname);
            setLastname(lastname);
            setPhone(phone);
            setEmail(email);
            setAddress(address);
        } else {
            // Handle the case when no user data is found (e.g., redirect or show an error)
            toast.error("User not found, please log in.");
            navigate('/login');
        }
    }, [auth?.user, navigate]);

    //form function
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put(
                `${process.env.REACT_APP_API}/api/users/profile`, {
                firstname,
                lastname,
                email,
                password,
                phone,
                address,
            });
            if (data?.error) {
                toast.error(data?.error);
            } else {
                setAuth({ ...auth, user: data?.updatedUser });
                let ls = localStorage.getItem("auth");
                ls = JSON.parse(ls);
                ls.user = data.updatedUser;
                localStorage.setItem("auth", JSON.stringify(ls));
                toast.success("Profile Updated successfully");
                navigate('/dashboard/user');
            }
        } catch (error) {
            console.log(error);
            toast.error('Oops.. Something went wrong, Try again');
        }
    };

    // Delete account function
    const handleDeleteAccount = async () => {
        try {
            await axios.delete(`${process.env.REACT_APP_API}/api/users/delete-account`);
            toast.success("Account deleted successfully");
            setAuth(null);
            localStorage.removeItem("auth");
            navigate('/');
        } catch (error) {
            console.error(error);
            toast.error("Error deleting account");
        }
    };

    // Function to show and hide modal
    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    // Render nothing if the auth object is not available yet
    if (!auth?.user) {
        return null;
    }

    return (
        <LayoutNF title={"Profile"}>
            <div className='profuser container-fluid'>
                <div className='profuser1 row'>
                    <div className='profuser2 col-md-3'>
                        <UserMenu />
                    </div>
                    <div className='profuser3 col-md-9'>
                        <div className='profuser4 form-container'>
                            <form onSubmit={handleSubmit}>
                                <h4 className='profuser5 title'>Profile</h4>
                                <div className="profuser6 mb-3">
                                    <input
                                        type="text"
                                        value={firstname}
                                        onChange={(e) => setFirstname(e.target.value)}
                                        className="profuser7 form-control"
                                        placeholder="Firstname"
                                        autoFocus
                                    />
                                </div>
                                <div className="profuser8 mb-3">
                                    <input
                                        type="text"
                                        value={lastname}
                                        onChange={(e) => setLastname(e.target.value)}
                                        className="profuser9 form-control"
                                        placeholder="Lastname"
                                        autoFocus
                                    />
                                </div>
                                <div className="profuser10 mb-3">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="profuser11 form-control"
                                        placeholder="Email"
                                        disabled
                                    />
                                </div>
                                <div className="profuser12 mb-3">
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="profuser13 form-control"
                                        placeholder="Password"
                                    />
                                </div>
                                <div className="profuser14 mb-3">
                                    <input
                                        type="text"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        className="profuser15 form-control"
                                        placeholder="Phone number"
                                    />
                                </div>
                                <div className="profuser16 mb-3">
                                    <input
                                        type="text"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        className="profuser17 form-control"
                                        placeholder="Address"
                                    />
                                </div>
                                <button type="submit" className="profuser18 btn btn">
                                    Update
                                </button>
                            </form>

                            {/* Button to trigger modal for account deletion */}
                            <button className="profuser19 btn btn-danger mt-4" onClick={handleShowModal}>
                                Delete Account
                            </button>

                            {/* Modal for delete confirmation */}
                            <Modal show={showModal} onHide={handleCloseModal}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Confirm Account Deletion</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>Are you sure you want to delete your account? This action cannot be undone.</Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleCloseModal}>
                                        Cancel
                                    </Button>
                                    <Button variant="danger" onClick={handleDeleteAccount}>
                                        Delete Account
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                        </div>
                    </div>
                </div>
            </div>
        </LayoutNF>
    );
};

export default Profile;
