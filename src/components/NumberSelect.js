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
    }
    static defaultProps = {
        max: 0,
        min: 0
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
        const { id, labelText, labelFixed, min, max } = this.props;
        const range = Array.from({ length: max - min }, (value, index) => index + min);

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
