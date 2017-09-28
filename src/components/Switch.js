import React, { PureComponent } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';

export default class Switch extends PureComponent {
    static displayName = 'Switch'
    static propTypes = {
        id: PropTypes.string,
    }

    constructor (props) {
        super(props);

        this.state = {
            on: false
        };

        this.toggle = this.toggle.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick () {
        const { onClick } = this.props;
        this.toggle();

        if (onClick) onClick(!this.state.on);
    }

    toggle () {
        const { on } = this.state;
        this.setState({ ...this.state, on: !on });
    }

    render () {
        const { id } = this.props;
        const { on } = this.state;

        return (
            <TouchableOpacity onPress={ this.handleClick }>
                <View style={ styles.container }>
                    <Text style={ styles.text }>{ on ? '-' : '+' }</Text>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: 30,
        height: 30,
        borderWidth: 2,
        borderStyle: 'solid',
        borderColor: 'black',
        borderRadius: 2
    },
    text: {
        fontSize: 20,
        textAlign: 'center',
        color: 'black',
        fontWeight: 'bold'
    }
});
