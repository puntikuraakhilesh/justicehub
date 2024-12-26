import React,{useState} from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
// import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';



function SignUpForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
    role: 'citizen', // default role is set to 'user'
  });

  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState();
  const navigate = useNavigate();

  const { email, password, username, role } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
        // const res = await axios.post(`${import.meta.env.VITE_APP_BACKEND_URL}/users/register`, formData);
        // console.log('Response:', res); // Log the response for debugging
        // localStorage.setItem('token', res.data.token);
        
        if (role === 'citizen') {
             // Navigate to '/admin' route after successful login
            await axios.post('http://localhost:8800/api/auth/signup', { username, email, password,role });
            alert('Citizen registered successfully You can login now');
        } else if (role === 'lawyer') {
          await axios.post('http://localhost:8800/api/auth/signup', { username, email, password,role });
            alert('Lawyer registered successfully You can login now'); // Navigate to '/employee' route after successful login
        } 
    } catch (error) {
        console.error('Error response:', error.response); // Log detailed error response
        setError('Error registering user');
    }
  };

  return (
    <div className="form-container sign-up-container">
      <form onSubmit={onSubmit}>
        <h1>Create Account</h1>
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
          type="text"
          name="username"
          value={username}
          onChange={onChange}
          placeholder="UserName"
        />
        <input
          type="email"
          name="email"
          value={email}
          onChange={onChange}
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={onChange}
          placeholder="Password"
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
        <button id="btnbtn">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUpForm;