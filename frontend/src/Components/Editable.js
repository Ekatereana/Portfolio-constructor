import './Editable.css';
import React, { useState, useEffect } from 'react';
const Editable = ({
  text,
  type,
  placeholder,
  children,
  childRef,
  styleName,
  ...props
}) => {
  const [isEditing, setEditing] = useState(false);

  useEffect(() => {
    if (childRef && childRef.current && isEditing === true) {
      childRef.current.focus();
    }
  }, [isEditing, childRef]);

  const handleKeyDown = (event, type) => {
    const { key } = event;
    const keys = ['Escape', 'Tab'];
    const enterKey = 'Enter';
    const allKeys = [...keys, enterKey];
    if (
      (type === 'textarea' && keys.indexOf(key) > -1) ||
      (type !== 'textarea' && allKeys.indexOf(key) > -1)
    ) {
      setEditing(false);
    }
  };

  return (
    <section {...props}>
      {isEditing ? (
        <div
          onBlur={() => setEditing(false)}
          onKeyDown={e => handleKeyDown(e, type)}
        >
          {children}
        </div>
      ) : (
        <div
          className={`editable-${type}`}
          onClick={() => setEditing(true)}
        >
          <span className={`${text ? 'text-black ' : 'text-gray-500'}` + `${styleName}`}>
            {text || placeholder || 'Editable content'}
          </span>
        </div>
      )}
    </section>
  );
};

export default Editable;
