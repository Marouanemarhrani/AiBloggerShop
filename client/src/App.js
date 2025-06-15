import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Policy from "./pages/Policy";
import Pagenotfound from "./pages/Pagenotfound";
import Termsofservice from "./pages/Termsofservice";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import Dashboard from "./pages/user/Dashboard";
import PrivateRoute from "./components/Routes/Private";
import AdminRoute from "./components/Routes/AdminRoute";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CreateCategory from "./pages/admin/CreateCategory";
import CreateProduct from "./pages/admin/CreateProduct";
import Orders from "./pages/user/Orders";
import Profile from "./pages/user/Profile";
import Products from "./pages/admin/Products";
import UpdateProduct from "./pages/admin/UpdateProduct";
import Search from "./pages/Search";
import ProductDetails from "./pages/ProductDetails";
import Categories from "./pages/Categories";
import CategoryProduct from "./pages/CategoryProduct";
import CartPage from "./pages/CartPage";
import AdminOrders from "./pages/admin/AdminOrders";
import CategoriesAdm from "./pages/admin/CategoriesAdm";
import UpdateCategory from "./pages/admin/UpdateCategory";
import CreateBrand from "./pages/admin/CreateBrand";
import Brands from "./pages/admin/Brands";
import UpdateBrand from "./pages/admin/UpdateBrand";
import Companies from "./pages/admin/Companies";
import UpdateCompany from "./pages/admin/UpdateCompany";
import CreateCompany from "./pages/admin/CreateCompany";
import CompanyProduct from "./pages/CompanyProduct";
import ScrollToTop from "./components/ScrollToTop";
import AdminOffers from "./pages/admin/AdminOffers";

function App() {
  return (
    <>
      <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:slug" element={<ProductDetails />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/category/:slug" element={<CategoryProduct />} />
          <Route path="/company/:slug" element={<CompanyProduct />} />
          <Route path="/search" element={<Search />} />
          <Route path="/dashboard" element={<PrivateRoute />}>
            <Route path="user" element={<Dashboard />} />
            <Route path="user/orders" element={<Orders />} />
            <Route path="user/profile" element={<Profile />} />
          </Route>
          <Route path="/dashboard" element={<AdminRoute />}>
            <Route path="admin" element={<AdminDashboard />} />
            <Route path="admin/create-category" element={<CreateCategory />} />
            <Route path="admin/offers" element={<AdminOffers />} />
            <Route path="admin/category/:slug" element={<UpdateCategory />} />
            <Route path="admin/categories" element={<CategoriesAdm/>} />
            <Route path="admin/create-company" element={<CreateCompany />} />
            <Route path="admin/company/:slug" element={<UpdateCompany />} />
            <Route path="admin/companies" element={<Companies/>} />
            <Route path="admin/create-brand" element={<CreateBrand />} />
            <Route path="admin/brand/:slug" element={<UpdateBrand />} />
            <Route path="admin/brands" element={<Brands/>} />
            <Route path="admin/create-product" element={<CreateProduct />} />
            <Route path="admin/product/:slug" element={<UpdateProduct />} />
            <Route path="admin/products" element={<Products />} />
            <Route path="admin/orders" element={<AdminOrders />} />
          </Route>

          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy-policy" element={<Policy />} />
          <Route path="/terms-of-service" element={<Termsofservice />} />
          <Route path="/*" element={<Pagenotfound />} />
        </Routes>
    </>
  );
}

export default App;
