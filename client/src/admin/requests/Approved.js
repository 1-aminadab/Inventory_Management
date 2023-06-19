import React, { useState } from 'react';
import './Table.css';

const Table = () => {
  const [data, setData] = useState([
    {
      id: 1,
      userName: 'John Doe',
      userId: 'ABC123',
      itemId: '12345',
      itemName: 'Widget',
      status: 'Pending'
    },
    {
      id: 2,
      userName: 'Alice Jones',
      userId: 'DEF456',
      itemId: '67890',
      itemName: 'Gizmo',
      status: 'Approved'
    }
  ]);

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

  return (
    <table className="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>User Name</th>
          <th>User ID</th>
          <th>Item ID</th>
          <th>Item Name</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.userName}</td>
            <td>{item.userId}</td>
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
  );
};

export default Table;