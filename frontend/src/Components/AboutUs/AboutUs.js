import React from 'react';
import './AboutUs.css';

const AboutUs = () => {
  return (
    <div className={'about-container'}>
      <img src={'/about-team.png'}/>
      <p className={'description'}>Hello! We are a team of professional developers passionate to provide you with the best tools possible to create the most beatiful portfolio of your life!</p>
    </div>
  );
};

export default AboutUs;
