import React, { Fragment, useContext, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import {AuthContext,FirebaseContext} from '../../Contexts/Context' 
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';

const Create = () => {
  // contexts
  const{firebase} = useContext(FirebaseContext)
  const{user} = useContext(AuthContext) 
  // hooks
  const history = useHistory()
  // state for formData
  const [formDetails, setFormDetails] = useState({
    name: '',
    category: '',
    description: '',
    price: null,
    image: null
  })

  // function for controlled form components
  const handleChange = (e)=>{
    setFormDetails({
      ...formDetails,[e.target.name]:e.target.value 
    })
    console.log(formDetails); 
  }

  // function for controlled file change in form
  const handleFileChange = (e)=>{
    setFormDetails({
      ...formDetails,'image':e.target.files[0] 
    })
  }

  // submitting the file 
  const submitForm = ()=>{
    if(formDetails.category==='' || formDetails.image === '' || formDetails.name === '' || formDetails.price === ''){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Empty Fields', 
      })
    }else{
      const date = new Date() 
    firebase.storage().ref(`/Images/${Date.now()+formDetails.image.name}`).put(formDetails.image).then(({ref})=>{  
      ref.getDownloadURL().then((url)=>{ 
        console.log(url) 
        firebase.firestore().collection('Products').add({
          name : formDetails.name,
          category: formDetails.category,
          description:formDetails.description,
          price:formDetails.price,
          url : url,
          userId : user.uid,
          createdAt: date.toDateString() 
        }) 
      })
    })
    history.push('/')
    }
  }

  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">

          <label htmlFor="name">Brand</label>
          <br />
          <input
            className="input"
            type="text"
            id="name"
            name="name"
            value={formDetails.name}
            onChange={handleChange}
          // defaultValue="brand" 
          />
          <br />
          <br />
          <label htmlFor="category">Category</label>
          <br />
          <input
            className="input"
            type="text"
            id="category"
            name="category"
            value={formDetails.category}
            // defaultValue="category" 
            onChange={handleChange}
          />
          <br />
          <br />

          <label htmlFor="description">Description</label>
          <br />
          <textarea id='description'
            rows={5}
            cols={25}
            name="description"
            value={formDetails.description}
            onChange={handleChange}>
          </textarea>
          <br />
          <br />
          <br />
          <label htmlFor="price" >Price</label>
          <br />
          <input className="input"
            type="number"
            id="price"
            name="price"
            value={formDetails.price}
            onChange={handleChange}
          />
          <br />
          <br />
          <img alt="Posts" width="200px" height="200px" src={formDetails.image ? URL.createObjectURL(formDetails.image) : ''}></img>

          <br />
          <input type="file"
                 onChange={handleFileChange} 
           />
          <br />

          <button className="uploadBtn" onClick={submitForm}>upload and Submit</button>

        </div>
      </card>
    </Fragment> 
  );
};

export default Create;
