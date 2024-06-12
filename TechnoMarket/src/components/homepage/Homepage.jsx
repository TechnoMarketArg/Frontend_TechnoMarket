import React, { useState } from 'react';
import PropTypes from 'prop-types';
import NavBar from '../navBar/NavBar'
import Carousel from '../carousel/Carousel'
import { ProductCardSlider } from '../productCardSlider/ProductCardSlider'
import { ProductCard } from '../productCard/ProductCard';
import ProductDetails from '../productDetails/ProductDetails'
import {FilterSearch} from '../filterSearch/FilterSearch'
import Footer from '../footer/Footer'
import SearchPage from '../searchPage/SearchPage';
const Homepage = ({Data,openModal,addCart}) => {
    const [filteredProduct, setFilteredProduct] = useState("")


    // Funcion que va a Buscar el Contenido del Buscador en la API
    const searchHandler = (searchTerm) => {
        console.log("hola");
        const filtered = Data.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredProduct(filtered);
        console.log(filteredProduct);
    }

    const FiltersObject = [
           { Brand: ["Apple", "Dell", "HP", "Lenovo", "Acer", "Asus", "Microsoft", "MSI", "Samsung", "Sony", "Toshiba", "Huawei"] },
            { colors: ["rojo", "azul", "verde", "amarillo", "naranja", "morado", "rosa", "blanco", "negro", "gris", "marrón", "turquesa"] }
    ];

    return (
        <div>
            <NavBar searchHandler = {searchHandler}/>
            {filteredProduct ? <SearchPage filteredProduct={filteredProduct}/> : ""}
            <FilterSearch FiltersObject={FiltersObject}/>
            <Carousel/>
            <ProductCardSlider Title={"Ofertas"} Data={Data}/>
            {/*<ProductDetails product={Data[0]}/>*/}
            <div className='flex flex-wrap gap-2 mt-8'>
                {
                    Data.map(product => (
                        <ProductCard
                            key={product.id}
                            offer={false}
                            title={product.title}
                            price={product.price}
                            description={product.description}
                            images={product.images}
                            openModal={openModal}
                            addCart={addCart}
                        />
                    ))
                }
            <Footer/>
            </div>
            
        </div>
        
    
    );
};


Homepage.propTypes = {
    Data: PropTypes.array,
    openModal: PropTypes.func,
    addCart: PropTypes.func,    
};


export default Homepage;
