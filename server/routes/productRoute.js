const express = require('express');
const formidable = require('express-formidable');
const { requireSignIn, isAdmin } = require('../middlewares/authMiddleware');
const {
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
    productListController,
} = require('../controllers/productController');

const router = express.Router();

// Create product
router.post('/product', requireSignIn, isAdmin, formidable(), createProductController);

// Get all products
router.get('/products', getProductsController);

// Get product by slug
router.get('/product/slug/:slug', getProductController);

// Update product
router.put('/product/:id', requireSignIn, isAdmin, formidable(), updateProductController);

// Search product by keyword
router.get('/product/search/:keyword', searchProductController);

// Search product by ID
router.get('/product/id/:id', requireSignIn, isAdmin, searchProductIDController);

// Get related products
router.get('/product/related/:pid/:cid', relatedProductController);

// Get products by category
router.get('/product/category/:slug', productCategoryController);

// Get URL of photo by id
router.get('/photoURL/:id', getPhotourlController);

// Delete product
router.delete('/delete-product/:id', deleteProductController);

// Product count
router.get('/product-count', productCountController);

// Product per page
router.get('/product-list/:page', productListController);


module.exports = router;
