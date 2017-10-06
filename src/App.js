import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';
import { NativeRouter, Route, Link } from 'react-router-native';
import { createStore, bindActionCreators } from 'redux';
import { Provider, connect } from 'react-redux';
import DiceBox from './containers/DiceBox';
import RollLog from './containers/RollLog';
import LogView from './components/LogView';
import reducer from './reducers';
import { actions } from './actions/log';

const store = createStore(reducer);

const items = [{
    message: 'You rolled 3d6 for 18 [6, 6, 6]'
}, {
    message: 'You rolled 2d12 for 24 [12, 12]'
}, {
    message: 'You rolled 2d8 for 16 [8, 8]'
}];
const diceroll = () => null;

function formatDiceRollMessage ({ n, die, modifier, rolls, total }) {
    const modStr = modifier.toString();
    const mod = modStr.indexOf('-') === -1 ? `+${ modStr }` : modStr;

    return `You rolled ${n}${die}${mod} = ${ total } ... [${ rolls }]`;
}


export class App extends Component {
    constructor (props) {
        super(props);

        this.onDiceRoll = this.onDiceRoll.bind(this);
    }

    onDiceRoll (result) {
        const { addLogMessage } = this.props;
        const message = formatDiceRollMessage(result);

        const payload = {
            message,
            timestamp: Date.now(),
        };

        addLogMessage(payload);
    }

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
                    <View style={ styles.content }>
                        <Route
                            exact path="/"
                            render={ (props) => <RollLog { ...props } /> }
                        />
                        <Route
                            path="/dicebox"
                            render={ (props) => <DiceBox { ...props } rollDiceCallback={ this.onDiceRoll } /> }
                        />
                    </View>
                </View>
            </NativeRouter>
        );
    }
}

const mapStateToProps = () => ({});
const mapDispatchToProps = (dispatch) => bindActionCreators({ ...actions }, dispatch);

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);
export default AppWithProvider = () => <Provider store={ store }><ConnectedApp /></Provider>;

const styles = StyleSheet.create({
    container: {
        padding: 10,
        width: '100%',
        height: '100%',
        alignItems: 'center'
    },
    header: {
        fontSize: 20
    },
    nav: {
        marginTop: 60,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    navItem: {
        flex: 1,
        alignItems: 'center',
        padding: 10
    },
    content: {

    },
    subNavItem: {
        padding: 5
    },
});
