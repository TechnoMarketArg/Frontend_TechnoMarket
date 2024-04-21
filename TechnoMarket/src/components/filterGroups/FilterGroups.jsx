import Filter from "../filter/Filter";
import PropTypes from 'prop-types';


const FilterGroups = ({ filters, isCheckedList, handleCheckboxChange }) => {
    return (
        <div>
            {
                filters.map((objectFilter, index) => (
                    Object.entries(objectFilter).map(([filterTitle, filterArray]) => (
                        <div key={index}>
                            <h4 className="text-xl font-medium">{filterTitle}</h4>
                            
                            {
                                filterArray.map(filter => (
                                    <Filter 
                                        filter={filter} 
                                        isChecked={isCheckedList[filter]} 
                                        handleCheckboxChange={() => handleCheckboxChange(filter)} 
                                        key={filter} 
                                    />
                                ))
                            }
                            <br />
                            <br />
                        </div>
                    ))
                ))
            }

        </div>
    );
};


FilterGroups.propTypes = {
    filters: PropTypes.array,
    isCheckedList: PropTypes.object,
    handleCheckboxChange: PropTypes.func,
};

export default FilterGroups