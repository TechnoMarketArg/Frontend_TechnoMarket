import PropTypes from "prop-types";
import { MDBBtn, MDBBtnGroup } from "mdb-react-ui-kit";
import { useState, useContext, useEffect } from "react";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import { AuthenticationContext } from "../../services/authentication/Authentication.context";
import { useUpdateUser } from "../customHook/CustomHook";

const ProductInformation = ({ product }) => {
  const { user } = useContext(AuthenticationContext);
  const [selectedVariants, setSelectedVariants] = useState({});
  const [isFollower, setIsFollower] = useState(false);
  const { loading, updateUser } = useUpdateUser();

  // Verificar si el producto está en los favoritos del usuario al cargar
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

    // Llamar a updateUser para persistir los cambios
    try {
      await updateUser(user.id, updatedUser);
      console.log("User favorites updated successfully.");
    } catch (error) {
      console.error("Error updating favorites", error);
      // Revertir los cambios locales en caso de error
      // Restaurar el estado original del usuario
      setIsFollower(!isFollower); // Restaurar el estado original de isFollower
    }
  };

  const features = [
    { brand: "ASUS" },
    { condition: "New" },
    { Color: "Black" },
    { Graphic: "NVIDIA GeForce GTX 1650" },
  ];

  const rating = 3.5;

  return (
    <div className="w-[380px] min-h-[380px] bg-gray-50 p-6 flex flex-col gap-2 rounded-xl">
      <h2 className="text-xl font-semibold">{product.title}</h2>
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
      <div className="flex items-center">
        <div className="text-sm mr-2">{rating}</div>
        <Stack spacing={1}>
          <Rating
            name="half-rating"
            readOnly
            size="small"
            precision={0.5}
            defaultValue={rating}
          />
        </Stack>
        <div className="text-sm ml-2">(10)</div>
      </div>
      <div className="text-2xl font-semibold">${product.price}</div>
      <hr />
      <table className="min-w-[200px] overflow-y-scroll scrollbar-thumb-gray-500 scrollbar-track-gray-200 text-xs">
        {features.map((feature, index) => (
          <tbody key={index}>
            {Object.entries(feature).map(([key, value], index) => (
              <tr key={index}>
                <td className="font-bold">{key}:</td>
                <td>{value}</td>
              </tr>
            ))}
          </tbody>
        ))}
      </table>
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
                    className="text-[9.6px] font-bold"
                  >
                    {option.name}
                  </MDBBtn>
                ))}
              </MDBBtnGroup>
            </div>
          ))}
      </div>
      <div>
        <a
          href="#description"
          className="text-sm font-semibold text-blue-400 cursor-pointer hover:text-blue-500 underline"
        >
          General description
        </a>
      </div>
    </div>
  );
};

ProductInformation.propTypes = {
  product: PropTypes.object.isRequired,
};

export default ProductInformation;
