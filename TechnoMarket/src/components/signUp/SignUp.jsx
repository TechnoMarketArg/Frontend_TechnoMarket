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
import { useState, useContext } from 'react';
import { useGET, usePOST } from '../customHook/CustomHook';
import { TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AuthenticationContext } from '../../services/authentication/Authentication.context';


const SignUp = () => {
  const [idGenerate, loadingID, errorID] = useGET('https://www.uuidtools.com/api/generate/v1');
  const [postData, loadingPOST, errorPOST] = usePOST('http://localhost:3000/users');
  const [users, LUsers, EUsers] = useGET('http://localhost:3000/users');
  const navigate = useNavigate();
  const { handleLogin } = useContext(AuthenticationContext);

  const [FirstName, setFirstName] = useState('');
  const [FirstNameValidate, setFirstNameValidate] = useState(false);

  const [LastName, setLastName] = useState('');
  const [LastNameValidate, setLastNameValidate] = useState(false);

  const [Email, setEmail] = useState('');
  const [EmailValidate, setEmailValidate] = useState(false);

  const [Password, setPassword] = useState('');
  const [PasswordValidate, setPasswordValidate] = useState(false);

  const RoleSelect = 3;



  const handleCreateNewUser = async () => {
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

    try {
      const response = await postData(userData);
      toast.success(`User ${response.FirstName} created successfully`);
      handleLogin(response); // Loguear al usuario
      navigate('/'); // Redirigir al home
    } catch (error) {
      toast.error('Error when trying to create user');
      console.error(error);
    }
  };

  return (
    <MDBContainer className="my-5">
      
      <MDBCard>
        <MDBRow className="g-0" >
          <MDBCol md="6">
          <MDBBtn
                className="mb-4 px-3"
                size="l"
                type="button"
                color="ligth"
                style={{ backgroundColor: '#87CEEB', borderColor: '#87CEEB' }}
                onClick={() => navigate('/')}
              >
                Inicio
              </MDBBtn>
            <MDBCardImage
              src={technoMarket}
              alt="login form"
              className="rounded-start w-100"
              style={{ borderRadius: '%' }}
            />
           
          </MDBCol>
          
          <MDBCol md="6">
            <MDBCardBody className="flex flex-col gap-4">
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
                type="password"
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
