import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBInput,
} from 'mdb-react-ui-kit';
import { Toaster, toast } from 'sonner';
import technoMarket from './technoMarket.png';
import { useState, useRef } from 'react';
import { useContext } from 'react';
import { AuthenticationContext } from '../../services/authentication/Authentication.context.jsx';
import { MDBIcon } from 'mdb-react-ui-kit';
const SignUp = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({
    fullName: false,
    email: false,
    password: false,
    exist: false,
  });

  const { handleRegister } = useContext(AuthenticationContext);

  const fullNameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const changeFullNameHandler = (event) => {
    setErrors({ ...errors, fullName: false });
    setFullName(event.target.value);
  };

  const changeEmailHandler = (event) => {
    setErrors({ ...errors, email: false });
    setEmail(event.target.value);
  };

  const changePasswordHandler = (event) => {
    setErrors({ ...errors, password: false });
    setPassword(event.target.value);
  };

  const singUpHandler = (event) => {
    event.preventDefault();

    if (!fullNameRef.current.value) {
      fullNameRef.current.focus();
      setErrors({ ...errors, fullName: true });
      toast.error('Rellene el Campo del Nombre');
      return;
    }

    if (!emailRef.current.value) {
      emailRef.current.focus();
      setErrors({ ...errors, email: true });
      toast.error('Rellene el Campo de Email');
      return;
    }

    if (!passwordRef.current.value) {
      passwordRef.current.focus();
      setErrors({ ...errors, password: true });
      toast.error('Rellene el Campo de la Contraseña');
      return;
    }

    setErrors({ ...errors, exist: false });
    console.log(fullNameRef.current.value, emailRef.current.value, passwordRef.current.value);

    handleRegister(fullName, email, password);
    toast.success('Registro Exitoso!');
  };

  return (
    <MDBContainer fluid>
      <Toaster richColors position='top-center' />
      <MDBCard className='text-black m-5' style={{ borderRadius: '25px' }}>
        <MDBCardBody className='rounded-[25px] bg-[#e4f4fd]'>
          <MDBRow>
            <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>
              <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Registrate!</p>

              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="user me-3" size='lg' />
                <MDBInput
                  label='Full Name'
                  id='form1'
                  type='text'
                  onChange={changeFullNameHandler}
                  required
                  ref={fullNameRef}
                  value={fullName}
                  className={`w-100 ${errors.fullName ? 'border border-danger' : ''}`}
                />
              </div>

              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="envelope me-3" size='lg' />
                <MDBInput
                  label='Your Email'
                  id='form2'
                  type='email'
                  onChange={changeEmailHandler}
                  required
                  ref={emailRef}
                  value={email}
                  className={`w-100 ${errors.email ? 'border border-danger' : ''}`}
                />
              </div>

              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="lock me-3" size='lg' />
                <MDBInput
                  label='Password'
                  id='form3'
                  type='password'
                  onChange={changePasswordHandler}
                  required
                  ref={passwordRef}
                  value={password}
                  className={`w-100 ${errors.password ? 'border border-danger' : ''}`}
                />
              </div>

              <MDBBtn className='mb-4' size='lg' type='submit' onClick={singUpHandler}>Register</MDBBtn>
            </MDBCol>

            <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
              <MDBCardImage src={technoMarket} fluid style={{ borderRadius: '25px', height: "450px" }} />
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}

export default SignUp;
