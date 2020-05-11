// eslint-disable-next-line no-unused-vars
import React from 'react';
import './Create.css';

import Canvas from '../Canvas/Canvas';
import '../Canvas/Canvas.css';

const Create = () => {
  return (
    <div className="edit-table">
      <p className="heading">You can create your portfolio here!</p>
      <Canvas />
    </div>
  );
};

export default Create;
