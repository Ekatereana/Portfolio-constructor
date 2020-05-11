import React, { useRef } from 'react';
import useDraggable from './useDraggable';
import './Draggable.css';

const Draggable = ({ children }) => {
  const cardRef = useRef(null);
  useDraggable(cardRef);

  return (
    <div className="holder" ref={cardRef}>
      {children}
    </div>
  );
};

export default Draggable;
