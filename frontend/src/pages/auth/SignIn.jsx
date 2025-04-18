import React,{ useState,useContext }  from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { AuthContext } from "./AuthContext";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
// import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Link } from "react-router-dom"
import Button from '@mui/material/Button';
import {  useSnackbar } from 'notistack';
import { useDispatch } from 'react-redux';
import { setAuthUser } from "../../redux/userSlice";



function SignInForm() {
  const dispatch = useDispatch();

  const { enqueueSnackbar } = useSnackbar();
  const showToast = (message, variant = "info") => {
    enqueueSnackbar(message, { variant });
  };
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'citizen', // default role is set to 'user'
  });
  const { login } = useContext(AuthContext);
  const [error, setError] = useState();
  const navigate = useNavigate(); // Use useNavigate hook

  const { email, password, role } = formData;
  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = async (e) => {
    
    e.preventDefault();
    try {
      

      
      if (role === 'citizen') {
        const response=await axios.post(`http://localhost:8800/api/auth/login`,{email,password,role});

        const {token,user}=response.data;
        login(token, user.id ,user.role,user.username);
        navigate('/citizenhome');
        
         await window.location.reload();
        
        
        showToast("Citizen Logged In successfully!", "success");
        
        dispatch(setAuthUser(user));
        
        //Keep a toast message here
      } 
      else if (role === 'lawyer') {
        const response=await axios.post(`http://localhost:8800/api/auth/login`,{email,password,role});

        const {token,user}=response.data;
        if(user.detailsfilled){
          login(token, user.id ,user.role,user.username);
          
          navigate('/lawyerhome');
          await window.location.reload();
          
          console.log(user);
          dispatch(setAuthUser(user));
          showToast("Lawyer Logged In successfully!", "success");
          
        }
        else{
          login(token, user.id ,user.role,user.username);
          navigate('/lawyerdetails');
          showToast("Lawyer Details not filled. Please fill the details", "info");
        }
      }
    } catch (error) {
      console.error(error);
      setError('Error logging in');
      showToast("Invalid Credentials Try again!", "error");
    }
  };

  return (
    <div className="form-container sign-in-container">
      <form onSubmit={onSubmit}>
        <h1>Sign in</h1>
        <div className="social-container">
          <a href="/" className="social">
            <i className="fab fa-facebook-f" />
          </a>
          <a href="/" className="social">
            <i className="fab fa-google-plus-g" />
          </a>
          <a href="/" className="social">
            <i className="fab fa-linkedin-in" />
          </a>
        </div>
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          required
          onChange={onChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          required
          onChange={onChange}
        />
  
      <FormLabel id="demo-row-radio-buttons-group-label">Role</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
      >
        <FormControlLabel value="citizen" control={<Radio />} label="Citizen" name="role" checked={role === 'citizen'} onChange={onChange}/>
        <FormControlLabel value="lawyer" control={<Radio />} label="Lawyer" name="role" checked={role === 'lawyer'} onChange={onChange}/>
        
      </RadioGroup>
    
        
        <button className="loginBtn">Sign In</button>
      </form>
    </div>
  );
}




export default SignInForm;
 