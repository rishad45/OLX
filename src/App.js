import React,{useEffect,useContext} from 'react';
import './App.css';

// import packages
import { BrowserRouter as Router, Route } from 'react-router-dom'

/**
 * ?  =====Import Components=====
 */
import Home from './Pages/Home'
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import Create from './Pages/Create'
import ViewPost from './Pages/ViewPost';

// import contexts
import {AuthContext,FirebaseContext} from './Contexts/Context' 

function App() {
  const {user,setUser} = useContext(AuthContext) 
  const {firebase} = useContext(FirebaseContext) 
  useEffect(()=>{
    // console.log(user)
    firebase.auth().onAuthStateChanged((userCredential)=>{
      setUser(userCredential) 
    })

  },[])
  return (
    <div>
      <Router>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route path='/signup'>
          <Signup />
        </Route>
        <Route path='/login'>
          <Login /> 
        </Route>
        <Route path='/sell'>
          <Create /> 
        </Route>
        <Route path='/singleProduct'>
          <ViewPost/> 
        </Route>
      </Router>
    </div>
  );
}

export default App;
