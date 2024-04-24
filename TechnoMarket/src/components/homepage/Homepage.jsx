import React from 'react';
import PropTypes from 'prop-types';
import NavBar from '../navBar/NavBar'
import Carousel from '../carousel/Carousel'
import { ProductCardSlider } from '../productCardSlider/ProductCardSlider'
import { ProductCard } from '../productCard/ProductCard';
import ProductDetails from '../productDetails/ProductDetails'
import {FilterSearch} from '../filterSearch/FilterSearch'
import Footer from '../footer/Footer'
const Homepage = ({Data}) => {

    const FiltersObject = [
           { Brand: ["Apple", "Dell", "HP", "Lenovo", "Acer", "Asus", "Microsoft", "MSI", "Samsung", "Sony", "Toshiba", "Huawei"] },
            { colors: ["rojo", "azul", "verde", "amarillo", "naranja", "morado", "rosa", "blanco", "negro", "gris", "marrón", "turquesa"] }
        ];

    return (
        <div>
            <NavBar/>
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
};


export default Homepage;
