import React from 'react'
import "./Login.css"
function Login() {
  return (
    <div className='login-container'>
<form action="">
  <h2>Login</h2>
  <div className="form-group">
    <label htmlFor="userid">User ID</label>
    <input type="text" id="userid" name="userid" />
  </div>
  <div className="form-group">
    <label htmlFor="password">Password</label>
    <input type="password" name="password" id="password" />

  </div>
  <a href="#" class="forgot-password">Forgot Password</a>
  <button type="submit">Submit</button>
</form>
    </div>
  )
}

export default Login