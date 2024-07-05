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
import { ProductCard } from "../productCard/ProductCard";

const StoreProfile = () => {
  const [publishModal, setPublishModal] = useState(false);

  const toggleOpenModal = () => setPublishModal(!publishModal);

  const { ShoppingCart, searchHandler, toggleOpen, addCart } =
    useContext(NavBarContext);

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
      <NavBar />

      <div>
        {user.store && (
          <PublishProduct
            toggleOpen={toggleOpenModal}
            setOptSmModal={setPublishModal}
            optSmModal={publishModal}
          />
        )}
        <StoreHeader store={store} user={user} />
        {user.RoleId === 2 && user.Store.id == store.id ? (
          <StoreNav toggleOpenModal={toggleOpenModal} user={user} store={store}>
            <StoreNavItem
              changePage={changePage}
              activePage={activePage}
              numPage={1}>
              Inventory
            </StoreNavItem>
            <StoreNavItem
              changePage={changePage}
              activePage={activePage}
              numPage={2}>
              My Offers
            </StoreNavItem>
            <StoreNavItem
              changePage={changePage}
              activePage={activePage}
              numPage={3}>
              Sales
            </StoreNavItem>
          </StoreNav>
        ) : (
          <StoreNav toggleOpenModal={toggleOpenModal} user={user} store={store}>
            <StoreNavItem
              changePage={changePage}
              activePage={activePage}
              numPage={1}>
              Products
            </StoreNavItem>
            <StoreNavItem
              changePage={changePage}
              activePage={activePage}
              numPage={2}>
              Offers
            </StoreNavItem>
          </StoreNav>
        )}
        {user.RoleId === 2 && user.Store.id == store.id ? (
          <>
            {activePage === 1 &&
              user.RoleId === 2 &&
              user.Store.id == store.id && (
                <div className={`flex justify-center w-full`}>
                  <Inventory inventory={store.inventory} />
                </div>
              )}
            {activePage === 2 &&
              user.RoleId === 2 &&
              user.Store.id == store.id && (
                <div className={`flex justify-center w-full`}>
                  <div className="">
                    <Offers products={productOffers} />
                  </div>
                </div>
              )}
            {activePage === 3 &&
              user.RoleId === 2 &&
              user.Store.id == store.id && (
                <div className={`flex justify-center w-full`}>ventas</div>
              )}
          </>
        ) : (
          <>
            {activePage === 1 && (
              <div className={`flex justify-center w-full`}>
                <div className="flex flex-wrap gap-2 w-full justify-center my-6">
                  {store.inventory.map((product) => {
                    return (
                      <ProductCard
                        key={product.id}
                        id={product.id}
                        title={product.title}
                        description={product.description}
                        price={product.price}
                        images={product.images}
                        variants={product.variants}
                        offer={product.offer}
                        discount={product.discount}
                        addCart={addCart}
                      />
                    );
                  })}
                </div>
              </div>
            )}
            {activePage === 2 && (
              <div className={`flex justify-center w-full`}>
                {store.inventory
                  .filter((product) => product.offer)
                  .map((product) => {
                    return (
                      <ProductCard
                        key={product.id}
                        id={product.id}
                        title={product.title}
                        description={product.description}
                        price={product.price}
                        images={product.images}
                        variants={product.variants}
                        offer={product.offer}
                        discount={product.discount}
                        addCart={addCart}
                      />
                    );
                  })}
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

StoreProfile.propTypes = {};

export default StoreProfile;
