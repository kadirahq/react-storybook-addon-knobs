import React from 'react';
import TypeMap from './types';
import isEqual from 'lodash.isequal';

const InvalidType = () => (<span>Invalid Type</span>);

const stylesheet = {
  field: {
    display: 'table-row',
    padding: '5px',
  },
  label: {
    display: 'table-cell',
    boxSizing: 'border-box',
    verticalAlign: 'top',
    paddingRight: 5,
    paddingTop: 7,
    textAlign: 'right',
    width: 80,
    fontSize: 10,
    color: 'rgb(68, 68, 68)',
    fontWeight: 600,
  },
};

stylesheet.textarea = {
  ...stylesheet.input,
  height: '100px',
};

stylesheet.checkbox = {
  ...stylesheet.input,
  width: 'auto',
};

export default class PropField extends React.PureComponent {
  constructor(props) {
    super(props);
    this._onChange = this._onChange.bind(this);
  }

  _onChange(value) {
    this.props.onChange(this.props.name, this.props.type, value);
  }

  shouldComponentUpdate(newProps) {
    return !isEqual(this.props.knob, newProps.knob);
  }

  render() {
    const { knob } = this.props;

    let InputType = TypeMap[knob.type] || InvalidType;

    return (
      <div style={stylesheet.field}>
        <label htmlFor={knob.name} style={stylesheet.label}>
          {`${knob.name}`}
        </label>
        <InputType
          knob={knob}
          onChange={this._onChange}
        />
      </div>
    );
  }
}

PropField.propTypes = {
  onChange: React.PropTypes.func.isRequired,
  knob: React.PropTypes.object,
};
