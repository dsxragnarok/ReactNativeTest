import React, { PureComponent } from 'react';
import { Picker } from 'react-native';
import PropTypes from 'prop-types';

const { Item } = Picker;

export default class NumberSelect extends PureComponent {
    static displayName = 'NumberSelect';
    static propTypes = {
        defaultValue: PropTypes.number,
        id: PropTypes.string,
        itemStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
        max: PropTypes.number.isRequired,
        min: PropTypes.number.isRequired,
        onChange: PropTypes.func,
        showPositive: PropTypes.bool,
        style: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    }
    static defaultProps = {
        max: 0,
        min: 0
    }

    constructor (props) {
        super(props);
        const { defaultValue, min } = props;

        this.state = {
            value: Number.isInteger(defaultValue) ? defaultValue : min
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
        const { id, min, max, style, itemStyle, showPositive } = this.props;
        const range = Array.from({ length: max - min }, (value, index) => index + min);

        return (
            <Picker
                id={ id }
                selectedValue={ this.state.value }
                onValueChange={ this.onSelect }
                style={ style }
                itemStyle={ itemStyle }
            >
            {
                range.map((num) =>
                    <Item
                        key={ num }
                        value={ num }
                        label={ `${ showPositive && num > 0 ? '+' : ''}${ num.toString() }` }
                    />
                )
            }
            </Picker>
        );
    }
}
