import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToFavorites,
  removeFromFavorites,
  removeProduct,
} from "../../redux/productsSlice";
import { RootState } from "../../redux/store";
import { deleteProductFromApi } from "../../services/api";
import { useNavigate } from "react-router-dom";
import favIcon from "../../assets/icons/fav_icon.png";
import favIconFilled from "../../assets/icons/fav_icon_filled.png";
import removeIcon from "../../assets/icons/remove_icon.png";
import { IProduct } from "../../interfaces/productInterfaces";
import { PropagateLoader } from "react-spinners";
import confirmDeletion, { deletedAlert, errorAlert } from "../../alerts/swal";

interface ProductCardProps {
  product: IProduct;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const favorites = useSelector((state: RootState) => state.products.favorites);
  const isFavorite = favorites.some(
    (favProduct) => favProduct.id === product.id
  );
  const [loading, setLoading] = useState(false);

  const toggleFavorite = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (isFavorite) {
      dispatch(removeFromFavorites(product.id));
    } else {
      dispatch(addToFavorites(product));
    }
  };

  const handleDelete = async (event: React.MouseEvent) => {
    event.stopPropagation();
    confirmDeletion(product.title).then(
      async (result: { isConfirmed: boolean }) => {
        if (result.isConfirmed) {
          try {
            setLoading(true);
            await deleteProductFromApi(product.id);
            dispatch(removeProduct(product.id));

            if (isFavorite) {
              dispatch(removeFromFavorites(product.id));
            }

            deletedAlert();
          } catch (error) {
            console.error(error);
            errorAlert("Failed to delete the product.");
          } finally {
            setLoading(false);
          }
        }
      }
    );
  };

  const handleCardClick = () => {
    navigate(`/products/${product.id}`);
  };

  return (
    <div
      className="w-96 py-5 h-auto bg-white rounded-lg shadow-lg cursor-pointer overflow-hidden relative"
      onClick={handleCardClick}
    >
      <div className="h-[400px] p-6 flex justify-center items-center">
        <img src={product.image} className="max-h-full" alt={product.title} />
      </div>
      <h2
        className="w-full m-3 text-2xl font-bold truncate max-w-80 overflow-hidden whitespace-nowrap"
        title={product.title}
      >
        {product.title}
      </h2>
      <p
        className="w-full px-3 mb-5 text-xl truncate max-w-80 overflow-hidden whitespace-nowrap"
        title={product.description}
      >
        {product.description}
      </p>
      <p className="px-3 text-xl font-semibold">{product.price} $</p>

      <div>
        <img
          src={isFavorite ? favIconFilled : favIcon}
          className="w-8 absolute top-3 left-3 cursor-pointer"
          alt="favicon"
          onClick={toggleFavorite}
        />
      </div>

      <div>
        <img
          src={removeIcon}
          className="w-8 absolute top-3 right-3 cursor-pointer"
          alt="delete"
          onClick={handleDelete}
        />
      </div>

      {loading ? (
        <div className="w-full h-full bg-opacity-80 bg-sky-950 absolute top-0 left-0 flex justify-center items-center">
          <PropagateLoader color="#ffffff" />
        </div>
      ) : null}
    </div>
  );
};

export default ProductCard;
