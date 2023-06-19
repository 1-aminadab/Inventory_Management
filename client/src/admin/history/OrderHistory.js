import React,{useState, useEffect} from 'react'
import './History.css'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';
function OrderHistory({open, change}) {
  const [inputHistory, setInputHistory] = useState()
  const [listHistory, setListHistory] = useState()
  const [openHistory, setOpenHistory] = useState(false)
  
  
  useEffect(()=>{
    setOpenHistory(true)
  },[open])
  return (
    <div style={{transform:`translateX(${ openHistory ? "0%" : '100%'})`}} className='order-history'>
      
      <div onClick={()=> {
        change(false)
        setOpenHistory(false)}} className='back-arrow'>
      <ArrowBackIcon/>
      </div>
      <div className='history option header'>history option</div>
           <div className='history-search'>
            <label htmlFor="history-filter"><SearchIcon color='#ccc'/></label>
            <input onChange={(e)=>setInputHistory(e.target.value)} type="text" value={inputHistory} name="" id="history-filter" />
            <select onChange={(e)=> setListHistory(e.target.value)} name="" id="">
              <option value="request">Requested</option>
              <option value="approved">Approved</option>
              <option value="taken">Taken</option>
              <option value="rejected">Rejected</option>
            </select>
           </div>
           <br />

           <hr />
      <table>
	  <thead>
	    <tr>
	      <th>ID</th>
	      <th>Item Name</th>
	      <th>Orderd By</th>
	      <th>Quantity</th>
        <th>Order Date</th>
	      <th>Status</th>
        <th>Confirm</th>

	      
	    </tr>
	  </thead>
	  <tbody>
	    <tr>
	      <td>1</td>
	      <td>Widget</td>
	      <td>100</td>
	      <td>75</td>
	      <td>22 /4 /65 GC</td>
	      <td>In Stock</td>
        <td>confirmed</td>
	      
	    </tr>
	    <tr>
	      <td>2</td>
	      <td>Gizmo</td>
	      <td>50</td>
	      <td>10</td>
        <td>22 /4 /65 GC</td>
	      <td>Low Stock</td>
	      <td>not confirmed..</td>
	    </tr>
	    
	  </tbody>
	</table>
    </div>
  )
}

export default OrderHistory