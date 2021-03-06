import './Editable.css';
import React, { useState, useEffect } from 'react';
const Editable = ({
  text,
  type,
  edit,
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

  let editable;
  if (edit == null) {
    editable = () => setEditing(true);
  }

  const placeholderDef = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos, adipisci \n Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos, adipisci';
  console.log('editable', edit);

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
          onClick={editable}
        >
          <span className={`${text ? 'text-black ' : 'text-gray-500 '}` + `${styleName}`}>
            {text || placeholder || placeholderDef}
          </span>
        </div>
      )}
    </section>
  );
};

export default Editable;
