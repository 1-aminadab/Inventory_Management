import './App.css';
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
function App() {
  return (
    <div className="App">
      <Transfer />
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
