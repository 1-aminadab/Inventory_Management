import React,{useState, useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import io from 'socket.io-client'

const socket = io('http://localhost:5000');
import axios from 'axios';
function UpdateUser() {
  const navigate = useNavigate('/')
  const {id} = useParams()
  const [currentData, setCurrentData] = useState()
   console.log(currentData);
   useEffect(()=>{
     axios.get(`http://localhost:5000/user/one_user/${id} `)
     .then((res)=> {
       setCurrentData(res.data.userData[0])
      console.log(res.data.userData[0]);
     })
     .catch((error)=>console.log(error))
   },[])
   ////////////////////
   useEffect(()=>{
    if(currentData){

    
    setFormData({
      ...formData,
    userUID:currentData.userUID,
    userID:currentData.userID,
    firstName:currentData.fullName.split(' ')[0],
    lastName:currentData.fullName.split(' ')[1],
    phoneNumber:currentData.phoneNumber,
    email: currentData.email,
    role:currentData.role,
    department: currentData.department,
    place: currentData.place,
    });
  }
   },[currentData])

   ///////////////
   const [formData, setFormData] = useState({
    userUID:'',
    userID:"",
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    role:'admin',
    department: 'sales',
    place: 'new-york',
   
  });
useEffect(()=>{
  socket.on('user_data', (data)=>{data.userUID
    if(!data.userUID){
      setFormData({
        ...formData,
        userUID:"",
      });
      return
    }
    console.log(data);
    setFormData({
      ...formData,
      userUID:data.userUID,
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
      console.log("entered");
      await axios.post('http://localhost:5000/user/update_user',{updatedData:formData,id:id})
      .then((res)=>{
        console.log(res);
        console.log("print it");
        navigate('/')
      })
      .catch((error)=> console.log(error))  
    
    } catch (error) {
      // console.log(error.response.data);
    }
  };
  const deleteUser = async()=>{
    await axios.post(`http://localhost:5000/user/delete_user/${id}`)
    .then((res)=>{
      console.log(res);
    })
    .catch((error)=> console.log(error))
  }
  return (
    <div>
        <h1>Update User</h1>
        <form onSubmit={handleSubmit}>
      <label htmlFor="user_id">user UID:</label>
        <input
          type="text"
          id="user_id"
          name="userUID"
          value={formData.userUID}
          onChange={handleInputChange}
        />
           <label htmlFor="user_id">user id:</label>
        <input
          type="text"
          id="user_id"
          name="userID"
          value={formData.userID}
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
        
        <input type="submit" value="Submit" />
      </form>

    </div>
  )
}

export default UpdateUser