import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import SquareButton from './components/SquareButton';
import NumberSelect from './components/NumberSelect';
import DiceBox from './containers/DiceBox';

export default class App extends Component {
    render () {
        return (
            <View style={{ marginTop: 60 }}>
                <DiceBox rollDiceCallback={() => console.log('roll dice')} />
            </View>
        );
    }
}
