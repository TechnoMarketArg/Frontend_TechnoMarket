import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import PropTypes from "prop-types";

const SortBy = ({ setOpt }) => {

    const handleSelect = (eventKey) => {
        setOpt(eventKey);
    };

    return (
        <DropdownButton id="dropdown-basic-button" title="SortBy" onSelect={handleSelect}>
            <Dropdown.Item eventKey="Action">Ordenar de Mayor a Menor</Dropdown.Item>
            <Dropdown.Item eventKey="Another action">Ordenar de Menor a Mayor</Dropdown.Item>
            <Dropdown.Item eventKey="Something else">Ordenar Alfabeticamente</Dropdown.Item>
        </DropdownButton>
    );
}

SortBy.propTypes = {
    setOpt: PropTypes.func.isRequired,
};


export default SortBy;