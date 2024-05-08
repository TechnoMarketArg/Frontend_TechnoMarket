import PropTypes from 'prop-types';
import { MDBCheckbox } from 'mdb-react-ui-kit';

const Filter = ({ filter, isChecked, handleCheckboxChange }) => {
    return (
        <>
            <div className={`flex justify-between p-2 ${isChecked ? 'bg-blue-100/30' : 'bg-white'}`}>
                <span>{filter}</span>
                <MDBCheckbox name={filter} id={filter} value={filter} aria-label={filter} checked={isChecked} onChange={handleCheckboxChange}/>
            </div>
            <hr className="" />
        </>
    );
}

Filter.propTypes = {
    filter: PropTypes.string,
    isChecked: PropTypes.bool,
    handleCheckboxChange: PropTypes.func,
};

export default Filter