import React, { Component } from 'react';
import { View } from 'react-native';
import Navigator from './Config/Routes/router'
import { store } from './Redux/store'
import { Provider } from 'react-redux'

export default class App extends Component {
  render() {
    console.disableYellowBox = true
    return (
      <Provider store={store}>
        <Navigator />
      </Provider>
    );
  }
}