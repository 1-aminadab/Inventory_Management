import React, { useState } from 'react';
import './Order.css';

function OrderComponent({ stockList }) {
  const [selectedItems, setSelectedItems] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [submittingOrder, setSubmittingOrder] = useState(false);

  const handleSelectItem = (itemId) => {
    if (selectedItems.includes(itemId)) {
      setSelectedItems(selectedItems.filter((id) => id !== itemId));
    } else {
      setSelectedItems([...selectedItems, itemId]);
    }
  };

  const handleQuantityChange = (itemId, quantity) => {
    setQuantities({ ...quantities, [itemId]: quantity });
  };

  const handleSubmit = () => {
    setSubmittingOrder(true);
    // Submit order logic goes here
  };

  return (
    <div className='order-component'>
      <h2>Order Items from Stock</h2>
      <table>
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Quantity Available</th>
            <th>Order Quantity</th>
            <th>Select Item</th>
          </tr>
        </thead>
        <tbody>
          {stockList.map((item) => (
            <tr key={item.id}>
              <td>{item.itemName}</td>
              <td>{item.quantity}</td>
              <td>
                <input
                  type='number'
                  min={0}
                  disabled={!selectedItems.includes(item.id)}
                  value={quantities[item.id] || ''}
                  onChange={(e) =>
                    handleQuantityChange(item.id, parseInt(e.target.value))
                  }
                />
              </td>
              <td>
                <input
                  type='checkbox'
                  checked={selectedItems.includes(item.id)}
                  onChange={() => handleSelectItem(item.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        disabled={selectedItems.length === 0 || submittingOrder}
        onClick={handleSubmit}
      >
        {submittingOrder ? 'Submitting Order...' : 'Submit Order'}
      </button>
    </div>
  );
}

export default OrderComponent;