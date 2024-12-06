import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div className="w-full h-14 px-48 bg-sky-950 flex items-center justify-between shadow-md">
      <h1 className="text-white text-lg">LOGO</h1>
      <nav className="flex gap-6 text-slate-50">
        <NavLink to="/products">Products</NavLink>
        <NavLink to="/create-product">Create Product</NavLink>
      </nav>
    </div>
  );
};

export default Header;
