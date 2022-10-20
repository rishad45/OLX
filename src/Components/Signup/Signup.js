import React, { useState, useContext} from 'react';

import Logo from '../../olx-logo.png';
import './Signup.css';

import {FirebaseContext} from '../../Contexts/Context' 
import { useHistory } from 'react-router-dom';

// ..........MAIN FUNCTION.........
export default function Signup() {
  // state for formData
  const [state, setState] = useState({
    username: "",
    email: "",
    phone: null,
    password: ""
  })

  // useHistory hook
  const history = useHistory()

  // firebase destructuring
  const {firebase} = useContext(FirebaseContext)

  // function for handling the form submission 
  const handleFormSubmit = (e) => {
    e.preventDefault() 
    firebase.auth().createUserWithEmailAndPassword(state.email,state.password).then((result)=>{
      result.user.updateProfile({displayName:state.username}).then(()=>{
        firebase.firestore().collection('Users').add({
          id: result.user.uid,
          username : state.username,
          phone:state.phone,
        }).then(()=>{
          history.push('/login') 
        })
      })
    })
  }

  // function for handling input change
  const handleChange = (e) => {
    const name = e.target.name 
    const value = e.target.value 
    setState({...state, [name]: value}) 
  }
  // destructuring state
  // const { username, email, phone, password } = FormData

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleFormSubmit}>
          <label htmlFor="username">Username</label>
          <br />
          <input
            className="input"
            type="text"
            id="username"
            name="username"
            defaultValue="user"
            onChange={handleChange}
          />
          <br />
          <label htmlFor="email">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="email"
            name="email"
            defaultValue="email@gmail.com"
            onChange={handleChange}
          />
          <br />
          <label htmlFor="phone">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            id="phone"
            name="phone"
            defaultValue="1111111111"
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
          <button type='submit'>Signup</button>
        </form>
        <a>Login</a>
      </div>
    </div>
  );
}
