import { Routes, Route } from "react-router-dom";
import Header from "./components/header/Header";
import Home from "./pages/home/Home";
import ProductsList from "./pages/productsList/ProductsList";
import ProductPage from "./pages/productPage/ProductPage";
import CreateProduct from "./components/createProduct/CreateProduct";

const App = () => {
  return (
    <div className="w-full min-h-screen bg-slate-200">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductsList />} />
        <Route path="/products/:id" element={<ProductPage />} />
        <Route path="/create-product" element={<CreateProduct />} />
      </Routes>
    </div>
  );
};

export default App;
