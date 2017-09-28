import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Switch from './components/Switch';
import NumberSelect from './components/NumberSelect';

export default class App extends Component {
   render () {
      return (
         <View>
            <Text>I am the winner!</Text>
            <Switch />
            <NumberSelect min={ 1 } max={ 20 } />
         </View>
      );
   }
}
