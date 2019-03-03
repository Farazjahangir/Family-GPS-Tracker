import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { Item , Input, Label } from 'native-base'

import CustomButton from '../../Components/CustomButton/CustomButton'
import CustomHeader from '../../Components/CustomHeader/CustomHeader'
import { creatingCircle } from '../../Config/Firebase/Firebase'
import { createRandomString } from '../../helper'

export default class CreateCircle extends Component {
    constructor(){
        super()
        this.state = {
            circleName : ''
        }
    }

    async createCircle(){
        const circleName = this.state.circleName
        const circleCode = createRandomString()
        circleObj = {
            circleName,
            circleCode
        }
        const result = await creatingCircle(circleObj)
        console.log('Result' , result);
        
        
    }

  render() {
    return (
      <View style={{flex : 1}}>
            <CustomHeader title={'Create Circle'} backArrow />
        <View style={styles.container}>
            <Item floatingLabel style={{width : 230}}>
                <Label>Circle Name</Label>
                <Input 
                    onChange={(e) => { this.setState({ circleName: e.nativeEvent.text }) }} 
                />
            </Item>
            <View style={{alignItems : 'center'}}>
                <CustomButton 
                    title={'Create'}
                    buttonStyle = {styles.createButton}
                textStyle = {styles.createButtonText}
                onPress = {()=>{this.createCircle()}}
                />
            </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center'
    },
    createButton: {
        marginTop: 15,
        borderWidth: 2,
        borderColor: '#EA2027',
        borderRadius: 10,
        backgroundColor: '#EA2027',
        width: 120,
        padding: 10,
        alignItems : 'center'
    },
    createButtonText: {
        color: '#fff',
        fontSize: 15
    }
});    

