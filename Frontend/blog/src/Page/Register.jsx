import React, { useState } from 'react';
import '../Style/register.css';
import logimg from '../Assets/4a903338c0e478248153bd8f3f6f6745-removebg-preview.png';
import { Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios for making HTTP requests
import { toast } from 'react-toastify'; // Import toast for notifications

function Register() {
  const navigate = useNavigate();

  // State to manage form data
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    number: '',
    password: ''
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic form validation
    if (!formData.username || !formData.email || !formData.password) {
      toast.error('Please complete all fields.');
      return;
    }

    try {
      // Send POST request to the backend
      const response = await axios.post('http://localhost:5000/auth/add/user', formData);
      
      if (response.status === 200) {
        toast.success('Successfully Registered!');
        setFormData({ username: '', email: '', number: '', password: '' }); // Reset form data
        navigate('/login'); // Redirect to login page
      }
    } catch (err) {
      console.error('Registration Error:', err);
      toast.error('Registration failed. Please try again.');
    }
  };

  return (
    <>    
      <div style={{ backgroundColor: "black", height: "950px" }}>
        <img src={logimg} alt="login" className='regimg' />

        <h1 className='rlh1'>Register your account</h1>

        <form className='regform' onSubmit={handleSubmit}>
          <label htmlFor="username" className='rl1'>Username</label>
          <input
            type="text"
            name="username"
            placeholder='Username'
            value={formData.username}
            onChange={handleChange}
            className='reginput'
          /><br />

          <label htmlFor="email" className='rl1'>Email</label>
          <input
            type="email"
            name="email"
            placeholder='Email'
            value={formData.email}
            onChange={handleChange}
            className='reginput'
          /><br />

          <label htmlFor="number" className='rl1'>Number</label>
          <input
            type="text"
            name="number"
            placeholder='Number'
            value={formData.number}
            onChange={handleChange}
            className='reginput'
          /><br />

          <label htmlFor="password" className='rl1'>Password</label>
          <input
            type="password"
            name="password"
            placeholder='Password'
            value={formData.password}
            onChange={handleChange}
            className='reginput'
          />
          <br /><br />
          
          <Button className='regbtn' type='submit'>Register</Button>
          <br />
          <h3>Already a User?</h3>
          <br />
          <Link to={'/login'}>
            <Button className='regbtn' type='button'>Login</Button>
          </Link>
        </form>
      </div>
    </>
  );
}

export default Register;
