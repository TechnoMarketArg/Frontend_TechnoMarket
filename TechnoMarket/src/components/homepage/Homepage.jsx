import { useState } from "react";
import PropTypes from "prop-types";
import Carousel from "../carousel/Carousel";
import { ProductCardSlider } from "../productCardSlider/ProductCardSlider";
import { ProductCard } from "../productCard/ProductCard";
import { FilterSearch } from "../filterSearch/FilterSearch";
import Footer from "../footer/Footer";
import SearchPage from "../searchPage/SearchPage";
import { useGET } from "../customHook/CustomHook";
import Cart from "../cart/Cart.jsx";
import { Toaster, toast } from "sonner";
import Loading from "../loading/Loading";
import NavBar from '../navBar/NavBar';

const Homepage = () => {
  const [ProductsData, ProductsLoading, ProductsError] = useGET(
    "http://localhost:3000/products"
  );

  const [filteredProduct, setFilteredProduct] = useState();


  const [optSmModal, setOptSmModal] = useState(false);

  const toggleOpen = () => setOptSmModal(!optSmModal);

  //cerrar el modal de mas informacion

  const [ShoppingCart, setShoppingCart] = useState([]);

  //agregar productos al carrito
  const addCart = (product) => {
    if (ShoppingCart.some((p) => p.id == product.id)) {
      toast.warning(`${product.title} already included in the cart`);
    } else {
      toast.success(`${product.title} added to shopping cart successfully`);
      setShoppingCart([...ShoppingCart, product]);
    }
  };

  //aumentar la cantidad de un producto en el carrito
  const increaseQuantity = (productId) => {
    setShoppingCart(
      ShoppingCart.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  //disminuir la cantidad de un producto en el carrito
  const decreaseQuantity = (productId) => {
    setShoppingCart(
      ShoppingCart.map((item) =>
        item.id === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  //FALTA LOGICA
  //eliminar priductos del carrito
  const removeCart = (gameTitle) => {
    setShoppingCart(ShoppingCart.filter((game) => game.title !== gameTitle));
  };

  if (ProductsLoading) {
    return <Loading />;
  }

  if (ProductsError) {
    return <h1>Error... </h1>;
  }


  // Funcion que va a Buscar el Contenido del Buscador en la API
  const searchHandler = (searchTerm) => {
    const filtered = ProductsData.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProduct(filtered);
    console.log(filteredProduct);
  };

  const FiltersObject = [
    {
      Brand: [
        "Apple",
        "Dell",
        "HP",
        "Lenovo",
        "Acer",
        "Asus",
        "Microsoft",
        "MSI",
        "Samsung",
        "Sony",
        "Toshiba",
        "Huawei",
      ],
    },
    {
      colors: [
        "rojo",
        "azul",
        "verde",
        "amarillo",
        "naranja",
        "morado",
        "rosa",
        "blanco",
        "negro",
        "gris",
        "marrón",
        "turquesa",
      ],
    },
  ];

  return (
    <>
      <Toaster richColors position="top-center" />
      <Cart
        optSmModal={optSmModal}
        setOptSmModal={setOptSmModal}
        toggleOpen={toggleOpen}
        ShoppingCart={ShoppingCart}
        removeCart={removeCart}
        decreaseQuantity={decreaseQuantity}
        increaseQuantity={increaseQuantity}
      />
      <div className="animate-fade-in">
        <NavBar
          searchHandler={searchHandler}
          ShoppingCart={ShoppingCart}
          toggleOpen={toggleOpen}
        />
        {filteredProduct ? (
          <SearchPage filteredProduct={filteredProduct} />
        ) : (
          ""
        )}
        <Carousel />
        <div className="w-full flex justify-center">
          <div className="max-w-[100px] flex justify-center">
            <ProductCardSlider
              Title={"Ofertas"}
              Data={ProductsData}
              addCart={addCart}
            />
          </div>
        </div>

        {/*<ProductDetails product={Data[0]}/>*/}
        <div className="flex flex-wrap gap-2 mt-8">
          {ProductsData.map((product) => (
            <ProductCard
              key={product.id}
              offer={false}
              id={product.id}
              title={product.title}
              price={product.price}
              description={product.description}
              images={product.images}
              addCart={addCart}
            />
          ))}
          <Footer />
        </div>
      </div>
    </>
  );
};

Homepage.propTypes = {
  Data: PropTypes.array,
  openModal: PropTypes.func,
  addCart: PropTypes.func,
  ShoppingCart: PropTypes.array,
  toggleOpen: PropTypes.func,
};

export default Homepage;
