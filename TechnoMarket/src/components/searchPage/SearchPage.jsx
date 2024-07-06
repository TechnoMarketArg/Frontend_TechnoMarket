import NavFilter from "../navFilter/NavFilter";
import { useLocation } from "react-router-dom";
import NavBar from "../navBar/NavBar";
import { useGET } from "../customHook/CustomHook";
import Loading from "../loading/Loading";
import { ProductCard } from "../productCard/ProductCard";
import { useState, useEffect } from "react";

const SearchPage = () => {
  const location = useLocation();
  const searchPalabra = location.state.product.searchTerm.toLowerCase();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortOption, setSortOption] = useState("");

  const [products, loading, error] = useGET(`http://localhost:3000/products?q=${searchPalabra}`);

  useEffect(() => {
    const sortedProducts = [...products];

    if (sortOption === "Action") {
      sortedProducts.sort((a, b) => b.price - a.price); // Ordenar de mayor a menor
    } else if (sortOption === "Another action") {
      sortedProducts.sort((a, b) => a.price - b.price); // Ordenar de menor a mayor
    } else if (sortOption === "Something else") {
      sortedProducts.sort((a, b) => a.title.localeCompare(b.title)); // Ordenar alfabéticamente
    }

    setFilteredProducts(sortedProducts);
  }, [sortOption, products]); 

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <h1>Error...</h1>;
  }

  return (
    <>
      <NavBar />
      {filteredProducts.length > 0 ? (
        <div>
          <NavFilter optSourtBy={setSortOption}/>
          <div className="flex flex-wrap gap-2 mt-8">
            {filteredProducts.map(product => (
              <ProductCard
                key={product.id}
                id={product.id}
                title={product.title}
                description={product.description}
                price={product.price}
                images={product.images}
                offer={false}
                discount={product.discount}
                variants={product.variants}
              />
            ))}
          </div>
        </div>
      ) : (
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "70vh", // Ajusta el alto según tus necesidades
          padding: "20px",
          textAlign: "center",
        }}>
          <p>No se encontraron productos que coincidan con la búsqueda.</p>
        </div>
      )}
    </>
  );
}

SearchPage.propTypes = {};

export default SearchPage;