import React,{useState, useEffect, useContext} from 'react'
import "./Login.css"
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthContext from "../context/AuthContext";
function Login() {

  const [userID, setuserID] = useState("");
  const [password, setPassword] = useState("");
  console.log(password, userID);

  const navigate = useNavigate()

  const {getLoggedIn} = useContext(AuthContext) 
   
  async function register(e){
    e.preventDefault();
      const registerData = {
        userID,
        password,        
      }

      

      await axios.post("http://localhost:5000/user/login",registerData)
          .then((res)=> {  
            // console.log("res login: ",res)
            axios.get(`http://localhost:5000/user/one_user/${userID}`)
              .then((res)=> {
                console.log(res);
                // dispatch(getUserData(res.data.student))
                
                // console.log("userData: ",userData)
                
                if(res.data.userData[0].role === "admin"){
                  navigate("/")
                }
                else{
                  navigate("/user_profile")
                }
                })               
               
              })
            
            
          .catch((error)=>{
            console.log(error);
            
            })

           await getLoggedIn()
 
  }

  return (
    <div className='login-container'>
<form action="" onSubmit={register}>
  <h2>Login</h2>
  <div className="form-group">
    <label htmlFor="userid">User ID</label>
    <input onChange={(e)=>setuserID(e.target.value)}  type="text" id="userid" name="userid" />
  </div>
  <div className="form-group">
    <label htmlFor="password">Password</label>
    <input onChange={(e)=>setPassword(e.target.value)} type="password" name="password" id="password" />

  </div>
  <button type="submit">Login</button>
</form>
    </div>
  )
}

export default Login