import React, { useState } from 'react';
import './List.css';
import SearchIcon from '@mui/icons-material/Search';

function UserList() {
  const [filter, setFilter] = useState('');
  const [filterBy, setFilterBy] = useState('name');

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleFilterByChange = (event) => {
    setFilterBy(event.target.value);
  };

  const filterItems = (item) => {
    if (filterBy === 'id') {
      return item.userId.toString().includes(filter);
    } else {
      return item.name.toLowerCase().includes(filter.toLowerCase());
    }
  };

  return (
    <div>
      <h1>User List</h1>
      <div className='filter-item-user'>
        <label htmlFor='filterItem'>
          <SearchIcon />
        </label>
        <input type='text' value={filter} onChange={handleFilterChange} />
        <select value={filterBy} onChange={handleFilterByChange}>
          <option value='name'>By Name</option>
          <option value='id'>By ID</option>
        </select>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>User Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Department</th>
            <th>City</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items
            .filter(filterItems)
            .map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.userId}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td>{item.address}</td>
                <td>{item.city}</td>
                
                <td>
                  <button className='view'>View</button>
                  <button className='update'>Update</button>
                  <button className='delete'>Delete</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

const items = [
  {
    id: 1,
    userId:"ets0116/11",
    name: 'Abrham Zewdu',
    email: 'abrhamzedu0987@example.com',
    phone: '555-1234',
    address: 'block 10 street',
    city: 'Addis Ababa',
   department: 'Electrical',
  },
  {
    id: 2,
    userId:"ets0069/11",
    name: 'Hailemichael Tsega',
    email: 'hailemichael@example.com',
    phone: '456-765',
    address: 'block 10 street',
    city: 'Addis Ababa',
   department: 'Electrical',
  },
];

export default UserList;