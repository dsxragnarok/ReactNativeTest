import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';

export default class LogItem extends PureComponent {
    static displayName = 'LogItem'
    static propTypes = {
        message: PropTypes.string.isRequired
    }
    static defaultProps = {
        message: ''
    }

    render () {
        return (
            <View>
                <Text>{ this.props.message }</Text>
            </View>
        );
    }
}
