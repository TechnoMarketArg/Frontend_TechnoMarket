import PropTypes from "prop-types";

import { MDBBtn, MDBBtnGroup } from "mdb-react-ui-kit";
import { useContext, useEffect, useState } from "react";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
import { AuthenticationContext } from "../../services/authentication/Authentication.context";
import { toast } from "sonner";
import { useDarkMode } from "../../services/DarkMode/DarkModeContext";
import { useUpdateUser } from "../customHook/CustomHook";

const ProductInformation = ({ product }) => {
  const { darkMode } = useDarkMode();
  const [selectedVariants, setSelectedVariants] = useState({});
  const { user, updateUserFavorites } = useContext(AuthenticationContext);
  const [isFollower, setIsFollower] = useState(false);
  const { loading, updateUser } = useUpdateUser();

  useEffect(() => {
    if (user && user.ProductsFavorites) {
      const isFavorited = user.ProductsFavorites.some(
        (favProduct) => favProduct.id === product.id
      );
      setIsFollower(isFavorited);
    }
  }, [user, product.id]);

  const handleSelection = (variantType, option) => {
    setSelectedVariants({
      ...selectedVariants,
      [variantType]: option,
    });
  };

  const navigate = useNavigate();

  const navigateCategory = (name) => {
    navigate(`/categories/${name}`, {
      state: {
        category: {
          name,
        },
      },
    });
  };

  const handleClickStore = (id) => {
    if (user) {
      navigate(`/stores/${id}`, {
        state: {
          stores: {
            id,
          },
        },
      });
    } else {
      toast.error("Sign in to view stores");
    }
  };

  const handleToggleFollower = async () => {
    if (!user || !user.ProductsFavorites) {
      console.error("User or ProductsFavorites not defined");
      return;
    }

    const updatedFavorites = isFollower
      ? user.ProductsFavorites.filter(
          (favProduct) => favProduct.id !== product.id
        )
      : [...user.ProductsFavorites, product];

    const updatedUser = {
      ...user,
      ProductsFavorites: updatedFavorites,
    };

    console.log("Updating user favorites:", updatedUser);

    // Actualización optimista: actualizar localmente antes de llamar a updateUser
    setIsFollower(!isFollower); // Invertir el estado de isFollower localmente
    updateUserFavorites(updatedFavorites); // Actualizar el contexto

    // Llamar a updateUser para persistir los cambios
    try {
      await updateUser(user.id, updatedUser);
      console.log("User favorites updated successfully.");
    } catch (error) {
      console.error("Error updating favorites", error);
      // Revertir los cambios locales en caso de error
      // Restaurar el estado original del usuario
      setIsFollower(!isFollower); // Restaurar el estado original de isFollower
      updateUserFavorites(user.ProductsFavorites); // Restaurar el contexto
    }
  };

  const rating = 3.5;

  return (
    <div className={`w-[380px] min-h-[380px] p-6 flex flex-col gap-2 rounded-xl ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-50'}`}>
      <div className="flex gap-2">
        {product.category.map((c) => (
          <button
            onClick={() => navigateCategory(c.name)}
            className={`text-sm cursor-pointer hover:text-blue-500 ${darkMode ? 'text-gray-300' : 'text-blue-400'}`}
            key={c.id}>
            {c.name}
          </button>
        ))}
      </div>
      <div className="cursor-pointer animate-zoom-in bg-gray-100/30 rounded-lg hover:bg-gray-100/40">
        <button
          className={`cursor-pointer animate-zoom-in p-1 rounded-lg flex justify-center items-center ${
            isFollower ? "bg-gray-100/30 hover:bg-gray-100/40" : "bg-gray-400"
          }`}
          onClick={handleToggleFollower}
          disabled={loading}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill={isFollower ? "#c81414" : "none"}
            stroke={isFollower ? "#c81414" : "#ffffff"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M12 20l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.96 6.053" />
            <path d="M16 19h6" />
            <path d="M19 16v6" />
          </svg>
        </button>
      </div>

  
      <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-black'}`}>{product.title}</h2>
      <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-100'} rounded-md p-1`}>
        <button onClick={() => handleClickStore(product.idStore)} className={`font-bold bg-gradient-to-l from-[rgba(15,69,113,1)] via-[rgba(56,109,189,1)] to-[rgba(0,157,221,1)] bg-clip-text text-transparent ${darkMode ? 'hover:from-gray-800 hover:via-gray-900 hover:to-gray-600' : 'hover:from-blue-600 hover:via-blue-700 hover:to-blue-800'}`}>
          {product.store.Name}
        </button>
      </div>
      <div className="flex items-center">
        <div className={`${darkMode ? 'text-gray-300' : 'text-black'}text-sm mr-2`}>{rating}</div>
        <Stack spacing={1}>
          <Rating
            name="half-rating"
            readOnly
            size="small"
            precision={0.5}
            defaultValue={rating}
          />
        </Stack>
        <div className={`${darkMode ? 'text-gray-300' : 'text-black'} text-sm ml-2`}>(10)</div>
      </div>
      <div className={`text-2xl font-semibold ${darkMode ? 'text-white' : 'text-black'}`}>${product.price}</div>
      <hr />
      <div>
        {product.variants &&
          Object.keys(product.variants).map((variantType) => (
            <div className="flex flex-col my-4" key={variantType}>
              <h5 className="text-sm font-bold">{variantType}:</h5>
              <MDBBtnGroup shadow="10">
                {product.variants[variantType].map((option) => (
                  <MDBBtn
                    outline={
                      !selectedVariants[variantType] ||
                      selectedVariants[variantType] !== option.name
                    }
                    color={
                      selectedVariants[variantType] === option.name
                        ? "primary"
                        : "secondary"
                    }
                    onClick={() => handleSelection(variantType, option.name)}
                    key={option.name}
                    className={`text-[9.6px] font-bold ${darkMode ? 'text-gray-300' : ''}`}>
                    {option.name}
                  </MDBBtn>
                ))}
              </MDBBtnGroup>
            </div>
          ))}
      </div>
      <div>
        <div className="max-h-[120px] overflow-y-scroll scrollbar-thumb-gray-500 scrollbar-track-gray-200 p-1">
          <span className={`${darkMode ? 'text-gray-300' : 'text-blue-500'} font-bold`}>Description: </span>
          <p className={`${darkMode ? 'text-white' : 'text-black'} text-md text-justify`}>{product.description}</p>
        </div>
      </div>
    </div>
  );
  
};

ProductInformation.propTypes = {
  product: PropTypes.object.isRequired,
};

export default ProductInformation;
