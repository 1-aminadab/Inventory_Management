import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const UIDcheck = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const socket = io('http://localhost:5000/rfid/check_socket');

  useEffect(() => {
    socket.on('chat message', (msg) => {
      setMessages([...messages, msg]);
    });
  }, [messages, socket]);

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit('chat message', inputValue);
    setInputValue('');
  };

  return (
    <div>
      <ul>
        {messages.map((msg, i) => (
          <li key={i}>{msg}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default UIDcheck;