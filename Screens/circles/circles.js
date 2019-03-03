import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'

import CustomHeader from '../../Components/CustomHeader/CustomHeader'
import CustomButton from '../../Components/CustomButton/CustomButton'


class circles extends Component {
  render() {
    return (
      <View>
        <CustomHeader title="Circles" msgIcon addCircleIcon />
        <View style={{alignItems : 'center'}}>
            <CustomButton 
                    title={'Create Circle'}  
                    buttonStyle = {styles.createBtn}
                    textStyle = {styles.createBtnText}
                    onPress = {()=>{this.props.navigation.push('CreateCirlce')}}
                />
        </View>
      </View>
    )
  }
}

export default circles



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    createBtn : {
        backgroundColor : '#EA2027',
        borderWidth : 2,
        borderColor : '#EA2027',
        width : 220,
        borderRadius : 15,
        marginTop : 15,
        alignItems : 'center'
    },
   createBtnText : {
        padding : 10,
        fontSize : 20,
        color : '#fff'
    }
});

