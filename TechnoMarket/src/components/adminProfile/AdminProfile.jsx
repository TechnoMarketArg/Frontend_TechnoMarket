import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import NavBar from "../navBar/NavBar";
import { MDBBtn } from "mdb-react-ui-kit";
import { useGET, usePOST, usePUT } from "../customHook/CustomHook";
import Loading from "../loading/Loading";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
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

const AdminProfile = () => {
  const [idGenerate, loadingID, errorID] = useGET(
    "https://www.uuidtools.com/api/generate/v1"
  );

  const [users, LUsers, EUsers] = useGET("http://localhost:3000/users");
  const [stores, LStores, EStores] = useGET("http://localhost:3000/stores");

  const [UpdatedData, PutData, loading, error] = usePUT(
    "http://localhost:3000/users"
  );

  const [PostData, loadingPOST, errorPOST] = usePOST(
    "http://localhost:3000/users"
  );
  const [Users, setUsers] = useState([]);

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

  if (LUsers) {
    return <Loading />;
  }
  if (EUsers) {
    return <h1>Error...</h1>;
  }

  const handleDeactivateUser = (user) => {
    const updatedUser = { ...user, status: !user.status };
    PutData(updatedUser, user.id)
      .then((data) => {
        const updatedUsers = Users.map((u) => (u.id === user.id ? data : u));
        setUsers(updatedUsers);
      })
      .catch((err) => {
        console.error("Error updating user:", err);
      });
  };

  const changePage = (page) => {
    setActivePage(page);
  };
  const changePageMain = (page) => {
    setActivePageMain(page);
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
      handleClose();
      if (RoleSelect === 2) {
        setShowStore(true);
      }
    } catch (error) {
      toast.error("Error when trying to create user");
    }
  };

  return (
    <>
      <NavBar />
      {NewUser && (
        <CreateStore show={showStore} setShow={setShowStore} user={NewUser} />
      )}
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
                color="tertiary"
                className={`hover:text-gray-700 font-bold  ${
                  activePageMain === 1 ? "bg-blue-300/30" : ""
                }`}
                onClick={() => changePageMain(1)}>
                users
              </MDBBtn>
              <MDBBtn
                color="tertiary"
                className={`hover:text-gray-700 font-bold  ${
                  activePageMain === 2 ? "bg-blue-300/30" : ""
                }`}
                onClick={() => changePageMain(2)}>
                stores
              </MDBBtn>
              <MDBBtn
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
                    color="tertiary"
                    className={`hover:text-gray-700 font-bold  ${
                      activePage === 1 ? "bg-blue-300/30" : ""
                    }`}
                    onClick={() => changePage(1)}>
                    All
                  </MDBBtn>
                  <MDBBtn
                    color="tertiary"
                    className={`hover:text-gray-700 font-bold  ${
                      activePage === 2 ? "bg-blue-300/30" : ""
                    }`}
                    onClick={() => changePage(2)}>
                    Customers
                  </MDBBtn>
                  <MDBBtn
                    color="tertiary"
                    className={`hover:text-gray-700 font-bold  ${
                      activePage === 3 ? "bg-blue-300/30" : ""
                    }`}
                    onClick={() => changePage(3)}>
                    Sellers
                  </MDBBtn>
                  <MDBBtn
                    color="tertiary"
                    className={`hover:text-gray-700 font-bold  ${
                      activePage === 4 ? "bg-blue-300/30" : ""
                    }`}
                    onClick={() => changePage(4)}>
                    Active
                  </MDBBtn>
                  <MDBBtn
                    color="tertiary"
                    className={`hover:text-gray-700 font-bold  ${
                      activePage === 5 ? "bg-blue-300/30" : ""
                    }`}
                    onClick={() => changePage(5)}>
                    Disabled
                  </MDBBtn>
                </div>
                <MDBBtn color="secondary" onClick={handleShow}>
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
                          color={user.status ? "success" : "danger"}
                          onClick={() => handleDeactivateUser(user)}>
                          {user.status ? "Active" : "Disabled"}
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
                          color={user.status ? "success" : "danger"}
                          onClick={() => handleDeactivateUser(user)}>
                          {user.status ? "Active" : "Disabled"}
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
                          color={user.status ? "success" : "danger"}
                          onClick={() => handleDeactivateUser(user)}>
                          {user.status ? "Active" : "Disabled"}
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
                          color={user.status ? "success" : "danger"}
                          onClick={() => handleDeactivateUser(user)}>
                          {user.status ? "Active" : "Disabled"}
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
                          color={user.status ? "success" : "danger"}
                          onClick={() => handleDeactivateUser(user)}>
                          {user.status ? "Active" : "Disabled"}
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
                    color="tertiary"
                    className={`hover:text-gray-700 font-bold  ${
                      activePage === 1 ? "bg-blue-300/30" : ""
                    }`}
                    onClick={() => changePage(1)}>
                    All
                  </MDBBtn>
                  <MDBBtn
                    color="tertiary"
                    className={`hover:text-gray-700 font-bold  ${
                      activePage === 4 ? "bg-blue-300/30" : ""
                    }`}
                    onClick={() => changePage(2)}>
                    Active
                  </MDBBtn>
                  <MDBBtn
                    color="tertiary"
                    className={`hover:text-gray-700 font-bold  ${
                      activePage === 5 ? "bg-blue-300/30" : ""
                    }`}
                    onClick={() => changePage(3)}>
                    Disabled
                  </MDBBtn>
                </div>
                <MDBBtn color="secondary" onClick={handleShow}>
                  create user
                </MDBBtn>
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
                  {stores.map((store) => (
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
                        <MDBBtn color={store.status ? "success" : "danger"}>
                          {store.status ? "Active" : "Disabled"}
                        </MDBBtn>
                      </td>
                    </tr>
                  ))}
                </tbody>

                <tbody className={activePage === 2 ? "" : "hidden"}>
                  {stores.filter(store => store.status).map((store) => (
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
                        <MDBBtn color={store.status ? "success" : "danger"}>
                          {store.status ? "Active" : "Disabled"}
                        </MDBBtn>
                      </td>
                    </tr>
                  ))}
                </tbody>

                <tbody className={activePage === 2 ? "" : "hidden"}>
                  {stores.filter(store => !store.status).map((store) => (
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
                        <MDBBtn color={store.status ? "success" : "danger"}>
                          {store.status ? "Active" : "Disabled"}
                        </MDBBtn>
                      </td>
                    </tr>
                  ))}
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
