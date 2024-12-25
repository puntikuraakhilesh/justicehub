import React,{ useState }  from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
// import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import '@fortawesome/fontawesome-free/css/all.min.css';


function SignInForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'citizen', // default role is set to 'user'
  });

  const [error, setError] = useState();
  const navigate = useNavigate(); // Use useNavigate hook

  const { email, password, role } = formData;
  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = async (e) => {
    
    e.preventDefault();
    try {
      

      
      if (role === 'citizen') {
        const res = await axios.post(`${import.meta.env.VITE_APP_BACKEND_URL}/admin/login`, formData);
      localStorage.setItem('token', res.data.token); // Navigate to '/admin' route after successful login
      } 
      else if (role === 'lawyer') {
        const res = await axios.post(`${import.meta.env.VITE_APP_BACKEND_URL}/employee/login`, formData);
      localStorage.setItem('token', res.data.token);
      }
      
      // Navigate to appropriate route after login
      if (role === 'citizen') {
        navigate('/citizenhome'); // Navigate to '/admin' route after successful login
      } else if (role === 'lawyer') {
        navigate('/lawyerhome'); // Navigate to '/employee' route after successful login
      } 
    } catch (error) {
      console.error(error);
      setError('Error logging in');
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
    
        <a href="/">Forgot your password?</a>
        <button className="loginBtn">Sign In</button>
      </form>
    </div>
  );
}

export default SignInForm;