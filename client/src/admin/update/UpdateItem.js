import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Update.css';
import io from 'socket.io-client'
import { useParams, useNavigate } from 'react-router-dom';

const socket = io('http://localhost:5000');

const UpdateItem = () => {
  // /////////////////
  const navigate  = useNavigate()
  const {id} = useParams()
  const [currentData, setCurrentData] = useState({itemID:""})
   console.log(currentData.itemID);
   useEffect(()=>{
     axios.post('http://localhost:5000/item/one_item ', {itemID:id})
     .then((res)=> {
       
       setCurrentData(res.data.itemData[0])
       setCurrentData(itemData)
     })
     .catch((error)=>console.log(error))
   },[])
   ////////////////////
  useEffect(()=>{

    setFormData({
      ...formData,
    itemID:currentData.itemID,
    itemStatus: currentData.itemStatus,
    description: currentData.description,
    itemName: currentData.itemName,
    totalQuantity: currentData.totalQuantity,
    catagory:currentData.catagory,
    type: currentData.type,
    });
  },[currentData])
  const [formData, setFormData] = useState({
    itemID:"",
    itemStatus: '',
    description: '',
    itemName: '',
    totalQuantity: '',
    catagory:'admin',
    type: 'new-york',
   
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



  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };



  const handleSubmit = async (event) => {
    // console.log(formData);
    event.preventDefault();   
 
    try {
   
       axios.post('http://localhost:5000/item/update_item',{id:id, updatedData:formData})
      .then((res)=>{
        navigate('/item_list')
      })
      .catch((error)=> console.log(error))
      // console.log(response.data);
    } catch (error) {
      // console.log(error.response.data);
    }
  };

  return (
    <div>
      <h1>Update Item</h1>
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
        <input
          id="type"
          name="type"
          value={formData.type}
          onChange={handleInputChange}
          
        />
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
        
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default UpdateItem;