import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { FlatList, StyleSheet } from 'react-native';
import LogItem from './LogItem';

export default class LogView extends PureComponent {
    static displayName = 'LogView'
    static propTypes = {
        items: PropTypes.arrayOf(PropTypes.object)
    }
    static defaultProps = {}

    render () {
        const { items } = this.props;
        return (
            <FlatList
                data={ items }
                keyExtractor={ (item, index) => index }
                renderItem={ ({item}) => <LogItem { ...item } /> }
            />
        );
    }
}
