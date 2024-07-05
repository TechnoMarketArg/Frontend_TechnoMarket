import { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import NavBar from "../navBar/NavBar";
import { MDBBtn } from "mdb-react-ui-kit";
import { useDELETE, useGET, usePOST, usePUT } from "../customHook/CustomHook";
import Loading from "../loading/Loading";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import "mdb-react-ui-kit/dist/css/mdb.min.css";

import {
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  FormControl,
} from "@mui/material";
import { toast } from "sonner";
import CreateStore from "../createStore/CreateStore";
import { AuthenticationContext } from "../../services/authentication/Authentication.context";

const AdminProfile = () => {
  const { user } = useContext(AuthenticationContext);

  const [idGenerate, loadingID, errorID] = useGET(
    "https://www.uuidtools.com/api/generate/v1"
  );

  const [users, LUsers, EUsers] = useGET("http://localhost:3000/users");
  const [stores, LStores, EStores] = useGET("http://localhost:3000/stores");
  const [products, LProducts, EProducts] = useGET(
    "http://localhost:3000/products"
  );

  const [UpdatedData, PutDataUser, loading, error] = usePUT(
    "http://localhost:3000/users"
  );
  const [UpdatedDataStore, PutDataStore, loadingStore, errorStore] = usePUT(
    "http://localhost:3000/stores"
  );
  const [UpdatedDataProduct, PutDataProduct, loadingProduct, errorProduct] =
    usePUT("http://localhost:3000/products");

  const [PostData, loadingPOST, errorPOST] = usePOST(
    "http://localhost:3000/users"
  );

  const [DeleteData, loadingDelete, errorDelete] = useDELETE(
    "http://localhost:3000/users"
  );

  const [showDelete, setShowDelete] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleShowDelete = (user) => {
    setSelectedUser(user);
    setShowDelete(true);
  };

  const handleCloseDelete = () => {
    setShowDelete(false);
    setSelectedUser(null);
  };

  const [Users, setUsers] = useState([]);
  const [Stores, setStores] = useState([]);
  const [Products, setProducts] = useState([]);

  const [activePage, setActivePage] = useState(1);

  const [activePageMain, setActivePageMain] = useState(1);

  const [show, setShow] = useState(false);

  const [FirstName, setFirstName] = useState("");
  const [FirstNameValidate, setFirstNameValidate] = useState(false);

  const [LastName, setLastName] = useState("");
  const [LastNameValidate, setLastNameValidate] = useState(false);

  const [Email, setEmail] = useState("");
  const [EmailValidate, setEmailValidate] = useState(false);

  const [Password, setPassword] = useState("");
  const [PasswordValidate, setPasswordValidate] = useState(false);

  const [RoleSelect, setRoleSelect] = useState("");
  const [RoleSelectValidate, setRoleSelectValidate] = useState(false);

  const [showStore, setShowStore] = useState(false);

  const [NewUser, setNewUser] = useState({});

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (!LUsers && users) {
      setUsers(users);
    }
  }, [LUsers, users]);

  useEffect(() => {
    if (!LStores && stores) {
      setStores(stores);
    }
  }, [LStores, stores]);

  useEffect(() => {
    if (!LProducts && products) {
      setProducts(products);
    }
  }, [LProducts, products]);

  if (LUsers || LStores || LProducts) {
    return <Loading />;
  }
  if (EUsers || EStores || EProducts) {
    return <h1>Error...</h1>;
  }

  const handleDeactivateUser = (user) => {
    const updatedUser = { ...user, status: !user.status };
    PutDataUser(updatedUser, user.id)
      .then((data) => {
        const updatedUsers = Users.map((u) => (u.id === user.id ? data : u));
        setUsers(updatedUsers);
      })
      .catch((err) => {
        console.error("Error updating user:", err);
      });
  };
  const handleDeactivateStore = (store) => {
    const updatedStore = { ...store, status: !store.status };
    PutDataStore(updatedStore, store.id)
      .then((data) => {
        const updatedStores = Stores.map((s) => (s.id === store.id ? data : s));
        setStores(updatedStores);
      })
      .catch((err) => {
        console.error("Error updating store:", err);
      });
  };
  const handleDeactivateProduct = (product) => {
    const updatedProduct = { ...product, status: !product.status };
    PutDataProduct(updatedProduct, product.id)
      .then((data) => {
        const updatedProducts = Products.map((p) =>
          p.id === product.id ? data : p
        );
        setProducts(updatedProducts);
      })
      .catch((err) => {
        console.error("Error updating product:", err);
      });
  };

  const changePage = (page) => {
    setActivePage(page);
  };
  const changePageMain = (page) => {
    setActivePageMain(page);
    setActivePage(1);

  };

  const handleCreateNewUser = () => {
    if (!FirstName) {
      setFirstNameValidate(true);
      return;
    }
    if (!LastName) {
      setFirstNameValidate(false);
      setLastNameValidate(true);
      return;
    }
    if (!Email) {
      setFirstNameValidate(false);
      setLastNameValidate(false);
      setEmailValidate(true);
      return;
    }
    if (!Password) {
      setFirstNameValidate(false);
      setLastNameValidate(false);
      setEmailValidate(false);
      setPasswordValidate(true);
      return;
    }
    if (!RoleSelect) {
      setFirstNameValidate(false);
      setLastNameValidate(false);
      setEmailValidate(false);
      setPasswordValidate(false);
      setRoleSelectValidate(true);
      return;
    }

    // Reset all validation states
    setFirstNameValidate(false);
    setLastNameValidate(false);
    setEmailValidate(false);
    setPasswordValidate(false);
    setRoleSelectValidate(false);

    if (Users.some((u) => u.email === Email && u.status === true)) {
      toast.error(`User with email ${Email} already exists`);
      return;
    }

    const userData = {
      id: idGenerate[0],
      FirstName: FirstName,
      LastName: LastName,
      email: Email,
      password: Password,
      RoleId: RoleSelect,
      Role: {
        id: 3,
        name: "Customer",
      },
      status: true,
      Store: null,
      ProductsPurchased: [],
      ProductsFavorites: [],
      StoresFavorites: [],
    };
    setNewUser(userData);
    handlePost(userData);
  };

  const handlePost = async (userData) => {
    try {
      const response = await PostData(userData);
      toast.success(`User ${response.FirstName} created successfully`);
      setUsers([...Users, userData]);
      handleClose();
      if (RoleSelect === 2) {
        setShowStore(true);
      }
    } catch (error) {
      toast.error("Error when trying to create user");
    }
  };

  const handleDeleteUser = async () => {
    if (selectedUser) {
      try {
        await DeleteData(selectedUser.id);
        setUsers((prevUsers) =>
          prevUsers.filter((user) => user.id !== selectedUser.id)
        );
        toast.success(`User deleted successfully`);
      } catch (error) {
        toast.error("Error when trying to delete user");
      } finally {
        handleCloseDelete();
      }
    }
  };

  return (
    <>
      <NavBar />
      {NewUser && (
        <CreateStore show={showStore} setShow={setShowStore} user={NewUser} />
      )}
      <Modal show={showDelete} onHide={handleCloseDelete}>
        <Modal.Header closeButton>
          <Modal.Title>
            This user is permanently removed from the data. Are you sure to
            continue?
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="flex flex-col gap-3">
          <Button
            variant="secondary"
            onClick={handleCloseDelete}
            disabled={loadingDelete}>
            NO
          </Button>
          <Button
            variant="primary"
            onClick={handleDeleteUser}
            disabled={loadingDelete}>
            {loadingDelete ? "Deleting..." : "YES"}
          </Button>
          {errorDelete && (
            <div style={{ color: "red" }}>Error: {errorDelete.message}</div>
          )}
        </Modal.Body>
      </Modal>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create User</Modal.Title>
        </Modal.Header>
        <Modal.Body className="flex flex-col gap-3">
          <TextField
            error={FirstNameValidate}
            helperText={FirstNameValidate ? "complete required field" : false}
            id="outlined-basic"
            label="FirsName"
            variant="outlined"
            size="small"
            onChange={(e) => setFirstName(e.target.value)}
          />
          <TextField
            error={LastNameValidate}
            helperText={LastNameValidate ? "complete required field" : false}
            id="outlined-basic"
            label="LastName"
            variant="outlined"
            size="small"
            onChange={(e) => setLastName(e.target.value)}
          />
          <TextField
            error={EmailValidate}
            helperText={EmailValidate ? "complete required field" : false}
            id="outlined-basic"
            label="Email"
            variant="outlined"
            size="small"
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            error={PasswordValidate}
            helperText={PasswordValidate ? "complete required field" : false}
            id="outlined-basic"
            label="Password"
            variant="outlined"
            size="small"
            onChange={(e) => setPassword(e.target.value)}
          />
          <FormControl size="small" error={RoleSelectValidate}>
            <InputLabel id="demo-simple-select-error-label">Role</InputLabel>
            <Select
              labelId="demo-simple-select-error-label"
              id="demo-simple-select-error"
              value={RoleSelect}
              label="Role"
              onChange={(e) => setRoleSelect(e.target.value)}
              renderValue={(value) => `${value}`}>
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={3}>Customer</MenuItem>
              <MenuItem value={2}>Seller</MenuItem>
            </Select>
          </FormControl>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCreateNewUser}>
            Create New User
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="flex flex-col justify-center items-center">
        <div className="font-mono w-[1000px] min-h-[80vh] mb-8">
          <div className="flex justify-between px-4 py-2 bg-gray-400 mt-6 rounded-t-2xl font-bold">
            <div className="flex gap-2">
              <MDBBtn
                size="sm"
                color="tertiary"
                className={`hover:text-gray-700 font-bold  ${
                  activePageMain === 1 ? "bg-blue-300/30" : ""
                }`}
                onClick={() => changePageMain(1)}>
                users
              </MDBBtn>
              <MDBBtn
                size="sm"
                color="tertiary"
                className={`hover:text-gray-700 font-bold  ${
                  activePageMain === 2 ? "bg-blue-300/30" : ""
                }`}
                onClick={() => changePageMain(2)}>
                stores
              </MDBBtn>
              <MDBBtn
                size="sm"
                color="tertiary"
                className={`hover:text-gray-700 font-bold  ${
                  activePageMain === 3 ? "bg-blue-300/30" : ""
                }`}
                onClick={() => changePageMain(3)}>
                products
              </MDBBtn>
            </div>
          </div>

          {
            <div className={activePageMain === 1 ? "" : "hidden"}>
              <div className="flex justify-between px-4 py-2 bg-gray-400/70 font-bold">
                <div className="flex gap-2">
                  <MDBBtn
                    size="sm"
                    color="tertiary"
                    className={`hover:text-gray-700 font-bold  ${
                      activePage === 1 ? "bg-blue-300/30" : ""
                    }`}
                    onClick={() => changePage(1)}>
                    All
                  </MDBBtn>
                  <MDBBtn
                    size="sm"
                    color="tertiary"
                    className={`hover:text-gray-700 font-bold  ${
                      activePage === 2 ? "bg-blue-300/30" : ""
                    }`}
                    onClick={() => changePage(2)}>
                    Customers
                  </MDBBtn>
                  <MDBBtn
                    size="sm"
                    color="tertiary"
                    className={`hover:text-gray-700 font-bold  ${
                      activePage === 3 ? "bg-blue-300/30" : ""
                    }`}
                    onClick={() => changePage(3)}>
                    Sellers
                  </MDBBtn>
                  <MDBBtn
                    size="sm"
                    color="tertiary"
                    className={`hover:text-gray-700 font-bold  ${
                      activePage === 4 ? "bg-blue-300/30" : ""
                    }`}
                    onClick={() => changePage(4)}>
                    Active
                  </MDBBtn>
                  <MDBBtn
                    size="sm"
                    color="tertiary"
                    className={`hover:text-gray-700 font-bold  ${
                      activePage === 5 ? "bg-blue-300/30" : ""
                    }`}
                    onClick={() => changePage(5)}>
                    Disabled
                  </MDBBtn>
                </div>
                <MDBBtn size="sm" color="secondary" onClick={handleShow}>
                  create user
                </MDBBtn>
              </div>
              <table className="table-fixed text-center w-full max-w-[80vw]">
                <thead>
                  <tr className="bg-gray-300 text-sm font-mono">
                    <th className="">Full Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody className={activePage === 1 ? "" : "hidden"}>
                  {Users.filter(
                    (user) => user.Role.id === 2 || user.Role.id === 3
                  ).map((user) => (
                    <tr key={user.id}>
                      <td className="py-3 px-6 text-center">
                        <div className="flex items-center">
                          {user.FirstName} {user.LastName}
                        </div>
                      </td>
                      <td>{user.email}</td>
                      <td className="py-3 px-6 text-center">
                        <span className="bg-blue-200 text-blue-600 py-1 px-3 rounded-full text-xs">
                          {user.Role.name}
                        </span>
                      </td>
                      <td>
                        <MDBBtn
                          size="sm"
                          color={user.status ? "success" : "danger"}
                          onClick={() => handleDeactivateUser(user)}>
                          {user.status ? "Active" : "Disabled"}
                        </MDBBtn>
                      </td>
                      <td>
                        <MDBBtn
                          size="sm"
                          color="danger"
                          outline
                          onClick={() => handleShowDelete(user)}>
                          <DeleteForeverIcon />
                        </MDBBtn>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tbody className={activePage === 2 ? "" : "hidden"}>
                  {Users.filter((user) => user.Role.id === 3).map((user) => (
                    <tr key={user.id}>
                      <td className="py-3 px-6 text-center">
                        <div className="flex items-center">
                          {user.FirstName} {user.LastName}
                        </div>
                      </td>
                      <td>{user.email}</td>
                      <td className="py-3 px-6 text-center">
                        <span className="bg-blue-200 text-blue-600 py-1 px-3 rounded-full text-xs">
                          {user.Role.name}
                        </span>
                      </td>
                      <td>
                        <MDBBtn
                          size="sm"
                          color={user.status ? "success" : "danger"}
                          onClick={() => handleDeactivateUser(user)}>
                          {user.status ? "Active" : "Disabled"}
                        </MDBBtn>
                      </td>
                      <td>
                        <MDBBtn
                          size="sm"
                          color="danger"
                          outline
                          onClick={() => handleShowDelete(user)}>
                          <DeleteForeverIcon />
                        </MDBBtn>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tbody className={activePage === 3 ? "" : "hidden"}>
                  {Users.filter((user) => user.Role.id === 2).map((user) => (
                    <tr key={user.id}>
                      <td className="py-3 px-6 text-center">
                        <div className="flex items-center">
                          {user.FirstName} {user.LastName}
                        </div>
                      </td>
                      <td>{user.email}</td>
                      <td className="py-3 px-6 text-center">
                        <span className="bg-blue-200 text-blue-600 py-1 px-3 rounded-full text-xs">
                          {user.Role.name}
                        </span>
                      </td>
                      <td>
                        <MDBBtn
                          size="sm"
                          color={user.status ? "success" : "danger"}
                          onClick={() => handleDeactivateUser(user)}>
                          {user.status ? "Active" : "Disabled"}
                        </MDBBtn>
                      </td>
                      <td>
                        <MDBBtn
                          size="sm"
                          color="danger"
                          outline
                          onClick={() => handleShowDelete(user)}>
                          <DeleteForeverIcon />
                        </MDBBtn>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tbody className={activePage === 4 ? "" : "hidden"}>
                  {Users.filter(
                    (user) =>
                      (user.Role.id === 2 || user.Role.id === 3) && user.status
                  ).map((user) => (
                    <tr key={user.id}>
                      <td className="py-3 px-6 text-center">
                        <div className="flex items-center">
                          {user.FirstName} {user.LastName}
                        </div>
                      </td>
                      <td>{user.email}</td>
                      <td className="py-3 px-6 text-center">
                        <span className="bg-blue-200 text-blue-600 py-1 px-3 rounded-full text-xs">
                          {user.Role.name}
                        </span>
                      </td>
                      <td>
                        <MDBBtn
                          size="sm"
                          color={user.status ? "success" : "danger"}
                          onClick={() => handleDeactivateUser(user)}>
                          {user.status ? "Active" : "Disabled"}
                        </MDBBtn>
                      </td>
                      <td>
                        <MDBBtn
                          size="sm"
                          color="danger"
                          outline
                          onClick={() => handleShowDelete(user)}>
                          <DeleteForeverIcon />
                        </MDBBtn>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tbody className={activePage === 5 ? "" : "hidden"}>
                  {Users.filter(
                    (user) =>
                      (user.Role.id === 2 || user.Role.id === 3) && !user.status
                  ).map((user) => (
                    <tr key={user.id}>
                      <td className="py-3 px-6 text-center">
                        <div className="flex items-center">
                          {user.FirstName} {user.LastName}
                        </div>
                      </td>
                      <td>{user.email}</td>
                      <td className="py-3 px-6 text-center">
                        <span className="bg-blue-200 text-blue-600 py-1 px-3 rounded-full text-xs">
                          {user.Role.name}
                        </span>
                      </td>
                      <td>
                        <MDBBtn
                          size="sm"
                          color={user.status ? "success" : "danger"}
                          onClick={() => handleDeactivateUser(user)}>
                          {user.status ? "Active" : "Disabled"}
                        </MDBBtn>
                      </td>
                      <td>
                        <MDBBtn
                          size="sm"
                          color="danger"
                          outline
                          onClick={() => handleShowDelete(user)}>
                          <DeleteForeverIcon />
                        </MDBBtn>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          }

          {
            <div className={activePageMain === 2 ? "" : "hidden"}>
              <div className="flex justify-between px-4 py-2 bg-gray-400/70 font-bold">
                <div className="flex gap-2">
                  <MDBBtn
                    size="sm"
                    color="tertiary"
                    className={`hover:text-gray-700 font-bold  ${
                      activePage === 1 ? "bg-blue-300/30" : ""
                    }`}
                    onClick={() => changePage(1)}>
                    All
                  </MDBBtn>
                  <MDBBtn
                    size="sm"
                    color="tertiary"
                    className={`hover:text-gray-700 font-bold  ${
                      activePage === 4 ? "bg-blue-300/30" : ""
                    }`}
                    onClick={() => changePage(2)}>
                    Active
                  </MDBBtn>
                  <MDBBtn
                    size="sm"
                    color="tertiary"
                    className={`hover:text-gray-700 font-bold  ${
                      activePage === 5 ? "bg-blue-300/30" : ""
                    }`}
                    onClick={() => changePage(3)}>
                    Disabled
                  </MDBBtn>
                </div>
              </div>
              <table className="table-fixed text-center w-full max-w-[80vw]">
                <thead>
                  <tr className="bg-gray-300 text-sm font-mono">
                    <th className="">Image</th>
                    <th>Name</th>
                    <th>Inventory</th>
                    <th>Email Owner</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody className={activePage === 1 ? "" : "hidden"}>
                  {Stores.map((store) => (
                    <tr key={store.id}>
                      <td>
                        <div className="w-full flex justify-center">
                          <img
                            src={store.image}
                            alt=""
                            className="w-20 h-20 object-cover"
                          />
                        </div>
                      </td>
                      <td>{store.Name}</td>
                      <td>{store.inventory.length}</td>
                      <td>{store.Owner.email}</td>
                      <td>
                        <MDBBtn
                          size="sm"
                          color={store.status ? "success" : "danger"}
                          onClick={() => handleDeactivateStore(store)}>
                          {store.status ? "Active" : "Disabled"}
                        </MDBBtn>
                      </td>
                    </tr>
                  ))}
                </tbody>

                <tbody className={activePage === 2 ? "" : "hidden"}>
                  {Stores.filter((store) => store.status).map((store) => (
                    <tr key={store.id}>
                      <td>
                        <div className="w-full flex justify-center">
                          <img
                            src={store.image}
                            alt=""
                            className="w-20 h-20 object-cover"
                          />
                        </div>
                      </td>
                      <td>{store.Name}</td>
                      <td>{store.inventory.length}</td>
                      <td>{store.Owner.email}</td>
                      <td>
                        <MDBBtn
                          size="sm"
                          color={store.status ? "success" : "danger"}
                          onClick={() => handleDeactivateStore(store)}>
                          {store.status ? "Active" : "Disabled"}
                        </MDBBtn>
                      </td>
                    </tr>
                  ))}
                </tbody>

                <tbody className={activePage === 3 ? "" : "hidden"}>
                  {Stores.filter((store) => !store.status).map((store) => (
                    <tr key={store.id}>
                      <td>
                        <div className="w-full flex justify-center">
                          <img
                            src={store.image}
                            alt=""
                            className="w-20 h-20 object-cover"
                          />
                        </div>
                      </td>
                      <td>{store.Name}</td>
                      <td>{store.inventory.length}</td>
                      <td>{store.Owner.email}</td>
                      <td>
                        <MDBBtn
                          size="sm"
                          color={store.status ? "success" : "danger"}
                          onClick={() => handleDeactivateStore(store)}>
                          {store.status ? "Active" : "Disabled"}
                        </MDBBtn>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          }

          {
            <div className={activePageMain === 3 ? "" : "hidden"}>
              <div className="flex justify-between px-4 py-2 bg-gray-400/70 font-bold">
                <div className="flex gap-2">
                  <MDBBtn
                    size="sm"
                    color="tertiary"
                    className={`hover:text-gray-700 font-bold  ${
                      activePage === 1 ? "bg-blue-300/30" : ""
                    }`}
                    onClick={() => changePage(1)}>
                    All
                  </MDBBtn>
                  <MDBBtn
                    size="sm"
                    color="tertiary"
                    className={`hover:text-gray-700 font-bold  ${
                      activePage === 4 ? "bg-blue-300/30" : ""
                    }`}
                    onClick={() => changePage(2)}>
                    Active
                  </MDBBtn>
                  <MDBBtn
                    size="sm"
                    color="tertiary"
                    className={`hover:text-gray-700 font-bold  ${
                      activePage === 5 ? "bg-blue-300/30" : ""
                    }`}
                    onClick={() => changePage(3)}>
                    Disabled
                  </MDBBtn>
                </div>
              </div>
              <table className="table-fixed text-center w-full max-w-[80vw]">
                <thead>
                  <tr className="bg-gray-300 text-sm font-mono">
                    <th className="">Image</th>
                    <th>Title</th>
                    <th>Price</th>
                    <th>Store</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody className={activePage === 1 ? "" : "hidden"}>
                  {Products.map((product) => (
                    <tr key={product.id}>
                      <td>
                        <div className="w-full flex justify-center">
                          <img
                            src={product.images[0]}
                            alt=""
                            className="w-20 h-20 object-cover"
                          />
                        </div>
                      </td>
                      <td>{product.title}</td>
                      <td>{product.price}</td>
                      <td>{product.store.Name}</td>
                      <td>
                        <MDBBtn
                          size="sm"
                          color={product.status ? "success" : "danger"}
                          onClick={() => handleDeactivateProduct(product)}>
                          {product.status ? "Active" : "Disabled"}
                        </MDBBtn>
                      </td>
                    </tr>
                  ))}
                </tbody>

                <tbody className={activePage === 2 ? "" : "hidden"}>
                  {Products.filter((product) => product.status).map(
                    (product) => (
                      <tr key={product.id}>
                        <td>
                          <div className="w-full flex justify-center">
                            <img
                              src={product.images[0]}
                              alt=""
                              className="w-20 h-20 object-cover"
                            />
                          </div>
                        </td>
                        <td>{product.title}</td>
                        <td>{product.price}</td>
                        <td>{product.store.Name}</td>
                        <td>
                          <MDBBtn
                            size="sm"
                            color={product.status ? "success" : "danger"}
                            onClick={() => handleDeactivateProduct(product)}>
                            {product.status ? "Active" : "Disabled"}
                          </MDBBtn>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>

                <tbody className={activePage === 3 ? "" : "hidden"}>
                  {Products.filter((product) => !product.status).map(
                    (product) => (
                      <tr key={product.id}>
                        <td>
                          <div className="w-full flex justify-center">
                            <img
                              src={product.images[0]}
                              alt=""
                              className="w-20 h-20 object-cover"
                            />
                          </div>
                        </td>
                        <td>{product.title}</td>
                        <td>{product.price}</td>
                        <td>{product.store.Name}</td>
                        <td>
                          <MDBBtn
                            size="sm"
                            color={product.status ? "success" : "danger"}
                            onClick={() => handleDeactivateProduct(product)}>
                            {product.status ? "Active" : "Disabled"}
                          </MDBBtn>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          }
        </div>
      </div>
    </>
  );
};

AdminProfile.propTypes = {};

export default AdminProfile;
