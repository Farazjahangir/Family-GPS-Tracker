import React, { Component } from 'react';
import { View } from 'react-native';
import Navigator from './Config/Routes/Routes'
import { store } from './Redux/store'
import { Provider } from 'react-redux'
import { Font } from 'expo'

export default class App extends Component {

  constructor(){
    super()
    this.state = {
      fontLoad : false
    }
  }

  async componentDidMount() {
    try{
      await Font.loadAsync({
        'Roboto_medium': require("native-base/Fonts/Roboto_medium.ttf")
      });
      this.setState({fontLoad : true})
    }
    catch(e){
      console.log(e);  
    }
  }
  render() {
    const { fontLoad } = this.state
    console.disableYellowBox = true
    return (
        fontLoad &&
        <Provider store={store}>
          <Navigator />
        </Provider>
    );
  }
}