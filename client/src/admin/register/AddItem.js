import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Register.css';
import io from 'socket.io-client'

const socket = io('http://localhost:5000');

const AddItem = () => {
  
  const [formData, setFormData] = useState({
    itemID:'',
    itemStatus: '',
    description: '',
    itemName: '',
    totalQuantity: '',
    catagory:'admin',
    type: 'new-york',
    image: null,
  });
useEffect(()=>{
  socket.on('user_data', (data)=>{data.itemID
    if(!data.itemID){
      setFormData({
        ...formData,
        itemID:"",
      });
      return
    }
    console.log(data);
    setFormData({
      ...formData,
      itemID:data.itemID,
    });
  })
},[])

console.log(formData);

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
    data.append('userProfile',formData.image)

    
 
    try {
      await axios.post('http://localhost:5000/item/uploadProfileImage', data)
    .then((res)=>{
      console.log(res);
       axios.post('http://localhost:5000/item/register',{...formData,image:res.data.filePath,addBy:'123'})
      .then((res)=>console.log(res))
      .catch((error)=> console.log(error))
    })
    .catch((error)=>console.log(error))
    console.log(formData.image);

     
      
      // console.log(response.data);
    } catch (error) {
      // console.log(error.response.data);
    }
  };

  return (
    <div>
      <h1>Add Item</h1>
      <form onSubmit={handleSubmit}>
      <label htmlFor="user_id">item ID:</label>
        <input
          type="text"
          id="user_id"
          name="itemID"
          value={formData.itemID}
          onChange={handleInputChange}
        />
      <label htmlFor="phone-number">itemName:</label>
        <input
          type="tel"
          id="phone-number"
          name="itemName"
          value={formData.itemName}
          onChange={handleInputChange}
        />
        <label htmlFor="first-name">Item Status:</label>
        <input
          type="text"
          id="first-name"
          name="itemStatus"
          value={formData.itemStatus}
          onChange={handleInputChange}
        />

        <label htmlFor="last-name">Description:</label>
        <input
          type="text"
          id="last-name"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
        />

      

        <label htmlFor="totalQuantity">Total Quantity:</label>
        <input
          type="number"
          id="totalQuantity"
          name="totalQuantity"
          value={formData.totalQuantity}
          onChange={handleInputChange}
        />
        <label htmlFor="type">Type:</label>
        <select
          id="type"
          name="type"
          value={formData.type}
          onChange={handleInputChange}
        >
          <option value="store">Store</option>
          <option value="security">Seccurity</option>
          
        </select>
        <label htmlFor="catagory">catagory:</label>
        <select
          id="catagory"
          name="catagory"
          value={formData.catagory}
          onChange={handleInputChange}
        >
          <option value="admin">electronics</option>
          <option value="user">teaching matrial</option>
          
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

export default AddItem;