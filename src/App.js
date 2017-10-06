import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { NativeRouter, Route, Link } from 'react-router-native';
import DiceBox from './containers/DiceBox';
import LogView from './components/LogView';

const items = [{
    message: 'You rolled 3d6 for 18 [6, 6, 6]'
}, {
    message: 'You rolled 2d12 for 24 [12, 12]'
}, {
    message: 'You rolled 2d8 for 16 [8, 8]'
}];
const diceroll = () => null;

export default class App extends Component {
    render () {
        return (
            <NativeRouter>
                <View style={ styles.container }>
                    <View style={ styles.nav }>
                        <Link
                            to="/"
                            underlayColor="#f0f4f7"
                            style={ styles.navItem }
                        >
                            <Text>Log</Text>
                        </Link>
                        <Link
                            to="/dicebox"
                            underlayColor="#f0f4f7"
                            style={ styles.navItem }
                        >
                            <Text>Dice Box</Text>
                        </Link>
                    </View>
                    <Route
                        exact path="/"
                        render={ (props) => <LogView { ...props } items={ items } /> }
                    />
                    <Route
                        path="/dicebox"
                        render={ (props) => <DiceBox { ...props } rollDiceCallback={ diceroll } /> }
                    />
                </View>
            </NativeRouter>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 60,
        padding: 10
    },
    header: {
        fontSize: 20
    },
    nav: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    navItem: {
        flex: 1,
        alignItems: 'center',
        padding: 10
    },
    subNavItem: {
        padding: 5
    },
});
