import React, { useState } from 'react';
import './List.css';
import SearchIcon from '@mui/icons-material/Search';

function ItemList() {
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
      return item.id.toString().includes(filter);
    } else {
      return item.itemName.toLowerCase().includes(filter.toLowerCase());
    }
  };

  return (
    <div>
      <h1>Item List</h1>
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
            <th>Item Name</th>
			<th>Item Id</th>
            <th>Total Quantity</th>
            <th>Remaining Quantity</th>
            <th>Category</th>
            <th>Item Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items
            .filter(filterItems)
            .map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.itemName}</td>
				<td>{item.itemId}</td>
                <td>{item.totalQuantity}</td>
                <td>{item.remainingQuantity}</td>
                <td>{item.category}</td>
                <td>{item.itemStatus}</td>
                <td>
                  <button className='view'>View</button>
                  <button className='update'>Update</button>
                  <button className='delete' onClick={()=>{
					if(confirm('Delete Selected item?')){
						return alert("Yes off course")
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

const items = [
  {
    id: 1,
	itemId:'1234567890',
    itemName: 'Widget',
    totalQuantity: 100,
    remainingQuantity: 75,
    category: 'Electronics',
    itemStatus: 'New',
  },
  {
    id: 2,
    itemName: 'Gizmo',
	itemId:'98765432',
    totalQuantity: 50,
    remainingQuantity: 10,
    category: 'Electronics',
    itemStatus:'Used',
  },
];

export default ItemList;