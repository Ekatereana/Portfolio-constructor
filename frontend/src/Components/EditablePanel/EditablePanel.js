import React from 'react';
import { MDBIcon } from 'mdbreact';
const EditablePanel = ({
  name,
  value,
  isParent,
  changeColor,
  column,
  color,
  font,
  size,
  position,
  style,
  scaleble,
  button,
  changeFont,
  onChangeTiTlePosition,
  changeStyle,
  plusSize,
  ...props
}) => {
  return (

    <section {...props}>
      <div className={ column ? 'col-5 control-panel' : 'row control-panel'}>
        <div name={`${name}` + 'Color'} value={color} onClick={ (event) => changeColor(event, isParent)} className="filler-color">
          <MDBIcon icon="fill" />
        </div>
        <div onClick={(event) => onChangeTiTlePosition(event, isParent)}
          name={`${name}` + 'Position'}
          value={position} className="text-format-button">
          { button }
        </div>
        <div name={`${name}` + 'FontSize'} value={size}
          onClick={ (event) => changeFont(event, isParent, scaleble)} className="filler-color">
          {plusSize ? <i class="fas fa-plus-circle"></i> : <i class="fas fa-text-height"></i>}

        </div>

        {changeStyle ? (
          <div name={`${name}` + 'Style'} value={style} onClick={ (event) => changeStyle(event, 'underline', isParent)} className="filler-color">
            <i class="fas fa-underline"/>
          </div>
        ) : null}

        {changeStyle ? (
          <div name={`${name}` + 'Style'} value={style} onClick={ (event) => changeStyle(event, 'italic', isParent)} className="filler-color">
            <i class="fas fa-italic"/>
          </div>
        ) : null}

        {changeStyle ? (
          <div name={`${name}` + 'Style'} value={style} onClick={ (event) => changeStyle(event, 'bold', isParent)} className="filler-color">
            <i class="fas fa-bold"/>
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default EditablePanel;
