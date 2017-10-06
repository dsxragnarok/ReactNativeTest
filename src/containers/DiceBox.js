import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import bindAll from 'lodash/bindAll';
import SquareButton from '../components/SquareButton';
import NumberSelect from '../components/NumberSelect';
import { types as dice, rollDieTypeNTimes } from '../models/dice';

const renderDice = (dice) =>
    dice.map((die) =>
        <SquareButton
            key={ die }
            label={ die }
            onClick={ () => rollDice(die) }
        />
    )

export default class DiceBox extends PureComponent {
    static displayName = 'DiceBox';
    static propTypes = {
        rollDiceCallback: PropTypes.func.isRequired,
        style: PropTypes.object,
    }

    constructor (props) {
        super(props);

        this.state = {
            nDice: 1,
            modifier: 0
        };

        bindAll(this, [
            'updateDiceCount',
            'updateModifier',
            'rollDice',
            'renderDice'
        ]);
    }

    updateDiceCount (n) {
        this.setState({ ...this.state, nDice: n });
    }

    updateModifier (n) {
        this.setState({ ...this.state, modifier: n });
    }

    rollDice (die) {
        const { rollDiceCallback } = this.props;
        const { nDice, modifier } = this.state;
        const rolls = rollDieTypeNTimes(nDice, dice[die]);

        const results = {
            die,
            rolls,
            modifier,
            n: nDice,
            total: rolls.reduce((sum, val) => sum + val, 0) + modifier
        };

        rollDiceCallback(results);
    }

    renderDice (dice) {
        return dice.map((die) =>
            <SquareButton
                key={ die }
                label={ die }
                onPress={ () => this.rollDice(die) }
            />
        );
    }

    render () {
        const { updateDiceCount, updateModifier, updateOperator, rollDice } = this;

        return (
            <View style={ styles.container }>
                <NumberSelect
                    id="dice-count"
                    min={ 1 }
                    max={ 100 }
                    onChange={ updateDiceCount }
                    style={ styles.selectors }
                    itemStyle={ styles.selectorItem }
                />
                <View style={ styles.buttonContainers }>
                { this.renderDice(['d2','d4','d6','d8']) }
                </View>
                <View style={ styles.buttonContainers }>
                { this.renderDice(['d10','d12','d20','d100']) }
                </View>
                <NumberSelect
                    id="modifier"
                    showPositive={ true }
                    defaultValue={ this.state.modifier }
                    min={ -99 }
                    max={ 100 }
                    onChange={ updateModifier }
                    style={ styles.selectors }
                    itemStyle={ styles.selectorItem }
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    buttonContainers: {
        flex: 0,
        flexDirection: 'row',
        height: 60,
        margin: 10
    },
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    selectors: {
        flex: 0,
        height: 44,
        margin: 10
    },
    selectorItem: {
        height: 44
    }
})
