import Inventory from "../inventory/Inventory";
import StoreHeader from "../storeHeader/StoreHeader";
import StoreNav from "../storeNav/StoreNav";
import { useContext, useState, useEffect } from "react";
import StoreNavItem from "../storeNavItem/StoreNavItem";
import { AuthenticationContext } from "../../services/authentication/Authentication.context";
import { useGET, useUpdateUser } from "../customHook/CustomHook";
import { useLocation } from "react-router-dom";
import { NavBarContext } from "../navBarContext/NavBarContext";
import NavBar from "../navBar/NavBar";
import Loading from "../loading/Loading";
import Offers from "../offers/Offers";
import PublishProduct from "../publishProduct/PublishProduct";
import { ProductCard } from "../productCard/ProductCard";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";

const StoreProfile = () => {
  const [optSmModal, setOptSmModal] = useState(false);

  const toggleOpenP = () => {
    setOptSmModal(!optSmModal);
  };

  const { addCart } = useContext(NavBarContext);
  const { user, updateStoresFavorites } = useContext(AuthenticationContext);
  const [isFollower, setIsFollower] = useState(false);
  const location = useLocation();
  const { id } = location.state.stores;
  const { loading, updateUser } = useUpdateUser();

  const [store, error] = useGET(`http://localhost:3000/stores/${id}`);
  const [activePage, setActivePage] = useState(1);

  useEffect(() => {
    if (user && user.StoresFavorites) {
      const isFavorited = user.StoresFavorites.some(
        (favStore) => favStore.id === store.id
      );
      setIsFollower(isFavorited);
    }
  }, [user, store]);

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

  const handleToggleFollower = async (event) => {
    event.preventDefault();
    if (!user || !user.StoresFavorites) {
      console.error("User or StoresFavorites not defined");
      return;
    }

    const updatedFavorites = isFollower
      ? user.StoresFavorites.filter(
          (favStore) => favStore.id !== store.id
        )
      : [...user.StoresFavorites, store];

    const updatedUser = {
      ...user,
      StoresFavorites: updatedFavorites,
    };

    console.log("Updating user favorites:", updatedUser);

    // Actualización optimista: actualizar localmente antes de llamar a updateUser
    setIsFollower(!isFollower); // Invertir el estado de isFollower localmente
    updateStoresFavorites(updatedFavorites); // Actualizar el contexto

    // Llamar a updateUser para persistir los cambios
    try {
      await updateUser(user.id, updatedUser);
      console.log("User favorites updated successfully.");
    } catch (error) {
      console.error("Error updating favorites", error);
      // Revertir los cambios locales en caso de error
      // Restaurar el estado original del usuario
      setIsFollower(!isFollower); // Restaurar el estado original de isFollower
      updateStoresFavorites(user.StoresFavorites); // Restaurar el contexto
    }
  };

  return (
    <>
      <NavBar />
     

      <div>
        {store && user && user.Store && (
          <PublishProduct
            toggleOpen={toggleOpenP}
            setOptSmModal={setOptSmModal}
            optSmModal={optSmModal}
          />
        )}
        <StoreHeader store={store} user={user} isFollower={isFollower} handleToggleFollower={handleToggleFollower} loading={loading}/>
        {user.RoleId === 2 && user.Store.id == store.id ? (
          <StoreNav toggleOpen={toggleOpenP} user={user} store={store}>
            <StoreNavItem
              changePage={changePage}
              activePage={activePage}
              numPage={1}
            >
              Inventory
            </StoreNavItem>
            <StoreNavItem
              changePage={changePage}
              activePage={activePage}
              numPage={2}
            >
              My Offers
            </StoreNavItem>
            <StoreNavItem
              changePage={changePage}
              activePage={activePage}
              numPage={3}
            >
              Sales
            </StoreNavItem>
          </StoreNav>
        ) : (
          <StoreNav user={user} store={store}>
            <StoreNavItem
              changePage={changePage}
              activePage={activePage}
              numPage={1}
            >
              Products
            </StoreNavItem>
            <StoreNavItem
              changePage={changePage}
              activePage={activePage}
              numPage={2}
            >
              Offers
            </StoreNavItem>
          </StoreNav>
        )}
        {user.RoleId === 2 && user.Store.id == store.id ? (
          <>
            {activePage === 1 && (
              <div className="flex justify-center w-full">
                <Inventory inventory={store.inventory} store={store} />
              </div>
            )}
            {activePage === 2 && (
              <div className="flex justify-center w-full">
                <div className="">
                  <Offers products={productOffers} />
                </div>
              </div>
            )}
            {activePage === 3 && (
              <div className="flex justify-center w-full">
                <div className="p-4">
                  <Typography variant="h4" className="mb-4">
                    Listado de Ventas
                  </Typography>
                  <TableContainer component={Paper}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Comprador</TableCell>
                          <TableCell>Correo</TableCell>
                          <TableCell>Producto</TableCell>
                          <TableCell>Precio</TableCell>
                          <TableCell>Cantidad</TableCell>
                          <TableCell>Total</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {store.sales.map((sale, saleIndex) =>
                          sale.products.map((product, productIndex) => (
                            <TableRow key={`${saleIndex}-${productIndex}`}>
                              {productIndex === 0 && (
                                <TableCell rowSpan={sale.products.length}>
                                  {sale.buyer.FirstName} {sale.buyer.LastName}
                                </TableCell>
                              )}
                              {productIndex === 0 && (
                                <TableCell rowSpan={sale.products.length}>
                                  {sale.buyer.email}
                                </TableCell>
                              )}
                              <TableCell>{product.title}</TableCell>
                              <TableCell>
                                ${product.price.toFixed(2)}
                              </TableCell>
                              <TableCell>{product.quantity}</TableCell>
                              <TableCell>
                                $
                                {(product.price * product.quantity).toFixed(2)}
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </div>
              </div>
            )}
          </>
        ) : (
          <>
            {activePage === 1 && (
              <div className="flex justify-center w-full">
                <div className="flex flex-wrap gap-2 w-full justify-center my-6">
                  {store.inventory.map((product) => (
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
                  ))}
                </div>
              </div>
            )}
            {activePage === 2 && (
              <div className="flex justify-center w-full">
                {store.inventory
                  .filter((product) => product.offer)
                  .map((product) => (
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
                  ))}
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
