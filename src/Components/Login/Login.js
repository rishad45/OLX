import React, { useContext, useState } from 'react';
import Swal from 'sweetalert2';
import Logo from '../../olx-logo.png';
import './Login.css';

import {Link} from 'react-router-dom'

// importing firebase context
import {FirebaseContext} from '../../Contexts/Context'
import { useHistory } from 'react-router-dom'; 

// MAIN FUNCTION
function Login() {
  // firebase
  const {firebase} = useContext(FirebaseContext) 

  // useHistory hook
  const history = useHistory()

  // state for storing the input values
  const [state,setState] = useState({
    email : '',
    password : '' 
  })

  // handle input change
  const handleChange = (e)=>{
    setState({
      ...state, [e.target.name] : e.target.value 
    })
    console.log(state) 
  }

  // handle for submission
  const handleFormSubmit = (e)=>{
    e.preventDefault()  
    if(state.email === '' || state.password == ''){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Input fields cannot be empty!',
      })
    }else{  
      firebase.auth().signInWithEmailAndPassword(state.email,state.password).then((userCredential)=>{
        // signed In
        // const user = userCredential.user
        history.push('/') 
      }).catch((error)=>{ 
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `${error.message}`,
        })
      })
    }
  }

  return (
    <div>
      <div className="loginParentDiv">
        {/* <img width="200px" height="200px" src={Logo}></img> */}
        <img className='loginImage1' width="100px" height="100px"  src='../../../Images/login.png' alt="" />
        <p className='loginImage1text'>Help us become one of the safest places <br /> to buy and sell</p>
        <form onSubmit={handleFormSubmit} className="loginForm">
          <label htmlFor="email">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="email"
            name="email"
            defaultValue="example@gmail.com"
            onChange={handleChange}
          />
          <br />
          <label htmlFor="password">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="password" 
            name="password"
            defaultValue="******"
            onChange={handleChange} 
          />
          <br />
          <br />
          <button type='submit'>Login</button> 
        </form>
        <Link to='/signup'>Sign Up</Link>
      </div>
    </div>
  );
}

export default Login;
