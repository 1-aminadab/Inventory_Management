import React from 'react';


const ConfirmBox = ({ message, onRegister, onCancel }) => {
      
  return (
    <div  className="confirm-box-wrapper">
      <div className="confirm-box-content">
        <small style={{color:'red'}}>not registered</small>
        <p className="confirm-box-message">{message}</p>
        <div className="confirm-box-button-container">
          <button className="confirm-box-button" onClick={onRegister}>Register</button>
          <button className="confirm-box-cancel-button" onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmBox;