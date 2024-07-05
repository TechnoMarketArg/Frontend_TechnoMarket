import PropTypes from "prop-types";
import OffersItem from "../offersItem/OffersItem";
import { useDarkMode } from "../../services/DarkMode/DarkModeContext";


const Offers = ({ products }) => {
  const { darkMode } = useDarkMode();

  return (
    <div className="font-mono w-[1000px] min-h-[80vh] mb-8">
      <div className="flex justify-between px-4 py-2 bg-gray-400 mt-6 rounded-t-2xl font-bold">
        <div className="flex gap-2">
          
        </div>
        
      </div>
      <table className={`table-fixed text-center w-full ${darkMode ? "bg-dark text-white" : "bg-white text-dark"}`}>
        <thead>
          <tr className="bg-gray-300 text-sm font-mono">
            
            <th className="">Image</th>
            <th>Title</th>
            <th>Status</th>
            <th>Inventory</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {
            products.map((product) => (
                <OffersItem key={product.id} product={product}/>
            ))
          }
        </tbody>
        
      </table>
    </div>
  );
};

Offers.propTypes = {
    products: PropTypes.array,
};

export default Offers;
