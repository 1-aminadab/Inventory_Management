import React, { useState } from 'react'
import './Navbar.css'
import { useNavigate } from 'react-router-dom';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
function Navbar() {
  const navigate = useNavigate()
  const [orders, setOrders] = useState(false)
  const image = "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  return (
    <div className='navbar'>
      <div className='logo-image'>
       <img src='https://cdn.dribbble.com/users/1069761/screenshots/14019481/media/c5ca79afb1ad12b72b4805f794701366.png?resize=400x0' alt="" />
      </div>
      <div>
      <ul>
        
        <li onClick={()=>navigate('/')}>Home</li>
        <li onClick={()=>navigate('')}>Transfer</li>
        <li className='order' onClick={()=>setOrders(!orders)}>Order  <ArrowDropDownIcon />
        {
          orders &&
        
         <div className='order-list'>
          <ul>
            <l onClick={()=>navigate('')}i>Requested</l>
            <li onClick={()=>navigate('')}>Aproved</li>
            <li onClick={()=>navigate('')}>Rejected</li>
            <li onClick={()=>navigate('')}>Taken</li>
            <li onClick={()=>navigate('')}>Returned</li>
          </ul>
         </div>
        }
        </li>
        <li onClick={()=>navigate('/uid_check')}>checkPID</li>
        <li onClick={()=>navigate('')}>History</li>
        
      </ul>
      </div>
      <div className='navbar-profile'>
        <img src={image} alt="" />
        <div >
          <p>Amanuel Tadesse</p>
        </div>
      </div>
    </div>
  )
}

export default Navbar