import PropTypes from "prop-types";
import Inventory from "../inventory/Inventory";
import StoreHeader from "../storeHeader/StoreHeader";
import StoreNav from "../storeNav/StoreNav";
import { useContext, useState, useEffect } from "react";
import StoreNavItem from "../storeNavItem/StoreNavItem";
import { AuthenticationContext } from "../../services/authentication/Authentication.context";
import { useGET } from "../customHook/CustomHook";
import { useLocation } from "react-router-dom";

const StoreProfile = () => {
  const { user } = useContext(AuthenticationContext);
  const location = useLocation();
  const { id } = location.state.stores;

  const [store, loading, error] = useGET(`http://localhost:3000/stores/${id}`);
  const [activePage, setActivePage] = useState(1);

  useEffect(() => {
    if (user) {
      console.log(user);
    }
  }, [user]);

  const changePage = (page) => {
    setActivePage(page);
  };

  if (loading || !user) {
    return <>CARGANDO...</>; // Muestra estado de carga hasta que user esté disponible
  }
  if (error) {
    return <>error...</>;
  }

  return (
    <>
      {user &&
        <div>
          <StoreHeader store={store} user={user} />
          <StoreNav>
            <StoreNavItem
              changePage={changePage}
              activePage={activePage}
              numPage={1}>
              {user.RoleId === 2 && user.IdStore == store.id ? "Inventory" : "Products"}
            </StoreNavItem>
            <StoreNavItem
              changePage={changePage}
              activePage={activePage}
              numPage={2}>
              {user.RoleId === 2 && user.IdStore == store.id ? "My Offers" : "Offers"}
            </StoreNavItem>
            <StoreNavItem
              changePage={changePage}
              activePage={activePage}
              numPage={3}>
              {user.RoleId === 2 && user.IdStore == store.id ? "Sales" : "Best sellers"}
            </StoreNavItem>
          </StoreNav>
          <div
            className={`flex justify-center w-full ${activePage === 1 && user.RoleId === 2 && user.IdStore == store.id ? "" : "hidden"}`}
          >
            <Inventory inventory={store.inventory} />
          </div>
        </div>
      }
    </>
  );
};

StoreProfile.propTypes = {};

export default StoreProfile;
