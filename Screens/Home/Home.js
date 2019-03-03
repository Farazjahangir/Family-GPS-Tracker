import React, { Component } from 'react'
import { Text, View } from 'react-native'

import CustomHeader from '../../Components/CustomHeader/CustomHeader'

export default class Home extends Component {
  render() {
    return (
      <View>
        <CustomHeader title="Home" />
      </View>
    )
  }
}
