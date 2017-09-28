import React, { PureComponent } from 'react';
import { Picker } from 'react-native';
import PropTypes from 'prop-types';

const { Item } = Picker;

export default class NumberSelect extends PureComponent {
    static displayName = 'NumberSelect';
    static propTypes = {
        id: PropTypes.string,
        labelFixed: PropTypes.bool,
        labelText: PropTypes.string,
        max: PropTypes.number.isRequired,
        min: PropTypes.number.isRequired,
        onChange: PropTypes.func,
        style: PropTypes.object
    }
    static defaultProps = {
        max: 0,
        min: 0,
        style: {
            width: 50,
            display: 'inline-block'
        }
    }

    constructor (props) {
        super(props);

        this.state = {
            value: props.min
        };

        this.onSelect = this.onSelect.bind(this);
    }

    onSelect (value, key) {
        const { onChange } = this.props;

        this.setState({ value });

        if (onChange) {
            onChange(value);
        }
    }

    render () {
        const { id, labelText, labelFixed, min, max, style } = this.props;
        const range = [...Array(max).keys()].slice(min);
        const mergedStyle = {
            ...NumberSelect.defaultProps.style,
            ...style
        };

        return (
            <Picker
                id={ id }
                selectedValue={ this.state.value }
                onValueChange={ this.onSelect }
            >
            { range.map((num) => <Item key={ num } value={ num } label={ num.toString() } />) }
            </Picker>
        );
    }
}
