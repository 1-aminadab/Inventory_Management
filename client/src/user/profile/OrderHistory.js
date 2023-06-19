import React from 'react';

function OrderHistory() {
  const orderHistory = [
    {
      id: 1,
      itemName: 'Widget',
      orderedBy: 'John Doe',
      quantity: 75,
      orderDate: '22/4/65 GC',
      orderStatus: 'Taken',
      stockStatus: 'In Stock',
      confirmationStatus: 'Confirmed'
    },
    {
      id: 2,
      itemName: 'Gizmo',
      orderedBy: 'Alice Jones',
      quantity: 10,
      orderDate: '22/4/65 GC',
      orderStatus: 'Approved',
      stockStatus: 'Low Stock',
      confirmationStatus: 'Not Confirmed'
    },
  ];

  return (
    <div className='table-container'>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Item Name</th>
            <th>Ordered By</th>
            <th>Quantity</th>
            <th>Order Date</th>
            <th>Order Status</th>
            <th>Stock Status</th>
            <th>Confirmation Status</th>
          </tr>
        </thead>
        <tbody>
          {orderHistory.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.itemName}</td>
              <td>{item.orderedBy}</td>
              <td>{item.quantity}</td>
              <td>{item.orderDate}</td>
              <td>{item.orderStatus}</td>
              <td>{item.stockStatus}</td>
              <td>{item.confirmationStatus}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OrderHistory;