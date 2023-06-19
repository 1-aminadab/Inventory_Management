import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './List.css';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
function ItemList() {
  const navigate = useNavigate()
  const [items, setItems] = useState([]);
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
      return item.itemID.toString().includes(filter);
    } else {
      return item.itemName.toLowerCase().includes(filter.toLowerCase());
    }
  };
console.log(items);
  useEffect(() => {
    axios
      .get('http://localhost:5000/item/all_items')
      .then((response) => {
        setItems(response.data.itemData);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const deleteItem = async(itemId)=>{
    console.log(itemId);
    await axios.delete(`http://localhost:5000/item/delete_item/${itemId}`)
    .then((res)=>{
      console.log(res.data.itemData);
    })
    .catch((error)=>{
      console.log(error);
    })
  }
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
        {/* <a  onClick={navigate('/add_item')}  style={{color:"blue"}}>Add New</a> */}
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
				<td>{item.itemID}</td>
                <td>{item.totalQuantity}</td>
                <td>{item.remainingQuantity}</td>
                <td>{item.catagory}</td>
                <td>{item.itemStatus}</td>
                <td>
                  <button className='view'>View</button>
                  <button className='update' onClick={()=> navigate(`/update_item/${item.itemID}`)}>Update</button>
                  <button className='delete' onClick={()=>{
					if(confirm('Delete Selected item?')){
						deleteItem(item.itemID)
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

export default ItemList;