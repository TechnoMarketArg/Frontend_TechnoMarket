import technoMarket from "./technoMarket.jpg";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "./styles.css";
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBInput,
} from "mdb-react-ui-kit";
import { useState, useRef, useContext } from "react";
import { AuthenticationContext } from "../../services/authentication/Authentication.context";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../customHook/CustomHook";
import { toast } from "sonner";
import Loading from "../loading/Loading";

const Login = () => {
  const { handleLogin } = useContext(AuthenticationContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [Authentication, LUser, EUser] = useAuth();

  const [errors, setErrors] = useState({
    email: false,
    password: false,
    exist: false,
  });

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const changeEmailHandler = (event) => {
    setErrors({ ...errors, email: false });
    setEmail(event.target.value);
  };

  const changePasswordHandler = (event) => {
    setErrors({ ...errors, password: false });
    setPassword(event.target.value);
  };

  const loginHandler = async (event) => {
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

    try {
      const user = await Authentication(email, password);

      if (user.length > 0 && user[0].status === true) {
        handleLogin(user[0]);
        navigate("/");
      } else {
        toast.error('Email or Password incorrect or the user is not active');
      }
    } catch (error) {
      toast.error('Authentication Error');
    }
  };

  return (
    <MDBContainer className="my-5">
      <MDBCard>
        <MDBRow className="g-0">
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
              style={{ borderRadius: "%" }}
            />
          </MDBCol>
          <MDBCol md="6">
            <MDBCardBody className="d-flex flex-column">
              <div className="d-flex flex-row mt-2"></div>
              <h5 className="fw-normal my-4 pb-3" style={{ letterSpacing: "1px" }}>
                Accede a tu Cuenta
              </h5>
              <MDBInput
                wrapperClass="mb-4"
                label="Email address"
                id="formControllg"
                type="email"
                size="lg"
                onChange={changeEmailHandler}
                ref={emailRef}
                value={email}
                className={errors.email && "border border-danger"}
              />
              <MDBInput
                wrapperClass="mb-4"
                label="Password"
                id="formControlLg"
                type="password"
                size="lg"
                className={errors.password && "border border-danger"}
                onChange={changePasswordHandler}
                value={password}
                ref={passwordRef}
              />
              <MDBBtn
                className="mb-4 px-5"
                color="dark"
                size="lg"
                type="submit"
                onClick={loginHandler}
                block
              >
                Login
              </MDBBtn>
              <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>
                No tienes una Cuenta?{" "}
                <button onClick={() => navigate('/SignUp')}>
                  Registrate Aqui
                </button>
              </p>
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

export default Login;
