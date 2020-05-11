import React from 'react';
import './Canvas.css';

import Draggable from '../Draggable/Draggable';
import '../Draggable/Draggable.css';

const Canvas = () => {
  return (
    <div className="canvas">
      <div className="edit-menu">
        <a className="edit-item">Add text</a>
        <a className="edit-item">Add image</a>
        <a className="edit-item">Save changes</a>
        <a className="edit-item">Export as...</a>
      </div>
      <div className="edit-field">
        <Draggable>Text</Draggable>
      </div>
    </div>
  );
};

export default Canvas;
