import { useState } from "react";
import PropTypes from "prop-types";
import NavBar from "../navBar/NavBar";
import Carousel from "../carousel/Carousel";
import { ProductCardSlider } from "../productCardSlider/ProductCardSlider";
import { ProductCard } from "../productCard/ProductCard";
import { FilterSearch } from "../filterSearch/FilterSearch";
import Footer from "../footer/Footer";
import SearchPage from "../searchPage/SearchPage";

const Homepage = ({ Data, addCart, ShoppingCart, toggleOpen }) => {
  const [filteredProduct, setFilteredProduct] = useState("");

  // Funcion que va a Buscar el Contenido del Buscador en la API
  const searchHandler = (searchTerm) => {
    const filtered = Data.filter((product) =>
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
    <div className="animate-fade-in">
      <NavBar
        searchHandler={searchHandler}
        ShoppingCart={ShoppingCart}
        toggleOpen={toggleOpen}
      />
      {filteredProduct ? <SearchPage filteredProduct={filteredProduct} /> : ""}
      <Carousel />
      <div className="w-full flex justify-center">
        <div className="max-w-[100px] flex justify-center">
          <ProductCardSlider Title={"Ofertas"} Data={Data} addCart={addCart} />
        </div>
      </div>

      {/*<ProductDetails product={Data[0]}/>*/}
      <div className="flex flex-wrap gap-2 mt-8">
        {Data.map((product) => (
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
