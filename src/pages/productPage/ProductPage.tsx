import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { IProduct } from "../../interfaces/productInterfaces";
import Loader from "../../components/loader/Loader";
import CustomRating from "../../components/ratingStars/CustomRating";
import CustomError from "../../components/error/CurstomError";

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const products = useSelector((state: RootState) => state.products.products);
  const [product, setProductState] = useState<IProduct | null>(null);
  const [loading, setLoadingState] = useState(true);

  useEffect(() => {
    const productFromStore = products.find((prod) => prod.id === id);

    if (productFromStore) {
      setProductState(productFromStore);
      setLoadingState(false);
    } else {
      const fetchProduct = async () => {
        try {
          setLoadingState(true);
          const response = await fetch(
            `${import.meta.env.VITE_API_URL}/products/${id}`
          );
          const data = await response.json();
          setProductState(data);
          setLoadingState(false);
        } catch (error) {
          console.error(error);
          setLoadingState(false);
        }
      };

      fetchProduct();
    }
  }, [id, products, dispatch]);

  const handleNavigateBack = () => {
    navigate("/products");
  };

  console.log(product);

  if (loading) return <Loader />;

  return (
    <div className="flex flex-col min-h-screen bg-white items-center gap-12 py-10">
      <div className="w-[840px]">
        <button
          className="border border-slate-900 bg-white py-2 px-5 rounded-md text-slate-900 shadow-md"
          onClick={handleNavigateBack}
        >
          Back to all products
        </button>
      </div>
      {product ? (
        <div className="flex justify-center px-40 gap-12">
          <div className="w-[400px] flex justify-end items-center">
            <img src={product.image} alt={product.title} />
          </div>
          <div className="w-[440px] flex flex-col justify-center border-l-2 border-sky-950 pl-8">
            <h1 className="text-5xl pb-3 font-bold mb-10 border-b-2 border-sky-950 text-slate-950">
              {product.title}
            </h1>
            <p className="text-xl italic mb-4">{product.description}</p>
            <CustomRating rating={product.rating.rate} />
            <p className="text-3xl mt-7 text-slate-950">
              Price: {product.price} $
            </p>
          </div>
        </div>
      ) : (
        <div className="w-full flex text-xl text-red-600 justify-center p-20">
          <CustomError error="Product is not found." />
        </div>
      )}
    </div>
  );
};

export default ProductPage;
