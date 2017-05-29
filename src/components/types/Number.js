import React from 'react';

const styles = {
  display: 'table-cell',
  boxSizing: 'border-box',
  verticalAlign: 'middle',
  height: '26px',
  width: '100%',
  outline: 'none',
  border: '1px solid #f7f4f4',
  borderRadius: 2,
  fontSize: 11,
  padding: '5px',
  color: '#444',
};


class NumberType extends React.PureComponent {

  constructor(props) {
    super(props);
    this.renderNormal = this.renderNormal.bind(this);
    this.renderRange = this.renderRange.bind(this);
  }

  renderNormal() {
    const { knob, onChange } = this.props;

    return (<input
      id={knob.name}
      ref="input"
      style={styles}
      value={knob.value}
      type="number"
      onChange={() => onChange(parseFloat(this.refs.input.value))}
    />);
  }

  renderRange() {
    const { knob, onChange } = this.props;

    return (<input
      id={knob.name}
      ref="input"
      style={styles}
      value={knob.value}
      type="range"
      min={knob.min}
      max={knob.max}
      step={knob.step}
      onChange={() => onChange(parseFloat(this.refs.input.value))}
    />);
  }

  render() {
    const { knob } = this.props;

    return knob.range ? this.renderRange() : this.renderNormal();
  }
}

NumberType.propTypes = {
  knob: React.PropTypes.object,
  onChange: React.PropTypes.func,
};

NumberType.serialize = function (value) {
  return String(value);
};

NumberType.deserialize = function (value) {
  return parseFloat(value);
};

export default NumberType;
