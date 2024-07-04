import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
} from 'mdb-react-ui-kit';
import { Toaster, toast } from 'sonner';
import technoMarket from './technoMarket.jpg';
import { useState, useContext, useEffect } from 'react';
import { AuthenticationContext } from '../../services/authentication/Authentication.context.jsx';
import { useGET, usePOST } from '../customHook/CustomHook';
import { TextField } from '@mui/material';

const SignUp = () => {
  const [idGenerate, loadingID, errorID] = useGET(
    'https://www.uuidtools.com/api/generate/v1'
  );
  const [PostData, loadingPOST, errorPOST] = usePOST(
    'http://localhost:3000/users'
  );
  const { handleRegister, user } = useContext(AuthenticationContext);

  const [users, setUsers] = useState([]); // State to store users

  const [FirstName, setFirstName] = useState('');
  const [FirstNameValidate, setFirstNameValidate] = useState(false);

  const [LastName, setLastName] = useState('');
  const [LastNameValidate, setLastNameValidate] = useState(false);

  const [Email, setEmail] = useState('');
  const [EmailValidate, setEmailValidate] = useState(false);

  const [Password, setPassword] = useState('');
  const [PasswordValidate, setPasswordValidate] = useState(false);

  const RoleSelect = 3; // Definir el rol por defecto

  const handleClose = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
  };

  const [showStore, setShowStore] = useState(false); // Definir showStore state

  

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

    // Reset all validation states
    setFirstNameValidate(false);
    setLastNameValidate(false);
    setEmailValidate(false);
    setPasswordValidate(false);

    if (users.some((u) => u.email === Email && u.status === true)) {
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
        name: 'Customer',
      },
      status: true,
      Store: null,
      ProductsPurchased: [],
      ProductsFavorites: [],
      StoresFavorites: [],
    };

    handlePost(userData);
  };

  const handlePost = async (userData) => {
    try {
      const response = await PostData(userData);
      setUsers([...users, response]); // Add new user to state
      toast.success(`User ${response.FirstName} created successfully`);
      handleClose();
      if (RoleSelect === 2) {
        setShowStore(true);
      }
    } catch (error) {
      toast.error('Error when trying to create user');
    }
  };

  return (
    <MDBContainer className="my-5">
      <Toaster />
      <MDBCard>
        <MDBRow className="g-0">
          <MDBCol md="6">
            <MDBCardImage
              src={technoMarket}
              alt="login form"
              className="rounded-start w-100"
              style={{ borderRadius: '%' }}
            />
          </MDBCol>
          <MDBCol md="6">
            <MDBCardBody className="d-flex flex-column">
              <div className="d-flex flex-row mt-2"></div>
              <h5 className="fw-normal my-4 pb-3" style={{ letterSpacing: '1px' }}>
                Registrate
              </h5>
              <TextField
                error={FirstNameValidate}
                helperText={FirstNameValidate ? 'complete required field' : false}
                id="outlined-basic"
                label="FirstName"
                variant="outlined"
                size="small"
                value={FirstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <TextField
                error={LastNameValidate}
                helperText={LastNameValidate ? 'complete required field' : false}
                id="outlined-basic"
                label="LastName"
                variant="outlined"
                size="small"
                value={LastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <TextField
                error={EmailValidate}
                helperText={EmailValidate ? 'complete required field' : false}
                id="outlined-basic"
                label="Email"
                variant="outlined"
                size="small"
                value={Email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                error={PasswordValidate}
                helperText={PasswordValidate ? 'complete required field' : false}
                id="outlined-basic"
                label="Password"
                variant="outlined"
                size="small"
                type='password'
                value={Password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <MDBBtn
                className="mb-4 px-5"
                size="lg"
                type="submit"
                color="dark"
                onClick={handleCreateNewUser}
              >
                Register
              </MDBBtn>
              <div className="d-flex flex-row justify-content-start">
                <a href="" className="small text-muted me-1"></a>
                <a href="" className="small text-muted">
                  Copyright By TechnoMarket
                </a>
              </div>
            </MDBCardBody>
          </MDBCol>
        </MDBRow>
      </MDBCard>
    </MDBContainer>
  );
};

export default SignUp;

