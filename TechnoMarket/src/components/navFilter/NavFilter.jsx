import PropTypes from 'prop-types'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import {FilterSearch} from '../filterSearch/FilterSearch' 
import Form from 'react-bootstrap/Form';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import SortBy from '../sortBy/SortBy';


const NavFilter = () => {

    const FiltersObject = [
        { Brand: ["Apple", "Dell", "HP", "Lenovo", "Acer", "Asus", "Microsoft", "MSI", "Samsung", "Sony", "Toshiba", "Huawei"] },
         { colors: ["rojo", "azul", "verde", "amarillo", "naranja", "morado", "rosa", "blanco", "negro", "gris", "marrón", "turquesa"] }
    ];
  return (
    <div>
      <Navbar bg="#90E0EF" style={{borderRadius: '70px'}}>
        <Container>
            <FilterSearch FiltersObject={FiltersObject}/>
            <SortBy/>
            
        </Container>
      </Navbar>
    </div>
  )
}

NavFilter.propTypes = {

}

export default NavFilter

