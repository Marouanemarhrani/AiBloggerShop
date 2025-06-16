const userModel = require('../models/userModel');
const orderModel = require('../models/orderModel');
const { comparePassword, hashPassword } = require('../helpers/authHelper');
const JWT = require('jsonwebtoken');

// Register a new user
const registerController = async (req, res) => {
    try {
      const { firstname, lastname, email, password, confirmPassword } = req.body;
  
      // 1. Required fields
      const requiredFields = { firstname, lastname, email, password, confirmPassword };
      for (const [field, value] of Object.entries(requiredFields)) {
        if (!value) {
          return res.status(400).send({
            success: false,
            message: `${field.charAt(0).toUpperCase() + field.slice(1)} is required.`,
          });
        }
      }
  
      // 2. Password match
      if (password !== confirmPassword) {
        return res.status(400).send({
          success: false,
          message: "Password and confirmation do not match.",
        });
      }
  
      // 3. Password strength validation BEFORE hashing
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
      if (!passwordRegex.test(password)) {
        return res.status(400).send({
          success: false,
          message:
            "Password must be at least 8 characters and include uppercase, lowercase, number, and special character.",
        });
      }
  
      // 4. Check if user exists
      const existingUser = await userModel.findOne({ email });
      if (existingUser) {
        return res.status(400).send({
          success: false,
          message: "An account already exists with this email.",
        });
      }
  
      // 5. Hash password and save user
      const hashedPassword = await hashPassword(password);
      const user = new userModel({
        firstname,
        lastname,
        email,
        password: hashedPassword,
      });
  
      await user.save();
  
      // 6. Return success response
      res.status(201).send({
        success: true,
        message: "Account registered successfully.",
        user: {
          id: user._id,
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          role: user.role,
          createdAt: user.createdAt,
        },
      });
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "Server error. Please try again later.",
      });
    }
  };  

// Login user
const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).send({
                success: false,
                message: 'Email and password are required',
            });
        }

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User doesn't exist. Please register or try another email.",
            });
        }

        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) {
            return res.status(400).send({
                success: false,
                message: "Incorrect email or password!",
            });
        }

        const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "5h" });

        res.status(200).send({
            success: true,
            message: "Login successful!",
            user: {
                _id: user._id,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                phone: user.phone,
                street: user.street,
                city: user.city,
                postalCode: user.postalCode,
                country: user.country,
                role: user.role,
            },
            token,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "An unexpected error occurred during login. Please try again.",
            error,
        });
    }
};

    // Update profile
    const updateProfileController = async (req, res) => {
        try {
            const {
                firstname,
                lastname,
                email,
                oldPassword,
                newPassword,
                confirmPassword,
                phone,
                street,
                city,
                postalCode,
                country
            } = req.body;

            const user = await userModel.findById(req.user._id);
            let updatedFields = {
                firstname: firstname || user.firstname,
                lastname: lastname || user.lastname,
                phone: phone || user.phone,
                street: street || user.street,
                city: city || user.city,
                postalCode: postalCode || user.postalCode,
                country: country || user.country,
            };

            // If user is attempting to change password
            if (oldPassword || newPassword || confirmPassword) {
                if (!oldPassword || !newPassword || !confirmPassword) {
                    return res.status(400).json({
                        success: false,
                        message: "To change your password, all password fields must be filled.",
                    });
                }

                // Check if old password is correct
                const isMatch = await comparePassword(oldPassword, user.password);
                if (!isMatch) {
                    return res.status(400).json({
                        success: false,
                        message: "Old password is incorrect.",
                    });
                }

                // Check if new passwords match
                if (newPassword !== confirmPassword) {
                    return res.status(400).json({
                        success: false,
                        message: "New password and confirmation do not match.",
                    });
                }

                // Validate new password strength
                const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
                const isStrong = passwordRegex.test(newPassword);
                if (!isStrong) {
                    return res.status(400).json({
                        success: false,
                        message: "New password must be at least 8 characters and include uppercase, lowercase, number, and special character.",
                    });
                }

                updatedFields.password = await hashPassword(newPassword);
            }

            const updatedUser = await userModel.findByIdAndUpdate(
                req.user._id,
                updatedFields,
                { new: true }
            );

            res.status(200).send({
                success: true,
                message: 'Profile updated successfully!',
                updatedUser,
            });

        } catch (error) {
            console.log(error);
            res.status(500).send({
                success: false,
                message: "There was an error updating the profile.",
                error,
            });
        }
    };

// Delete user account
const deleteUserController = async (req, res) => {
    try {
        const user = await userModel.findByIdAndDelete(req.user._id);

        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User not found",
            });
        }

        res.status(200).send({
            success: true,
            message: "Account deleted successfully",
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "An error occurred while deleting the account",
            error,
        });
    }
};

// Get user's orders
const getOrdersController = async (req, res) => {
    try {
        const orders = await orderModel
            .find({ buyer: req.user._id })
            .populate("products", "-photo")
            .populate("buyer", "name");
        res.json(orders);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in getting orders",
            error,
        });
    }
};

// Get all orders
const getAllOrdersController = async (req, res) => {
    try {
        const orders = await orderModel
            .find({})
            .populate("products", "-photo")
            .populate("buyer", "name")
            .sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in getting all orders",
            error,
        });
    }
};

// Update order status
const orderStatusController = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;
        const orders = await orderModel.findByIdAndUpdate(
            orderId,
            { status },
            { new: true }
        );
        res.status(200).send({
            success: true,
            message: 'Order status updated successfully',
            orders,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "There was an error while updating the order",
            error,
        });
    }
};

// Update user's address
const updateAddressController = async (req, res) => {
    try {
        const { street, city, postalCode, country } = req.body;
        const updatedAddress = await userModel.findByIdAndUpdate(req.user._id, {
            street: street || req.user.street,
            city: city || req.user.city,
            postalCode: postalCode || req.user.postalCode,
            country: country || req.user.country,
        }, { new: true });

        res.status(200).send({
            success: true,
            message: 'Address updated successfully',
            updatedAddress,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "There was an error in updating the address",
            error,
        });
    }
};

module.exports = {
    registerController,
    loginController,
    updateProfileController,
    getOrdersController,
    getAllOrdersController,
    orderStatusController,
    updateAddressController,
    deleteUserController,
};
