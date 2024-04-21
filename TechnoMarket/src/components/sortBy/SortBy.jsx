import { MDBDropdown, MDBDropdownMenu, MDBDropdownToggle, MDBDropdownItem, MDBCheckbox } from 'mdb-react-ui-kit';
import PropTypes from 'prop-types';
import { useState } from 'react';


const SortBy = () => {
    const [checked, setChecked] = useState('Most relevant'); // Estado para controlar qué opción está seleccionada

    const handleCheck = (value) => {
        setChecked(value); // Actualiza el estado al valor del checkbox seleccionado
    };

    return (
        <MDBDropdown group>
            <MDBDropdownToggle color='info'>Sort by</MDBDropdownToggle>
            <MDBDropdownMenu>
                <MDBDropdownItem link>
                    <MDBCheckbox name='flexCheck' value='Most relevant' id='flexCheckMostRelevant' label='Most relevant' checked={checked === 'Most relevant'} onChange={() => handleCheck('Most relevant')} />
                </MDBDropdownItem>
                <MDBDropdownItem link>
                    <MDBCheckbox name='flexCheck' value='Higher price' id='flexCheckHigherPrice' label='Higher price' checked={checked === 'Higher price'} onChange={() => handleCheck('Higher price')} />
                </MDBDropdownItem>
                <MDBDropdownItem link>
                    <MDBCheckbox name='flexCheck' value='Lower price' id='flexCheckLowerPrice' label='Lower price' checked={checked === 'Lower price'} onChange={() => handleCheck('Lower price')} />
                </MDBDropdownItem>
            </MDBDropdownMenu>
        </MDBDropdown>
    );
};


SortBy.propTypes = {

};


export default SortBy;
