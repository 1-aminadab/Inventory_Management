import React, { useEffect, useState } from 'react';
import './List.css';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
function UserList() {
  const navigate = useNavigate()
  const [filter, setFilter] = useState('');
  const [filterBy, setFilterBy] = useState('name');
  const [users, setUsers] = useState()
  useEffect(() => {
    axios
      .get('http://localhost:5000/user/all_users')
      .then((response) => {
       setUsers(response.data.userData)
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleFilterByChange = (event) => {
    setFilterBy(event.target.value);
  };

  const filterUsers = (user) => {
    if (filterBy === 'id') {
      return user.userID.toString().includes(filter);
    } else {
      return user.fullName.toLowerCase().includes(filter.toLowerCase());
    }
  };
  const deleteUser = async(userId)=>{
    await axios.delete(`http://localhost:5000/user/delete_user/${userId}`)
    .then((res)=>{
      console.log(res.data.itemData);
    })
    .catch((error)=>{
      console.log(error);
    })
  }

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
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users && users
            .filter(filterUsers)
            .map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.userID}</td>
                <td>{user.fullName}</td>
                <td>{user.email}</td>
                <td>{user.phoneNumber}</td>
                <td>{user.department}</td>
               
                
                <td>
                  <button className='view'>View</button>
                  <button className='update' onClick={()=>navigate(`/update_user/${user.userID}`)}>Update</button>
                  <button className='delete' onClick={()=>{
                    if(confirm('Delete Selected user?')){
                      deleteUser(user.userID)
                    }
                  }}>Delete</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}


export default UserList;