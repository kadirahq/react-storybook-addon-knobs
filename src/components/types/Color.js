import React from 'react';
import { SketchPicker } from 'react-color';

const styles = {
  swatch: {
    background: '#fff',
    borderRadius: '1px',
    border: '1px solid rgb(247, 244, 244)',
    display: 'inline-block',
    cursor: 'pointer',
    width: '100%',
  },
  popover: {
    position: 'absolute',
    zIndex: '2',
  },
  cover: {
    position: 'fixed',
    top: '0px',
    right: '0px',
    bottom: '0px',
    left: '0px',
  },
};

class ColorType extends React.PureComponent {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.onWindowMouseDown = this.onWindowMouseDown.bind(this);
    this.onChange = this.onChange.bind(this);
    this.state = {
      displayColorPicker: false,
    };
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.onWindowMouseDown);
  }
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.onWindowMouseDown);
  }

  onWindowMouseDown(e) {
    if (!this.state.displayColorPicker) return;
    if (this.popover.contains(e.target)) return;

    this.setState({
      displayColorPicker: false,
    });
  }

  handleClick() {
    this.setState({
      displayColorPicker: !this.state.displayColorPicker,
    });
  }

  onChange(color) {
    this.props.onChange(color.hex);
  }

  render() {
    const { knob } = this.props;
    const colorStyle = {
      width: 'auto',
      height: '20px',
      borderRadius: '2px',
      margin: 5,
      background: knob.value,
    };

    return (
      <div id={knob.name}>
        <div style={ styles.swatch } onClick={ this.handleClick }>
          <div style={ colorStyle } />
        </div>
        { this.state.displayColorPicker ? (
          <div style={ styles.popover } ref={(e) => {this.popover = e;}}>
            <SketchPicker color={ knob.value } onChange={ this.onChange } />
          </div>
        ) : null }
      </div>
    );
  }
}

ColorType.propTypes = {
  knob: React.PropTypes.object,
  onChange: React.PropTypes.func,
};

ColorType.serialize = function (value) {
  return value;
};

ColorType.deserialize = function (value) {
  return value;
};

export default ColorType;
