import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';
import { NativeRouter, Route, Link, withRouter } from 'react-router-native';
import { createStore, bindActionCreators } from 'redux';
import { Provider, connect } from 'react-redux';
import DiceBox from './containers/DiceBox';
import RollLog from './containers/RollLog';
import reducer from './reducers';
import { actions } from './actions/log';

/**
 * @todo break this up. -- Throwing a lot in here for now just for quick testing functionalities
 */
const store = createStore(reducer);

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
        const { addLogMessage, history } = this.props;
        const message = formatDiceRollMessage(result);

        const payload = {
            message,
            timestamp: Date.now(),
        };

        addLogMessage(payload);
        history.push('/logs');
    }

    render () {
        return (
            <View style={ styles.container }>
                <View style={ styles.nav }>
                    <Link
                        to="/logs"
                        underlayColor="#f0f4f7"
                        style={ styles.navItem }
                    >
                        <Text>Log</Text>
                    </Link>
                    <Link
                        to="/"
                        underlayColor="#f0f4f7"
                        style={ styles.navItem }
                    >
                        <Text>Dice Box</Text>
                    </Link>
                </View>
                <View style={ styles.content }>
                    <Route
                        exact path="/logs"
                        render={ (props) => <RollLog { ...props } /> }
                    />
                    <Route
                        exact path="/"
                        render={ (props) => <DiceBox { ...props } rollDiceCallback={ this.onDiceRoll } /> }
                    />
                </View>
            </View>
        );
    }
}

const mapStateToProps = () => ({});
const mapDispatchToProps = (dispatch) => bindActionCreators({ ...actions }, dispatch);

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);
const AppWithRoute = withRouter(ConnectedApp);

const NativeRouterApp = () => <NativeRouter><AppWithRoute /></NativeRouter>;

export default AppWithProvider = () => <Provider store={ store }><NativeRouterApp /></Provider>;

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
