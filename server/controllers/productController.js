const productModel = require("../models/productModel");
const categoryModel = require("../models/categoryModel");
const fs = require("fs");
const slugify = require("slugify");
const dotenv = require("dotenv");

dotenv.config();

const validateProductFields = (fields, files) => {
    const { name, description, price, category, quantity } = fields;
    const { photo } = files;
    if (!name) return { error: "Name is required" };
    if (!description) return { error: "Description is required" };
    if (!price) return { error: "Price is required" };
    if (!category) return { error: "Category is required" };
    if (!quantity) return { error: "Quantity is required" };
    if (!photo || photo.size > 1000000) return { error: "Photo is required and should be less than 1MB" };
    return null;
};

const createProductController = async (req, res) => {
    try {
        const validationError = validateProductFields(req.fields, req.files);
        if (validationError) return res.status(400).send(validationError);

        const { name } = req.fields;
        const { photo } = req.files;
        const product = new productModel({ ...req.fields, slug: slugify(name) });

        if (photo) {
            product.photo.data = fs.readFileSync(photo.path);
            product.photo.contentType = photo.type;
        }

        await product.save();
        res.status(201).send({
            success: true,
            message: 'Product created successfully',
            product,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: 'Error creating product',
            error,
        });
    }
};

const getProductsController = async (req, res) => {
    try {
        const products = await productModel.find({})
            .populate('category')
            .select("-photo")
            .limit(100)
            .sort({ createdAt: -1 });

        res.status(200).send({
            totalProducts: products.length,
            success: true,
            message: "Products retrieved successfully",
            products,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "Error retrieving products",
            error,
        });
    }
};

const getProductController = async (req, res) => {
    try {
        const product = await productModel.findOne({ slug: req.params.slug })
            .select("-photo")
            .populate("category");

        if (!product) {
            return res.status(404).send({
                success: false,
                message: "Product not found",
            });
        }

        res.status(200).send({
            success: true,
            message: "Product details retrieved successfully",
            product,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "Error retrieving product details",
            error,
        });
    }
};

const updateProductController = async (req, res) => {
    try {
        const validationError = validateProductFields(req.fields, req.files);
        if (validationError) return res.status(400).send(validationError);

        const { name } = req.fields;
        const { photo } = req.files;
        const product = await productModel.findByIdAndUpdate(
            req.params.id,
            { ...req.fields, slug: slugify(name) },
            { new: true }
        );

        if (photo) {
            product.photo.data = fs.readFileSync(photo.path);
            product.photo.contentType = photo.type;
        }

        await product.save();
        res.status(200).send({
            success: true,
            message: 'Product updated successfully',
            product,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: 'Error updating product',
            error,
        });
    }
};

const searchProductController = async (req, res) => {
    try {
        const { keyword } = req.params;
        const results = await productModel.find({
            $or: [
                { name: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
            ],
        }).select("-photo");

        res.status(200).json(results);
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "Error searching products",
            error,
        });
    }
};

const relatedProductController = async (req, res) => {
    try {
        const { pid, cid } = req.params;
        const products = await productModel.find({
            category: cid,
            _id: { $ne: pid },
        }).select("-photo")
            .limit(3)
            .populate("category");

        res.status(200).send({
            success: true,
            products,
        });
    } catch (error) {
        console.error(error);
        res.status(400).send({
            success: false,
            message: "Error retrieving related products",
            error,
        });
    }
};

const productCategoryController = async (req, res) => {
    try {
        const category = await categoryModel.findOne({ slug: req.params.slug });
        const products = await productModel.find({ category }).populate('category');

        res.status(200).send({
            success: true,
            category,
            products,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "Error retrieving products by category",
            error,
        });
    }
};

const searchProductIDController = async (req, res) => {
    try {
        const product = await productModel.findOne({ _id: req.params.id })
            .select("-photo")
            .populate("category");

        if (!product) {
            return res.status(404).send({
                success: false,
                message: "Product not found",
            });
        }

        res.status(200).send({
            success: true,
            message: "Product details retrieved successfully",
            product,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "Error retrieving product details",
            error,
        });
    }
};

const getPhotourlController = async (req, res) => {
    try {
        const photoURL = await productModel.findById(req.params.id).select("photo");
        if (photoURL.photo.data) {
            res.set("Content-type", photoURL.photo.contentType);
            return res.status(200).send(photoURL.photo.data);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "There was an error in getting the photo url",
            error,
        });
    }
};

const deleteProductController = async (req, res) => {
    try {
        const productId = req.params.id;
        const result = await productModel.findByIdAndDelete(productId);

        if (!result) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        res.json({ success: true, message: 'Product deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

const productCountController = async (req, res) => {
    try {
        const total = await productModel.find({}).estimatedDocumentCount();
        res.status(200).send({
            success: true,
            total,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "There was an error in product counting",
            error,
        });
    }
};

const productListController = async (req, res) => {
    try {
        const perPage = 6;
        const page = req.params.page ? req.params.page : 1;
        const products = await productModel
            .find({})
            .select("-photo")
            .skip((page - 1) * perPage)
            .limit(perPage)
            .sort({ createdAt: -1 });
        res.status(200).send({
            success: true,
            products,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "There was an error in product per page",
            error,
        });
    }
};

module.exports = {
    createProductController,
    getProductsController,
    getProductController,
    updateProductController,
    searchProductController,
    relatedProductController,
    productCategoryController,
    searchProductIDController,
    getPhotourlController,
    deleteProductController,
    productCountController,
    productListController
};
