import React, { PureComponent } from 'react';
import { View } from 'react-native';
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
        rollDiceCallback: PropTypes.func.isRequired
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
            'rollDice'
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

    render () {
        const { updateDiceCount, updateModifier, updateOperator, rollDice } = this;

        return (
            <View>
                <NumberSelect
                    id="dice-count"
                    labelText="n"
                    labelFixed={ true }
                    min={ 1 }
                    max={ 100 }
                    onChange={ updateDiceCount }
                />
                <View style={{ flex: 1, flexDirection: 'row' }}>
                { renderDice(['d2','d4','d6','d8']) }
                </View>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                { renderDice(['d10','d12','d20','d100']) }
                </View>
                <NumberSelect
                    id="modifier"
                    labelText="modifier"
                    labelFixed={ true }
                    min={ -99 }
                    max={ 100 }
                    onChange={ updateModifier }
                />
            </View>
        );
    }
}
