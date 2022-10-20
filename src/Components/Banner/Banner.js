import React from 'react';

import './Banner.css';
import Arrow from '../../assets/Arrow'
function Banner() {
  return (
    <div className="bannerParentDiv">
      <div className="bannerChildDiv">
        <div className="menuBar">
          <div className="categoryMenu">
            <span>ALL CATEGORIES</span>
            <Arrow></Arrow> 
          </div>
          <div className="otherQuickOptions">
            <span className='link'>Cars</span>
            <span className='link'>Motorcy...</span>
            <span className='link'>Mobile Ph...</span>
            <span className='link'>For Sale:Houses & Apart...</span>
            <span className='link'>Scoot...</span>
            <span className='link'>Commercial & Other Ve...</span>
            <span className='link'>For Rent: House & Apart...</span>
          </div>
        </div>
        <div className="banner">
          <img
            src="../../../Images/banner copy.png" 
            alt=""
          />
        </div>
      </div>
      
    </div>
  );
}

export default Banner;
