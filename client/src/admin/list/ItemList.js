import React from 'react'
//import "./Item.css"
function ItemList() {
  return (
    <div>
	<table>
	  <thead>
	    <tr>
	      <th>ID</th>
	      <th>Item Name</th>
	      <th>Total Quantity</th>
	      <th>Remaining Quantity</th>
	      <th>Category</th>
	      <th>Item Status</th>
	      <th>Actions</th>
	    </tr>
	  </thead>
	  <tbody>
	    <tr>
	      <td>1</td>
	      <td>Widget</td>
	      <td>100</td>
	      <td>75</td>
	      <td>Electronics</td>
	      <td>In Stock</td>
	      <td>
	        <button class="view">View</button>
	        <button class="update">Update</button>
	        <button class="delete">Delete</button>
	      </td>
	    </tr>
	    <tr>
	      <td>2</td>
	      <td>Gizmo</td>
	      <td>50</td>
	      <td>10</td>
	      <td>Electronics</td>
	      <td>Low Stock</td>
	      <td>
	        <button class="view">View</button>
	        <button class="update">Update</button>
	        <button class="delete">Delete</button>
	      </td>
	    </tr>
	    
	  </tbody>
	</table>

    </div>
  )
}

export default ItemList