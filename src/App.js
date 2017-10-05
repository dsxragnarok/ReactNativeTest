import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import DiceBox from './containers/DiceBox';
import LogView from './components/LogView';


export default class App extends Component {
    render () {
        const items = [{
            message: 'You rolled 3d6 for 18 [6, 6, 6]'
        }, {
            message: 'You rolled 2d12 for 24 [12, 12]'
        }, {
            message: 'You rolled 2d8 for 16 [8, 8]'
        }];

        return (
            <View style={{ marginTop: 60 }}>
                <LogView items={ items } />
                {/* <DiceBox rollDiceCallback={() => console.log('roll dice')} /> */}
            </View>
        );
    }
}
