import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './UID.css'

const UIDcheck = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const userImage = 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  const itemImage = 'https://images.pexels.com/photos/1148955/pexels-photo-1148955.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'

  const [approved, setApproved] = useState(false)
  return (
    <div className='uid-check'>
      <div className='user-side'>
        <div className="check-image">
          <img src={userImage} alt="" />
        </div>
        <div className="check-data">
          <h4>Full Name</h4>
          <h3>Amanuel Tadesse</h3>
        </div>
        <div className="check-data">
          <h4>User Id</h4>
          <h3>ETS0116/11</h3>
        </div>
        <div className="check-data">
          <h4>Department</h4>
          <h3>Electrical</h3>
        </div>
      </div>
      {
        approved ? <div class="not-approved">
      <h1>Not Approved</h1>
      <p>We're sorry, but your request has not been approved.</p>
      <button>Go Back</button>
    </div> :
      
      <div className="user-side">
          
      <div className="check-image">
          <img src={itemImage} alt="" />
        </div>
        <div className="check-data">
          <h4>Name</h4>
          <h3>Hp</h3>
        </div>
        <div className="check-data">
          <h4>Quantity</h4>
          <h3>2</h3>
        </div>
        <div className="check-data">
          <h4>Status</h4>
          <h3>New</h3>
        </div>
        <button className='store-approve-btn'>Approve</button>
      </div>
      }

    </div>
  );
};

export default UIDcheck;