import React from 'react';
import './HomePage.css';

// import { useLocation } from 'react-router-dom';
const HomePage = ({ user }) => {
  return (
    <div className="headerContainer">
      <div className="name-space">
        <div className="image">
          <img src={'./social.svg'}/>
        </div>
        <div className="user-name"> JON DOU</div>
      </div>
    </div>
  );
};
export default HomePage;
