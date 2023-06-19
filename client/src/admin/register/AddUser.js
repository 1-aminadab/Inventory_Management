import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Register.css';
import io from 'socket.io-client'

const socket = io('http://localhost:5000');

const AddUser = () => {
  const [userUID, setUserUID] = useState('')
  const [formData, setFormData] = useState({
    userUID:'',
    firstName: userUID,
    lastName: '',
    phoneNumber: '',
    email: '',
    role:'admin',
    department: 'sales',
    place: 'new-york',
    image: null,
  });
useEffect(()=>{
  socket.on('user_data', (data)=>{
    setFormData({
      ...formData,
      userUID:data.userUID,
    });
  })
},[])
console.log(formData);
console.log(userUID);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (event) => {
    setFormData({
      ...formData,
      image: event.target.files[0],
    });
  };

  const handleSubmit = async (event) => {
    // console.log(formData);
    event.preventDefault();
    const data = new FormData();

    // data.append('firstName', formData.firstName);
    // data.append('lastName', formData.lastName);
    // data.append('phoneNumber', formData.phoneNumber);
    // data.append('email', formData.email);
    // data.append('department', formData.department);
    // data.append('place', formData.place);

    data.append('image', formData.image);
 
    try {
     await axios.post('http://localhost:5000/user/register',formData)
      .then((res)=>console.log(res))
      .catch((error)=> console.log(error))
      
      console.log(response.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <div>
      <h1>Register User</h1>
      <form onSubmit={handleSubmit}>
      <label htmlFor="user_id">user UID:</label>
        <input
          type="text"
          id="user_id"
          name="userUID"
          value={formData.userUID}
          onChange={handleInputChange}
        />

        <label htmlFor="first-name">First Name:</label>
        <input
          type="text"
          id="first-name"
          name="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
        />

        <label htmlFor="last-name">Last Name:</label>
        <input
          type="text"
          id="last-name"
          name="lastName"
          value={formData.lastName}
          onChange={handleInputChange}
        />

        <label htmlFor="phone-number">Phone Number:</label>
        <input
          type="tel"
          id="phone-number"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleInputChange}
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />

        <label htmlFor="department">Department:</label>
        <select
          id="department"
          name="department"
          value={formData.department}
          onChange={handleInputChange}
        >
          <option value="sales">Sales</option>
          <option value="marketing">Marketing</option>
          <option value="customer-service">Customer Service</option>
        </select>

        <label htmlFor="place">Place:</label>
        <select
          id="place"
          name="place"
          value={formData.place}
          onChange={handleInputChange}
        >
          <option value="store">Store</option>
          <option value="security">Seccurity</option>
          
        </select>
        <label htmlFor="role">Role:</label>
        <select
          id="role"
          name="role"
          value={formData.role}
          onChange={handleInputChange}
        >
          <option value="admin">admin</option>
          <option value="user">employee</option>
          
        </select>
        <label htmlFor="image">Image:</label>
        <input
          type="file"
          id="image"
          name="image"
          onChange={handleFileChange}
        />

        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default AddUser;