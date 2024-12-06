import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { setProducts, setLoading, setError } from "../../redux/productsSlice";
import Loader from "../../components/loader/Loader";
import ProductCard from "../../components/productCard/ProductCard";
import CustomError from "../../components/error/CurstomError";
import { fetchProductsFromApi } from "../../services/api";

const ProductsList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, favorites, loading, error } = useSelector(
    (state: RootState) => state.products
  );

  const [filter, setFilter] = useState("all");

  // const [itemsPerPage, setItemsPerPage] = useState(10);
  // const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (products.length === 0) {
      const loadProducts = async () => {
        try {
          dispatch(setLoading(true));
          const data = await fetchProductsFromApi();
          dispatch(setProducts(data));
        } catch (error) {
          console.error(error);
          dispatch(setError("Failed to fetch products."));
        } finally {
          dispatch(setLoading(false));
        }
      };

      loadProducts();
    }
  }, [dispatch, products.length]);

  const filteredProducts = filter === "favorites" ? favorites : products;

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(event.target.value);
  };

  const handleCreateProduct = () => {
    navigate("/create-product");
  };

  if (loading) return <Loader />;

  if (error) return <CustomError error={error} />;

  return (
    <div>
      <div className="flex justify-center items-center gap-5 mt-8">
        <div className="border border-sky-950 rounded-md">
          <select
            className="h-9 px-2 bg-slate-50 text-sky-950 rounded outline-none cursor-pointer shadow-md"
            value={filter}
            onChange={handleFilterChange}
          >
            <option value="all">All Products</option>
            <option value="favorites">Favorites Only</option>
          </select>
        </div>
        <button
          className="h-9 px-3 border border-sky-950 text-sky-950 bg-slate-50 rounded shadow-md"
          onClick={handleCreateProduct}
        >
          Create Product
        </button>
      </div>

      <ul className="flex flex-wrap justify-center p-8 gap-8">
        {filteredProducts.length > 0 ? (
          filteredProducts
            .slice()
            .reverse()
            .map((product) => (
              <li key={product.id}>
                <ProductCard product={product} />
              </li>
            ))
        ) : (
          <div>No products available.</div>
        )}
      </ul>
    </div>
  );
};

export default ProductsList;
