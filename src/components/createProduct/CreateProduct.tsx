import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { setLoading, addProduct } from "../../redux/productsSlice";
import Loader from "../loader/Loader";
import { IProduct } from "../../interfaces/productInterfaces";
import { nanoid } from "nanoid";
import { fetchCategories, createProduct } from "../../services/api";
import CustomError from "../error/CurstomError";
import Swal from "sweetalert2";

const CreateProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state: RootState) => state.products);
  const [availableCategories, setAvailableCategories] = useState([]);
  const [fetchError, setFetchError] = useState("");

  const [formData, setFormData] = useState<IProduct>({
    id: nanoid(),
    title: "",
    price: "",
    category: "",
    description: "",
    image: "",
    rating: {
      count: "",
      rate: "",
    },
  });

  const [errors, setErrors] = useState({
    category: "",
    description: "",
    price: "",
    image: "",
    title: "",
  });

  const capitalize = (str: string) => {
    return str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : str;
  };

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = () => {
    const newErrors = {
      category: "",
      description: "",
      price: "",
      image: "",
      title: "",
    };
    let isValid = true;

    if (!formData.title) {
      newErrors.title = "Title is required";
      isValid = false;
    }

    if (!formData.description) {
      newErrors.description = "Description is required";
      isValid = false;
    }

    if (+formData.price <= 0) {
      newErrors.price = "Price must be greater than 0";
      isValid = false;
    }

    if (!formData.image) {
      newErrors.image = "Image URL is required";
      isValid = false;
    }

    if (!formData.category) {
      newErrors.category = "Category is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const resetForm = () => {
    setFormData({
      id: nanoid(),
      title: "",
      price: "",
      category: "",
      description: "",
      image: "",
      rating: {
        count: "",
        rate: "",
      },
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (validate()) {
      dispatch(addProduct(formData));

      try {
        const data = await createProduct(formData);
        if (data) {
          Swal.fire({
            title: "Good job!",
            text: "You added a new product!",
            icon: "success",
            showCancelButton: true,
            confirmButtonText: "Go to products page",
            confirmButtonColor: "#02bd02",
            cancelButtonText: "Stay here",
            cancelButtonColor: "#075985",
          }).then((result) => {
            resetForm();
            if (result.isConfirmed) {
              navigate("/products");
            }
          });
        }
      } catch (error) {
        console.error(error);
        Swal.fire({
          title: "Error!",
          text: "Failed to add the product.",
          icon: "error",
          confirmButtonColor: "#d33",
        });
      }
    }
  };

  useEffect(() => {
    const fetchCategoriesData = async () => {
      try {
        dispatch(setLoading(true));
        const data = await fetchCategories();
        setAvailableCategories(data);
        dispatch(setLoading(false));
      } catch (error) {
        console.error(error);
        setFetchError("Failed to fetch available categories.");
        dispatch(setLoading(false));
      }
    };

    fetchCategoriesData();
  }, [dispatch]);

  if (loading) return <Loader />;

  if (fetchError) return <CustomError error={fetchError} />;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white border rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Create New Product
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-sky-800 focus:border-sky-800"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-500">{errors.title}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700"
          >
            Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-sky-800 focus:border-sky-800"
          >
            <option value="">Select Category</option>
            {availableCategories.map((item) => (
              <option value={item} key={item}>
                {capitalize(item)}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="mt-1 text-sm text-red-500">{errors.category}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-sky-800 focus:border-sky-800"
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-500">{errors.description}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700"
          >
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-sky-800 focus:border-sky-800"
          />
          {errors.price && (
            <p className="mt-1 text-sm text-red-500">{errors.price}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-700"
          >
            Image URL
          </label>
          <input
            type="text"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-sky-800 focus:border-sky-800"
          />
          {errors.image && (
            <p className="mt-1 text-sm text-red-500">{errors.image}</p>
          )}
        </div>

        <div className="mb-4 grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="ratingRate"
              className="block text-sm font-medium text-gray-700"
            >
              Rating
            </label>
            <input
              type="number"
              id="ratingRate"
              name="ratingRate"
              value={formData.rating.rate}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  rating: {
                    ...formData.rating,
                    rate: e.target.value,
                  },
                });
              }}
              min="0"
              max="5"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-sky-800 focus:border-sky-800"
            />
          </div>

          <div>
            <label
              htmlFor="ratingCount"
              className="block text-sm font-medium text-gray-700"
            >
              Rating Count
            </label>
            <input
              type="number"
              id="ratingCount"
              name="ratingCount"
              value={formData.rating.count}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  rating: {
                    ...formData.rating,
                    count: e.target.value,
                  },
                });
              }}
              min="0"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-sky-800 focus:border-sky-800"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-sky-900 text-white font-semibold rounded-md shadow-sm hover:bg-sky-800 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:ring-opacity-50"
        >
          Create Product
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;
