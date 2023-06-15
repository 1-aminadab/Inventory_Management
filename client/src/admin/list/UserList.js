import React from 'react'
import './List.css'
function UserList() {
  return (
    <div>
        <table>
        <thead>
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>City</th>
            <th>Country</th>
            <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        <tr>
            <td>1</td>
            <td>John Doe</td>
            <td>john@example.com</td>
            <td>555-1234</td>
            <td>123 Main St.</td>
            <td>Anytown</td>
            <td>USA</td>
            <td>
            <button className='view'>View</button>
            <button className='update'>Update</button>
            <button className='delete'>Delete</button>
            </td>
        </tr>
        <tr>
            <td>2</td>
            <td>Jane Smith</td>
            <td>jane@example.com</td>
            <td>555-5678</td>
            <td>456 Elm St.</td>
            <td>Anytown</td>
            <td>USA</td>
            <td>
            <button className='view'>View</button>
            <button className='update'>Update</button>
            <button className='delete'>Delete</button>
            </td>
        </tr>
        
        </tbody>
  </table>
    </div>
  )
}

export default UserList