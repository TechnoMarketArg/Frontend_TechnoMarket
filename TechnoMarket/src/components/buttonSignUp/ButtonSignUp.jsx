import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ButtonSignUp = () => {
    const navigate = useNavigate();
    
    const signInPage = () => {
        navigate("/SignIn");
    }
    
    const signUpPage = () => {
        navigate("/SignUp");
    }

  return (
    <div className="flex gap-2">
      <Button onClick={signInPage} color="secondary">Sign In</Button>
      <Button onClick={signUpPage} variant="contained" color="secondary">Sign Up</Button>
    </div>
  );
};

ButtonSignUp.propTypes = {};

export default ButtonSignUp;
