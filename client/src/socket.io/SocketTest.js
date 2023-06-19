import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

function ChatRoom() {
  const [messageReceived, setMessageReceived] = useState();
  const [itemData, setItemData] = useState([]);


  useEffect(() => {
    // Listen for 'message' events from the server
  
    socket.on('message', (data)=>{
      setMessageReceived(data)
      
    })
    socket.on('item_data',(data)=>{
      setItemData(data)
    })
    return () =>{
      socket.off('message')
    }
  }, []);

 const sendMessage = ()=>{
  socket.emit('message', 'Hello from client')
 }
  return (
    <div>
      <h1>socket.io Example</h1>
      
      <h3>{messageReceived}</h3>
      <button onClick={sendMessage}>Send Message</button>
    </div>
  );
}

export default ChatRoom;