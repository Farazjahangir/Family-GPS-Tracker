import React, { Component } from 'react'
import { Text, View } from 'react-native'

export default class CircleDetails extends Component {

    componentDidMount(){
        console.log("circleDetails" , this.props.navigation.state.params.circleObj);
        
    }
  render() {
    return (
      <View>
        <Text> textInComponent </Text>
      </View>
    )
  }
}
