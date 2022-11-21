import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { authentification, } from "../../redux/actions/user"
import { AUTH_RESET_STATE } from "../../redux/types"
const Login = () => {
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const dispatch = useDispatch();
    const {
        isError,
        error } = useSelector((state) => state.user);
    const handleChangeEmail = (e) => {

        setemail(e.target.value)
        dispatch(AUTH_RESET_STATE)
    }
    const handleChangePassword = (e) => {

        setpassword(e.target.value)
        dispatch(AUTH_RESET_STATE)
    }

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(authentification({email,password}));
    }
    

  return (
<div className="az-body">
<div className="az-signin-wrapper">
  <div className="az-card-signin">
  <img style={{width:"40%"}} src={"https://diginov.tech/logo.png"} className="az-logo" />
    <div className="az-signin-header">
        {isError &&
      <p style={{backgroundColor: '#ff6666',color: 'white',borderRadius: '5px',padding:'3px'}}> {error} </p>
        }
      <h2 style={{color: "#033345"}}>Welcome back!</h2>
      <h4 style={{color: "#033345"}}>Please sign in to continue</h4>
      <form>
        <div className="form-group">
          <label>Email</label>
          <input type="text" onChange={handleChangeEmail} className="form-control" placeholder="Enter your email" value={email} />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" onChange={handleChangePassword} className="form-control" placeholder="Enter your password" value={password} />
        </div>
        <button style={{backgroundColor: "#033345"}} className="btn btn-az-primary btn-block" onClick={handleLogin} >Sign In</button>
      </form>
    </div>
  </div>
</div>
</div>
  )
}

export default Login