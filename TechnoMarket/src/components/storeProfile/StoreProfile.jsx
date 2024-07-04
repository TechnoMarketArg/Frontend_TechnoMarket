import PropTypes from "prop-types";
import Inventory from "../inventory/Inventory";
import StoreHeader from "../storeHeader/StoreHeader";
import StoreNav from "../storeNav/StoreNav";
import { useContext, useState, useEffect } from "react";
import StoreNavItem from "../storeNavItem/StoreNavItem";
import { AuthenticationContext } from "../../services/authentication/Authentication.context";
import { useGET } from "../customHook/CustomHook";
import { useLocation } from "react-router-dom";
import { NavBarContext } from "../navBarContext/NavBarContext";
import NavBar from "../navBar/NavBar";
import Loading from "../loading/Loading";
import Offers from "../offers/Offers";
import PublishProduct from "../publishProduct/PublishProduct";

const StoreProfile = () => {

  const [publishModal, setPublishModal] = useState(false);

  const toggleOpenModal = () => setPublishModal(!publishModal);

  const { ShoppingCart, searchHandler, toggleOpen } = useContext(NavBarContext);

  const { user } = useContext(AuthenticationContext);
  const location = useLocation();
  const { id } = location.state.stores;


  const [store, loading, error] = useGET(`http://localhost:3000/stores/${id}`);
  const [activePage, setActivePage] = useState(1);

  const changePage = (page) => {
    setActivePage(page);
  };

  if (loading || !user) {
    return <Loading />; // Muestra estado de carga hasta que user esté disponible
  }

  if (error) {
    return <>error...</>;
  }

  
    const getProductsByDiscount = (products) => {
      return products.filter((product) => product.offer);
    };
    
    const productOffers = getProductsByDiscount(store.inventory);


  return (
    <>
      <NavBar/>


        <div>
          {user.store && <PublishProduct toggleOpen={toggleOpenModal} setOptSmModal={setPublishModal} optSmModal={publishModal} />}
          <StoreHeader store={store} user={user} />
          <StoreNav toggleOpenModal={toggleOpenModal} user={user} store={store}>
            <StoreNavItem
              changePage={changePage}
              activePage={activePage}
              numPage={1}>
              {user.RoleId === 2 && user.Store.id == store.id
                ? "Inventory"
                : "Products"}
            </StoreNavItem>
            <StoreNavItem
              changePage={changePage}
              activePage={activePage}
              numPage={2}>
              {user.RoleId === 2 && user.Store.id == store.id
                ? "My Offers"
                : "Offers"}
            </StoreNavItem>
            <StoreNavItem
              changePage={changePage}
              activePage={activePage}
              numPage={3}>
              {user.RoleId === 2 && user.Store.id == store.id
                ? "Sales"
                : "Best sellers"}
            </StoreNavItem>
          </StoreNav>
          <div
            className={`flex justify-center w-full ${
              activePage === 1 && user.RoleId === 2 && user.Store.id == store.id
                ? ""
                : "hidden"
            }`}>
            <Inventory inventory={store.inventory} />
          </div>
          <div
            className={`flex justify-center w-full ${
              activePage === 2 && user.RoleId === 2 && user.Store.id == store.id
                ? ""
                : "hidden"
            }`}>
            <div className="">
              <Offers products={productOffers} />
            </div>
          </div>
          <div
            className={`flex justify-center w-full ${
              activePage === 3 && user.RoleId === 2 && user.Store.id == store.id
                ? ""
                : "hidden"
            }`}>
            ventas
          </div>
        </div>
    </>
  );
};

StoreProfile.propTypes = {};

export default StoreProfile;
