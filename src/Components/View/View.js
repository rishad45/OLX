import React, { useContext, useEffect, useState } from 'react';

import './View.css';
import { PostContext } from '../../Contexts/Post';
import { FirebaseContext } from '../../Contexts/Context'
function View() { 
  // states
  const [userDetails, setUserDetails] = useState() 
  // contexts
  const { post } = useContext(PostContext) 
  const { firebase } = useContext(FirebaseContext)
  useEffect(() => {
    firebase.firestore().collection('Users').where('id', '==', post.userId).get().then(async (snapshot) => {
      snapshot.forEach(doc => {
         setUserDetails(doc.data())  
      })

    })
  },[])
  console.log("user", userDetails);


  return (

    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={post.url}
          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {post.price} </p>
          <span>{post.name}</span>
          <p>{post.category}</p>
          {/* <span>{ }</span> */}
        </div>
        
          {userDetails && <div className="contactDetails">
            <p>Seller details</p>
            <p>{userDetails.username}</p>
            <p>{userDetails.phone}</p>
          </div>}
        

      </div>
    </div>
  );
}
export default View;
