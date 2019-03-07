import React, { Component } from 'react'
import { Text, View, Image, StyleSheet } from 'react-native'
import CustomHeader from '../../Components/CustomHeader/CustomHeader'
import CustomButton from '../../Components/CustomButton/CustomButton'

export default class InviteScreen extends Component {
  render() {
      const circleCode = this.props.navigation.state.params.circleCode
    return (
      <View style={{flex : 1}}>
        <CustomHeader title={'Invite Peoples'} backArrow />
        
        <View style={styles.container}>
            <Image
                source={require('../../assets/icons/add-group.png')}
                style={styles.addIcon}
            />
            <Text style={styles.text}>
                Send this code with people you want to join your circle
            </Text>
            <Text>{circleCode}</Text>
            <CustomButton 
                title={'Send'}
                buttonStyle={styles.sendBtn}
                textStyle={styles.sendBtnText}
            />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container : {
        flex: 1, 
        alignItems :"center", 
        justifyContent : 'center',
    },
    addIcon : {
        width : 170,
        height : 170
    },
    text : {
        fontSize : 22,
        color : '#7f8fa6',
        marginTop : 30,
        textAlign : 'center'
    },
    sendBtn : {
        backgroundColor : '#eb4d4b',
        borderWidth : 1,
        borderColor : '#eb4d4b',
        borderRadius : 15,
        width : 130,
        marginTop : 15
    },
    sendBtnText : {
        color : '#fff',
        padding : 5,
        fontSize : 19,
        textAlign : 'center'
    }
})
