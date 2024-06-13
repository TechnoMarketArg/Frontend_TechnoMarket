import technoMarket from './technoMarket.jpg'
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import './styles.css';
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBInput
} from 'mdb-react-ui-kit';
import { useState, useRef, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


function Login() {
  const [userValid, setUserValid] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  

  const URL = 'https://api.escuelajs.co/api/v1/users';
  
  const [Data, setData] = useState([]);

  const [Cargando, setCargando] = useState(true);


  const [Error, setError] = useState(null);

  useEffect(() => {
    
    const fetchData = async () => {
      try {
       
        const response = await axios.get(URL);
        
        if (response.status < 200 || response.status >= 300) {
          throw new Error('Error en la red: ' + response.statusText);
        }

        setData(response.data);

        setCargando(false);
      } catch (error) {
        
        setError(error);

        setCargando(false);
      }
    };

    fetchData();

  }, []);


  //Estado para manejar los errores en los campos de entrada y la existencia de un usuario.
  const [errors, setErrors] = useState({
    email: false,
    password: false,
    exist: false,
  });

  //Referencias a los campos de entrada.
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  //Actualiza el estado del email y resetea el error de email.
  const changeEmailHandler = (event) => {
    setErrors({ ...errors, email: false });
    setEmail(event.target.value);
  };

  //Actualiza el estado de la contraseña y resetea el error de contraseña.
  const changePasswordHandler = (event) => {
    setErrors({ ...errors, password: false });
    setPassword(event.target.value);
  };

  //Maneja el envío del formulario. Valida que los campos no estén vacíos, muestra los errores si es necesario
  //y llama a handleLogin para iniciar sesión. Luego navega a la página principal.
  const loginHandler = (event) => {
    event.preventDefault();
  
    if (!emailRef.current.value) {
      emailRef.current.focus();
      setErrors({ ...errors, email: true });
      return;
    }
  
    if (!password) {
      passwordRef.current.focus();
      setErrors({ ...errors, password: true });
      return;
    }
  
    setErrors({ ...errors, exist: false });
    console.log(emailRef.current.value, passwordRef.current.value);
  
  };












  return (
    <div className="full-bg">
      <MDBContainer className="my-5">
        <MDBCard>
          <MDBRow className='g-0'>
            <MDBCol md='6'>
              <MDBCardImage src={technoMarket} alt="login form" className='rounded-start w-100' style={{ borderRadius: '%' }} />
            </MDBCol>
            <MDBCol md='6'>
              <MDBCardBody className='d-flex flex-column'>
                <div className='d-flex flex-row mt-2'>
                </div>
                <h5 className="fw-normal my-4 pb-3" style={{ letterSpacing: '1px' }}>Accede a tu Cuenta</h5>
                <MDBInput wrapperClass='mb-4' label='Email address' id='formControlLg' type='email' size="lg" 
                  onChange={changeEmailHandler} 
                  ref={emailRef} 
                  value={email} 
                  className={errors.email && "border border-danger"}/>
                <MDBInput wrapperClass='mb-4' label='Password' id='formControlLg' type='password' size="lg" 
                className={errors.password && "border border-danger"}
                onChange={changePasswordHandler}
                value={password}
                ref={passwordRef}/>
                <MDBBtn className="mb-4 px-5" color='dark' size='lg'
                type="submit"
                onClick={loginHandler}
                block
                >Login</MDBBtn>

                <p className="mb-5 pb-lg-2" style={{ color: '#393f81' }}>No tienes una Cuenta? <a href="#!" style={{ color: '#393f81' }}>Registrate Aqui</a></p>
                <div className='d-flex flex-row justify-content-start'>
                  <a href="#!" className="small text-muted me-1"></a>
                  <a href="#!" className="small text-muted">Copyright By TechnoMarket</a>
                </div>
              </MDBCardBody>
            </MDBCol>
          </MDBRow>
        </MDBCard>
      </MDBContainer>
    </div>
  );
}




export default Login;
