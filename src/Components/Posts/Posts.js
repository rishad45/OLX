import React, { useContext, useEffect, useState } from 'react';

import Heart from '../../assets/Heart';
import './Post.css';
import { FirebaseContext } from '../../Contexts/Context'
function Posts() {

  // contexts
  const { firebase } = useContext(FirebaseContext)

  // useState hooks
  const [Products, setProducts] = useState([])
  let allProducts
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
        <div className="cards" > 
          {/* dynamic */}
          {
            Products.map((i) => {
              return <div
                className="card"
              >
                <div className="favorite">
                  <Heart></Heart>
                </div>
                <div className="image">
                  <img src={i.url} alt="" />
                </div>
                <div className="content">
                  <p className="rate">&#x20B9; {i.price}</p>
                  <span className="kilometer">{i.category}</span>
                  <p className="name"> {i.name}</p>
                </div>
                <div className="date">
                  <span>Tue May 04 2021</span>
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
          <div className="card">
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src="../../../Images/R15V3.jpg" alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 250000</p>
              <span className="kilometer">Two Wheeler</span>
              <p className="name"> YAMAHA R15V3</p>
            </div>
            <div className="date">
              <span>10/5/2021</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Posts;
