import React, { useState } from 'react';
import './Profile.css';
import OrderHistory from './OrderHistory';
import Transfer from '../transfer/Transfer';
import Order from "../order_status/Order"
import SearchIcon from '@mui/icons-material/Search';
function UserProfile() {
  const [activeTab, setActiveTab] = useState('itemList');
  const [filterTerm, setFilterTerm] = useState('');

  const itemList = [
    {
      id: 1,
      itemName: 'Marker',
      quantity: 75,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed finibus felis vitae magna tincidunt, vel varius velit egestas. Nulla non lectus quis mauris efficitur iaculis non sed libero. Ut eget semper velit. Proin sit amet lorem id nibh vehicula congue. Aliquam in ipsum lacus. Sed fringilla, lacus eget hendrerit finibus, ex magna bibendum nulla, facilisis venenatis lorem sem vel risus.',
      image: 'https://via.placeholder.com/150',
      status: 'In Stock'
    },
    {
      id: 2,
      itemName: 'Tv',
      quantity: 10,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed finibus felis vitae magna tincidunt, vel varius velit egestas. Nulla non lectus quis mauris efficitur iaculis non sed libero. Ut eget semper velit. Proin sit amet lorem id nibh vehicula congue. Aliquam in ipsum lacus. Sed fringilla, lacus eget hendrerit finibus, ex magna bibendum nulla, facilisis venenatis lorem sem vel risus.',
      image: 'https://via.placeholder.com/150',
      status: 'Low Stock'
    }
  ];

  const transferHistory = [
    {
      id: 1,
      transferDate: '22/4/65 GC',
      itemName: 'Widget',
      quantity: 20,
      from: 'Warehouse A',
      to: 'Warehouse B'
    },
    {
      id: 2,
      transferDate: '22/4/65 GC',
      itemName: 'Gizmo',
      quantity: 5,
      from: 'Warehouse B',
      to: 'Warehouse C'
    }
  ];

  const orderHistory = [
    {
      id: 1,
      itemName: 'Widget',
      orderedBy: 'Abrham Zewdu',
      quantity: 75,
      orderDate: '22/4/65 GC',
      orderStatus: 'Taken',
      stockStatus: 'In Stock',
      confirmationStatus: 'Confirmed'
    },
    {
      id: 2,
      itemName: 'Gizmo',
      orderedBy: 'Hailemichael Tsega',
      quantity: 10,
      orderDate: '22/4/65 GC',
      orderStatus: 'Approved',
      stockStatus: 'Low Stock',
      confirmationStatus: 'Not Confirmed'
    },
  ];

  const filteredItemList = itemList.filter((item) =>
    item.itemName.toLowerCase().includes(filterTerm.toLowerCase())
  );

  const filteredTransferHistory = transferHistory.filter((item) =>
    item.itemName.toLowerCase().includes(filterTerm.toLowerCase())
  );

  const filteredOrderHistory = orderHistory.filter((item) =>
    item.itemName.toLowerCase().includes(filterTerm.toLowerCase())
  );

  const renderContent = () => {
    if (activeTab === 'itemList') {
      return (
        <div className='table-container'>
          <label htmlFor='filter'><SearchIcon /></label>
          <input
            type='text'
            id='filter'
            value={filterTerm}
            onChange={(e) => setFilterTerm(e.target.value)}
          />
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Item Name</th>
                <th>Quantity</th>
                <th>Description</th>
                <th>Image</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredItemList.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.itemName}</td>
                  <td>{item.quantity}</td>
                  <td>{item.description}</td>
                  <td><img src={item.image} alt='Product' /></td>
                  <td>{item.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    } else if (activeTab === 'transferHistory') {
      return (
        <div className='table-container'>
          <label htmlFor='filter'><SearchIcon /></label>
          <input
            type='text'
            id='filter'
            value={filterTerm}
            onChange={(e) => setFilterTerm(e.target.value)}
          />
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Transfer Date</th>
                <th>Item Name</th>
                <th>Quantity</th>
                <th>From</th>
                <th>To</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransferHistory.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.transferDate}</td>
                  <td>{item.itemName}</td>
                  <td>{item.quantity}</td>
                  <td>{item.from}</td>
                  <td>{item.to}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    } else if (activeTab === 'orderHistory') {
      return (
        <div className='table-container'>
          <label htmlFor='filter'><SearchIcon /></label>
          <input
            type='text'
            id='filter'
            value={filterTerm}
            onChange={(e) => setFilterTerm(e.target.value)}
          />
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
              {filteredOrderHistory.map((item) => (
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
    } else if (activeTab === 'transfer') {
      return <Transfer />;
    }
  };

  return (
    <div className='profile-container'>
      <div className='profile-left'>
       
        <div className='profile-picture'>
          <img src='https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=600' />
        </div>
        <div className='profile-details'>
          <h3>Abrham Zewdu</h3>
          <p>Email: developer.amanuel@gmail.com</p>
          <p>Phone: 109876543</p>
          <p>department: electrical</p>
        </div>
      </div>
      <div className='profile-right'>
        <div className='tabs'>
          <button
            className={activeTab === 'itemList' ? 'active' : ''}
            onClick={() => setActiveTab('itemList')}
          >
            Item List
          </button>
          <button
            className={activeTab === 'transferHistory' ? 'active' : ''}
            onClick={() => setActiveTab('transferHistory')}
          >
            Transfer History
          </button>
          <button
            className={activeTab === 'orderHistory' ? 'active' : ''}
            onClick={() => setActiveTab('orderHistory')}
          >
            Order History
          </button>
          <button
            className={activeTab === 'transfer' ? 'active' : ''}
            onClick={() => setActiveTab('transfer')}
          >
            Transfer
          </button>
        </div>
        {renderContent()}
      </div>
    </div>
  );
}

export default UserProfile;