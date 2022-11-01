import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// importing contexts
import { FirebaseContext } from './Contexts/Context'
import Context from './Contexts/Context';
import firebase from './Firebase/config';



ReactDOM.render(
    <FirebaseContext.Provider value={{ firebase }}>
        <Context> 
            <App />
        </Context>
    </FirebaseContext.Provider>
    , document.getElementById('root'));  
