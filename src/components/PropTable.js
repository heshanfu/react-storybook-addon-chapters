import React from 'react';

const PropTypesMap = new Map();
for (let typeName in React.PropTypes) {
  if (!React.PropTypes.hasOwnProperty(typeName)) {
    continue
  }
  const type = React.PropTypes[typeName];
  PropTypesMap.set(type, typeName);
}

export default class PropTable extends React.Component {
  static displayName = 'PropTable';
  static propTypes = {
    comp: React.PropTypes.func
  };

  render () {
    const comp = this.props.comp;

    if (!comp) {
      return null;
    }

    const props = {};

    if (comp.propTypes) {
      for (let property in comp.propTypes) {
        if (!comp.propTypes.hasOwnProperty(property)) {
          continue
        }
        const type = comp.propTypes[property];
        const propType = PropTypesMap.get(type) || 'other';
        const required = type.isRequired === undefined ? 'yes' : 'no';
        const defaultValue = '-';
        props[property] = {property, propType, required, defaultValue};
      }
    }

    if (comp.defaultProps) {
      for (let property in comp.defaultProps) {
        if (!comp.defaultProps.hasOwnProperty(property)) {
          continue
        }
        const value = comp.defaultProps[property];
        if (value === undefined) {
          continue;
        }
        if (!props[property]) {
          props[property] = {property};
        }
        props[property].defaultValue = value;
      }
    }

    return (
      <table>
        <thead>
          <tr>
            <th>property</th>
            <th>propType</th>
            <th>required</th>
            <th>default</th>
          </tr>
        </thead>
        <tbody>
          {Object.values(props).map(row => (
            <tr>
              <td>{row.property}</td>
              <td>{row.propType}</td>
              <td>{row.required}</td>
              <td>{row.defaultValue.toString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}