import PropTypes from 'prop-types';
import { MDBBtn, MDBCheckbox } from 'mdb-react-ui-kit';
import InventoryItem from '../inventoryItem/InventoryItem';
import { useEffect, useState } from 'react';

const Inventory = ({ products }) => {
  const [AllChecked, setAllChecked] = useState(false);
  const [AllActive, setAllActive] = useState(true);
  const [activePage, setActivePage] = useState(1);

  // Effect to handle the global check/uncheck
  useEffect(() => {
    if (AllChecked) {
      products.forEach(product => {
        product.checked = true;
      });
    } else {
      products.forEach(product => {
        product.checked = false;
      });
    }
  }, [AllChecked, products]);


  const changePage = (page) => {
    setActivePage(page);  
  }

  return (
    <div className='font-mono w-[1000px]'>
      <div className="flex justify-between px-4 py-2 bg-gray-400 mt-6 rounded-t-2xl font-bold">
      <div className='flex gap-2'>
          <MDBBtn
            color='tertiary'
            className={`hover:text-gray-700 font-bold w-14 ${activePage === 1 ? "bg-blue-300/30" : ""}`}
            onClick={() => changePage(1)}
          >
            All
          </MDBBtn>
          <MDBBtn
            color='tertiary'
            className={`hover:text-gray-700 font-bold w-14 ${activePage === 2 ? "bg-blue-300/30" : ""}`}
            onClick={() => changePage(2)}
          >
            Active
          </MDBBtn>
          <MDBBtn
            color='tertiary'
            className={`hover:text-gray-700 font-bold w-14 ${activePage === 3 ? "bg-blue-300/30" : ""}`}
            onClick={() => changePage(3)}
          >
            Draft
          </MDBBtn>
        </div>
        {AllChecked &&
          <div className='flex gap-8 animate-fade-in'>
            <MDBBtn
              onClick={() => setAllActive(!AllActive)}
              color={AllActive ?  'danger': 'success'}
              className={AllActive ? "" : "px-8"}
            >
              {AllActive ? 'Disabled all' : 'Active all' }
            </MDBBtn>
          </div>
        }
      </div>
      <table className="table-fixed text-center w-full">
        <thead>
          <tr className="bg-gray-300 text-sm font-mono">
            <th className="lg:px-4 md:px-3 sm:px-2 p-2">
              <MDBCheckbox
                checked={AllChecked}
                onChange={() => setAllChecked(!AllChecked)}
              />
            </th>
            <th className="">
              Image
            </th>
            <th>
              Title
            </th>
            <th>
              Status
            </th>
            <th>
              Inventory
            </th>
            <th>
              Price
            </th>
          </tr>
        </thead>
        <tbody className={activePage === 1 ? '' : 'hidden'}>
          {
            products.map((product) => (
              <InventoryItem
                key={product.id}
                product={product}
                AllChecked={AllChecked}
                AllActive={AllActive}
              />
            ))
          }
        </tbody>
      </table>
    </div>
  );
};


Inventory.propTypes = {
  products: PropTypes.array,
};


export default Inventory;
