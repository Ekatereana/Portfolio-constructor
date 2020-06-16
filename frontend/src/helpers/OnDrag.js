function handleDrag (e, ui, isParent) {
  if (!this.state.deltaPosition) {
    this.setState({
      deltaPosition: {
        x: 0,
        y: 0
      },
      isDragged: true,
      activeDrags: 0
    });
  }
  const { x, y } = this.state.deltaPosition;

  this.setState({
    deltaPosition: {
      x: x + ui.deltaX,
      y: y + ui.deltaY
    },
    isDragged: true
  });
  console.log('handle drag', this.state.deltaPosition);
  if (isParent) {
    if (isParent !== true) {
      console.log('isparent', isParent);
      this.props.update(isParent, this.state);
    } else {
      console.log('My perent');
      this.props.update(this.state);
    }
  } else {
    this.props.update(this);
  }
};

function onStart (isParent) {
  this.setState({ activeDrags: ++this.state.activeDrags });
};

function onStop (isParent) {
  this.setState({ activeDrags: --this.state.activeDrags });
};

export { onStart, onStop, handleDrag };
