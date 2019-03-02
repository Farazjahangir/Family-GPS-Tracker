import React, { Component } from 'react';
import { View } from 'react-native';
import Navigator from './Config/Routes/Routes'

export default class App extends Component {
  render() {
    console.disableYellowBox = true
    return (
      <Navigator />
    );
  }
}