import React, { useState } from 'react';
import './TransferHistory.css';
import SearchIcon from '@mui/icons-material/Search';

const Table = () => {
  const [data, setData] = useState([
    {
      id: 1,
      senderId: 'ABC123',
      senderName: 'John Doe',
      receiverId: 'XYZ789',
      receiverName: 'Jane Smith',
      itemId: '12345',
      itemName: 'Widget',
      status: 'Pending'
    },
    {
      id: 2,
      senderId: 'DEF456',
      senderName: 'Alice Jones',
      receiverId: 'QRS789',
      receiverName: 'Bob Johnson',
      itemId: '67890',
      itemName: 'Gizmo',
      status: 'Approved'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [searchBy, setSearchBy] = useState('senderName');

  const handleApproval = (id, action) => {
    setData(data => data.map(item => {
      if (item.id === id) {
        return {
          ...item,
          status: action
        };
      }
      return item;
    }));
  };

  const filteredData = data.filter(item => {
    const searchValue = item[searchBy].toLowerCase();
    return searchValue.includes(searchTerm.toLowerCase());
  });

  return (
    <div>
      <h1>check Transfer</h1>
      <div className="filter-item-user">
        <label htmlFor="filterItem"><SearchIcon /></label>
        <input type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
        <select value={searchBy} onChange={e => setSearchBy(e.target.value)}>
          <option value="senderName">By Sender Name</option>
          <option value="senderId">By Sender Id</option>
          <option value="receiverName">By Receiver Name</option>
          <option value="receiverId">By Receiver Id</option>
        </select>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Sender ID</th>
            <th>Sender Name</th>
            <th>Receiver ID</th>
            <th>Receiver Name</th>
            <th>Item ID</th>
            <th>Item Name</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.senderId}</td>
              <td>{item.senderName}</td>
              <td>{item.receiverId}</td>
              <td>{item.receiverName}</td>
              <td>{item.itemId}</td>
              <td>{item.itemName}</td>
              <td>{item.status}</td>
              <td>
                <div className="dropdown">
                  <button className="dropbtn">Action</button>
                  <div className="dropdown-content">
                    <a href="#" onClick={() => handleApproval(item.id, 'Approved')}>Approve</a>
                    <a href="#" onClick={() => handleApproval(item.id, 'Rejected')}>Reject</a>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;