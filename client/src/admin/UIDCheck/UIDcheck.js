import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import ConfirmRegister from './ConfirmRegister';
import './UID.css'
import {useNavigate} from 'react-router-dom'
const userImage = 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
const itemImage = 'https://images.pexels.com/photos/1148955/pexels-photo-1148955.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'

const socket = io('http://localhost:5000');
const compare_socket = io('http://localhost:5000/test_uid');

const UIDcheck = () => {
 const navigate = useNavigate()

  const [messages, setMessages] = useState([]);
  const [warningMessage, setWarningMessage] = useState("")
  const [userSuccess, setUserSuccess] = useState(true)
  const [itemSuccess, setItemSuccess] = useState(true)
  const [inputValue, setInputValue] = useState('');
  const [approved, setApproved] = useState(false)
  const [itemData, setItemData] = useState(null)
  const [registered, setRegistered] = useState(true)
  const [authorised, setAuthorised] = useState(true)

////////// socket io user data receiver
useEffect(()=>{

socket.on("message", (data)=>{
  setOnCancel(true)
  setAuthorised()
  setItemData(data.itemData);
  setRegistered(data.success)
  console.log(data);
})
return ()=>{
  socket.off('message')
}
},[])
/////////////////////////////
const [userRegistered, setUserRegistered] = useState(true)
const [userData, setUserData] = useState()
const [place, setPlace] = useState(null)
console.log(userData);
////////////// User Check
useEffect(()=>{
  socket.on("user_data", (data)=>{
    setOnCancel(true)
    setUserData(data.userData);
    setUserSuccess(data.registered)
    setPlace(data.place)
    setAuthorised(data.authorised)
    
  })
  return ()=>{
    socket.off('user_data')
  }
  },[])
//////////////////


  const findUser = async()=>{
    if(!inputValue){
      setWarningMessage("Empty Field")
      return
    }
    await axios.post('http://localhost:5000/uid/check_user',{userID:inputValue})
    .then((res)=>{
      setUserData(res.data.userData)
      setUserSuccess(res.data.success)
      if(res.data.success){
        console.log("Entered to the");
        axios.post("http://localhost:5000/session", {userID:res.data.userData})
        .then((res)=>{
          console.log(res);
        })
        .catch((error)=>{
          console.log(error);
        })
      }
      
    })
    .catch((error)=>{
      console.log(error);
    })
  }

  // useEffect(()=>{
  //   setTimeout(() => {
  //      setUserData("")
  //   }, 60000);  
   
  // },[userData])

  useEffect(()=>{
    setTimeout(()=>{
    setWarningMessage("")
    },5000)
  },[warningMessage])
  useEffect(()=>{
    setTimeout(()=>{
      setUserSuccess(true)
    },5000)
  },[userSuccess])
///////////
/////////////
const spinner = ()=>{
  return(
    <div className="loading">
    <div className="spinner"></div>
    <h1>Scan</h1>
    <p>Please wait while we prepare the scanner</p>
  </div>
  )
}

  ///////// FIND USER
  const userSide = ()=>{
    if(userSuccess && !userData){
      return (
        <h1>Check User</h1>
      )
    }
    else if(!userSuccess && place === 'security'){
      return(
        <h1>Secrity: User not registered</h1>
      )
    }
    else if(!userSuccess && place === 'store'){
      return(
        <h1>{onCancel ? <ConfirmRegister message = "do you want to register?" onRegister = {()=> navigate('/add_user')} onCancel={()=>confirmAlert()}/> : 'Check User'} </h1>
      )
    }
    else if(userSuccess && userData){
      return (
        <div className='user-data'>
        <div className="check-image">
          <img src={userImage} alt="" />
        </div>
        <div className="check-data">
          <h4>Full Name</h4>
          <h3>{userData.fullName}</h3>
        </div>
        <div className="check-data">
          <h4>email</h4>
          <h3>{userData.email}</h3>
        </div>
        <div className="check-data">
          <h4>Department</h4>
          <h3>{userData.department}</h3>
        </div>
        </div>
      )
    }
  }
  /////
  const [onCancel, setOnCancel] = useState(true)
const confirmAlert = ()=>{
  setOnCancel(false)
}
 /// SCAN Item
 const scanItem = ()=>{
  if(!userData ){
    return (
      <h1>Wainting for User...</h1>
    )
  }
  if(registered && userData && !itemData){
    return (
     spinner()
    )
  }

  if(registered && itemData){
    return (
      <div className="user-side">
          
      <div className="check-image">
          <img src={itemImage} alt="" />
        </div>
        <div className="check-data">
          <h4>Name</h4>
          <h3>{itemData.itemName}</h3>
        </div>
        <div className="check-data">
          <h4>total Quantity</h4>
          <h3>{itemData.totalQuantity}</h3>
        </div>
        <div className="check-data">
          <h4>Status</h4>
          <h3>{itemData.itemStatus}</h3>
        </div>
        <button className='store-approve-btn'>Approve</button>
      </div>
    )
   
  }
    if(!authorised && itemData){
    return (
      <h1>UnAutorised User</h1>
    )
  }
  
  if(!registered){
   
    if(place === "store"){
     return <h1 >{onCancel ? <ConfirmRegister message = "do you want to register?" onRegister = {()=> navigate('/add_item')} onCancel={()=>confirmAlert()}/> : spinner() } </h1>
    }
    else if(place === "security"){
      return <h1>Item not registerd</h1>
  }
  }
 }


  return (
    <div className='uid-check'>
    {
      warningMessage && <h4 className='uid-check-warning'>{warningMessage}</h4>
    }
      <div className='user-side'>
      <div className="user-id-input">
        <label htmlFor="user-id">User ID</label>
        <input onChange={(e)=>setInputValue(e.target.value)} value={inputValue} type="text" name="" id="" />
        <button onClick={()=>{
          if(window.confirm("Do You Want To Proceed")){
             findUser()
          }
        }}>Submit</button>
      </div>
      {
        userSide()
      }
  
      </div>
      {
        scanItem()
      }
      
 
      

    </div>
  );
};

export default UIDcheck;