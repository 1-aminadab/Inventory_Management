import React from 'react'

function UpdateUser() {
  return (
    <div>
        <h1>Update User</h1>
      <form >
        <label htmlFor="first-name">First Name:</label>
        <input type="text" id="first-name" name="first-name" />
        
        <label htmlFor="last-name">Last Name:</label>
        <input type="text" id="last-name" name="last-name" />
        
        <label htmlFor="phone-number">Phone Number:</label>
        <input type="tel" id="phone-number" name="phone-number" />
        
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" />
        
        <label htmlFor="department">Department:</label>
        <select id="department" name="department">
          <option value="sales">Sales</option>
          <option value="marketing">Marketing</option>
          <option value="customer-service">Customer Service</option>
        </select>
        
        <label htmlFor="place">Place:</label>
        <select id="place" name="place">
          <option value="new-york">New York</option>
          <option value="los-angeles">Los Angeles</option>
          <option value="chicago">Chicago</option>
        </select>
        
        <label htmlFor="image">Image:</label>
        <input type="file" id="image" name="image" />
        
        <input type="submit" value="Update" />
      </form>

    </div>
  )
}

export default UpdateUser