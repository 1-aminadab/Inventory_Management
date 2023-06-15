import React from 'react'

function AddItem() {
  return (
    <div>
      <h1>Add Item</h1>
      <form >
        <label htmlFor="qrcode">Qrcode Id</label>
        <input type="text" id="qrcode" name="qrcode" />
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" />
        
        <label htmlFor="catagory">Catagory</label>
        <input type="text" id="catagory" name="catagory" />
        
        <label htmlFor="type">Type</label>
        <input type="tel" id="type" name="type" />
        
        <label htmlFor="status">Item Status</label>
        <input type="text" id="status" name="status" />
        
        <label htmlFor="quantity">Quantity</label>
        <input type="number" name="" id="quantity" />
        
        
        
        <label htmlFor="image">Description</label>
        <textarea type="text" id="image" name="image" />
        
        <input type="submit" value="Submit" />
      </form>

    </div>
  )
}

export default AddItem