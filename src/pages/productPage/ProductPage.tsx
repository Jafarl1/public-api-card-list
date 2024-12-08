import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IProduct } from "../../interfaces/productInterfaces";
import Loader from "../../components/loader/Loader";
import CustomRating from "../../components/ratingStars/CustomRating";
import CustomError from "../../components/error/CurstomError";
import { fetchProductInfoFromApi } from "../../services/api";

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<IProduct | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await fetchProductInfoFromApi(id || "");
        setProduct(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleNavigateBack = () => {
    navigate("/products");
  };

  if (loading) return <Loader />;

  return (
    <div className="flex flex-col min-h-screen bg-white items-center gap-12 py-10">
      <div className="w-full pl-7 lg:w-[840px] lg:pl-0">
        <button
          className="border border-slate-900 bg-white py-2 px-5 rounded-md text-slate-900 shadow-md"
          onClick={handleNavigateBack}
        >
          Back to all products
        </button>
      </div>
      {product ? (
        <div className="flex flex-col lg:flex-row justify-center px-7 lg:px-40 gap-16">
          <div className="w-4/6 mx-auto lg:w-[400px] flex justify-end items-center">
            <img src={product.image} alt={product.title} />
          </div>
          <div className="w-full lg:w-[440px] flex flex-col justify-center border-l-2 border-sky-950 pl-8">
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
