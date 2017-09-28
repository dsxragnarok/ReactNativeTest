import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import bindAll from 'lodash/bindAll';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import AddBox from 'material-ui/svg-icons/content/add-box';
import SubtractBox from 'material-ui/svg-icons/toggle/indeterminate-check-box';
import Switch from '../components/Switch';
import NumberSelect from '../components/NumberSelect';
import { types as dice, rollDieTypeNTimes } from '../modules/dice';

const style={
    margin: '.5em'
};
const iconStyle={
    width: 50,
    height: 50
};

export default class DiceBox extends PureComponent {
    static displayName = 'DiceBox';
    static propTypes = {
        diceTypes: PropTypes.arrayOf(PropTypes.string),
        rollDiceCallback: PropTypes.func.isRequired
    }

    constructor (props) {
        super(props);

        this.state = {
            nDice: 1,
            modifier: 0,
            operator: '+'
        };

        bindAll(this, [
            'updateDiceCount',
            'updateModifier',
            'updateOperator',
            'rollDice'
        ]);
    }

    updateDiceCount (n) {
        this.setState({ ...this.state, nDice: n });
    }

    updateModifier (n) {
        this.setState({ ...this.state, modifier: n });
    }

    updateOperator (switchState) {
        this.setState({
            ...this.state,
            operator: switchState ? '-'  : '+'
        });
    }

    rollDice (die) {
        const { rollDiceCallback } = this.props;
        const { nDice, operator, modifier } = this.state;
        const rolls = rollDieTypeNTimes(nDice, dice[die]);
        const mod = (operator === '-' ? -1 : 1) * modifier;

        const results = {
            die,
            rolls,
            n: nDice,
            modifier: mod,
            total: rolls.reduce((sum, val) => sum + val, 0) + mod
        };

        rollDiceCallback(results);
    }

    render () {
        const { diceTypes } = this.props;
        const { updateDiceCount, updateModifier, updateOperator, rollDice } = this;

        return (
            <div style={ style }>
                <NumberSelect
                    id="dice-count"
                    labelText="n"
                    labelFixed={ true }
                    min={ 1 }
                    max={ 100 }
                    style={ style }
                    onChange={ updateDiceCount }
                />
                { diceTypes &&
                    diceTypes.map((die) =>
                        <FloatingActionButton
                            style={{ ...style, verticalAlign: 'text-bottom' }}
                            key={ die }
                            mini={ true }
                            onClick={ () => rollDice(die) }
                        >
                        { die }
                        </FloatingActionButton>
                    )
                }
                <Switch
                    id="mod-toggle"
                    OnIcon={ <SubtractBox style={ iconStyle } /> }
                    OffIcon={ <AddBox style={ iconStyle } /> }
                    style={ style }
                    onClick={ updateOperator }
                />
                <NumberSelect
                    id="modifier"
                    labelText="modifier"
                    labelFixed={ true }
                    min={ 0 }
                    max={ 100 }
                    style={ style }
                    onChange={ updateModifier }
                />
            </div>
        );
    }
}
