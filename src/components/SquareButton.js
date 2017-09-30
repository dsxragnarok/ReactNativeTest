import React, { PureComponent } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

export default class SquareButton extends PureComponent {
    static displayName = 'SquareButton'
    static propTypes = {
        id: PropTypes.string,
        label: PropTypes.string,
        onPress: PropTypes.func,
    }

    render () {
        const { id, label, onPress } = this.props;

        return (
            <TouchableOpacity onPress={ onPress }>
                <View style={ styles.container }>
                    <Text style={ styles.text }>{ label }</Text>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: 60,
        height: 60,
        borderWidth: 2,
        borderStyle: 'solid',
        borderColor: 'black',
        borderRadius: 2,
    },
    text: {
        fontSize: 20,
        textAlign: 'center',
        textAlignVertical: 'center',
        color: 'black',
        fontWeight: 'bold',
        lineHeight: 50
    }
});
