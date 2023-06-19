import './App.css';
// packages
import {Routes, Route} from 'react-router-dom'



import Profile from './user/profile/Profile'

import UIDcheck from './admin/UIDCheck/UIDcheck';
import UserList from './admin/list/UserList';
import ItemList from './admin/list/ItemList';
import axios from 'axios';
// /////////
import Login from './auth/Login';
import AddUser from './admin/register/AddUser';
// ////////
import AddItem from './admin/register/AddItem';
import UpdateItem from './admin/update/UpdateItem';
import UpdateUser from './admin/update/UpdateUser';
//////////
import ItemDetail from './admin/detail/ItemDetail'
import UserDetail from './admin/detail/UserDetail';
axios.defaults.withCredentials = true
//////// user page
import Transfer from './user/transfer/Transfer';
import Navbar from './layout/Navbar';
/////// historys
import OrderHistory from './admin/history/OrderHistory';
import TransfereHistory from './user/transer_history/TransfereHistory';

import SocketTest from './socket.io/SocketTest'
function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
      <Route path='/socket_test' element={<SocketTest/>}/>
        <Route path='/' element={<UserList/>}/>
        <Route path='/uid_check' element={<UIDcheck/>}/>
        <Route path='/item_list' element={<ItemList/>}/>
        <Route path='/add_user' element={<AddUser/>}/>
        <Route path='/add_item' element={<AddItem/>}/>
       {/*                      */}
       <Route path='/update_item' element={<UpdateItem/>}/>
       <Route path='/update_user' element={<UpdateUser/>}/>
       {/*                       */}
        <Route path='/login' element={<Login/>}/>
        <Route path='/item_detail' element={<ItemDetail/>}/>
        <Route path='/user_detail' element={<UserDetail/>}/>
        <Route path='/transfer' element={<Transfer/>}/>
        {/*  */}
        <Route path='/order_history' element={<OrderHistory/>}/>
        <Route path='/transfer_history' element={<TransfereHistory/>}/>
        <Route path='/user_profile' element={<Profile/>}/>
      </Routes>
      {/* <Transfer /> */}
      {/* <ItemDetail /> */}
     {/* <UserDetail/> */}
     
     {/* <UpdateUser /> */}
     {/* <UpdateItem /> */}
     {/* <AddItem /> */}
     {/* <AddUser /> */}
      {/* <UIDcheck /> */}
     {/* <UserList /> */}
     {/* <Login /> */}
     {/* <ItemList /> */}
    </div>
  );
}

export default App;
