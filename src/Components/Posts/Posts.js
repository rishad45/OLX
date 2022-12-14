import React, { useContext, useEffect, useState } from 'react';

import Heart from '../../assets/Heart';
import './Post.css';
import { FirebaseContext } from '../../Contexts/Context'
import { PostContext } from '../../Contexts/Post';
import { useHistory } from 'react-router-dom';
function Posts() {

  // contexts
  const { firebase } = useContext(FirebaseContext)
  const { setPost } = useContext(PostContext) 

  // useState hooks
  const [Products, setProducts] = useState([])
  let allProducts
  let recom
  const history = useHistory()
  // Querying For Products
  useEffect(() => {
    firebase.firestore().collection('Products').get().then(async (snapshot) => {
      allProducts = await snapshot.docs.map((prod) => { 
        console.log("prod", prod.data());
        return {
          ...prod.data(),
          productId: prod.id 
        }
      })
      console.log("products", allProducts)
      setProducts(allProducts) 
    })
  }, [])
  console.log(Products) 
  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
          {/* dynamic */}
          {
            Products.map((i) => {
              return <div
                className="card"
                onClick={() => { 
                  console.log(i)
                  setPost(i)  
                  history.push('/singleProduct')  
                }}
              >
                <div className="favorite">
                  <Heart></Heart>
                </div>
                <div className="image">
                  <img src={i.url} alt="" />
                </div>
                <div className="content">
                  <p className="rate">&#x20B9; {i.price}</p>
                  <span className="kilometer" id='catname'>{i.category}</span>
                  <p className="name" id='productName'> {i.name}</p>
                </div>
                <div className="date">
                  <span>{i.createdAt}</span>
                </div>
              </div>
            })
          }
          {/* dynamic */}
        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          {
            Products.slice(-5).reverse().map((i)=>{ 
              return i && <div className="card">
              <div className="favorite">
                <Heart></Heart>
              </div>
              <div className="image">
                <img src={i.url} alt="" />
              </div>
              <div className="content">
                <p className="rate">&#x20B9; {i.price}</p>
                <span className="kilometer">{i.category}</span>
                <p className="name">{i.name}</p>
              </div>
              <div className="date">
                <span>10/5/2021</span>
              </div>
            </div>

            })
          }
        </div>
      </div>
    </div>
  );
}

export default Posts;
