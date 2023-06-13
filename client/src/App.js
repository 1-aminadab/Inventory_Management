import './App.css';
import UIDcheck from './admin/UIDCheck/UIDcheck';
import axios from 'axios';

axios.defaults.withCredentials = true
function App() {
  return (
    <div className="App">
     <UIDcheck />
    </div>
  );
}

export default App;
