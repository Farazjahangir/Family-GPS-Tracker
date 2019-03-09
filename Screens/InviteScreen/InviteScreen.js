import React, { Component } from 'react'
import { Text, View, Image, StyleSheet } from 'react-native'
import { Form, Item, Input, Label } from 'native-base';

import CustomHeader from '../../Components/CustomHeader/CustomHeader'
import CustomButton from '../../Components/CustomButton/CustomButton'

export default class InviteScreen extends Component {
    constructor(){
        super()
        this.state = {
            number : '+92',
            circleCode : null
        }
    }

    componentDidMount(){
        const circleCode = this.props.navigation.state.params.circleCode
        this.setState({circleCode})
    }

    sendCode(){
        const { circleCode , number } = this.state

        fetch('https://family-tracking-sms-service.herokuapp.com/sms' , {
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "application/json"                
            },
            method : 'POST',
            body : JSON.stringify({
                subject :  `Use this code '${circleCode}' to add in a circle and track your family and friends`,
                to : number
            })
        })
    }
  render() {
      const { number , circleCode } = this.state
      console.log('Number' , number);
      
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
            <Text style={styles.circleCode}>{circleCode}</Text>
            <Form>
            <Item floatingLabel   style={{ width: '60%' }}>
              <Label>Write Phone Number</Label>
              <Input
                value={number}
                keyboardType={'number-pad'}
                maxLength={13}
                onChange={(e) => { this.setState({ number : e.nativeEvent.text }) }}
              />
            </Item>
            </Form>
            <CustomButton 
                title={'Send'}
                buttonStyle={styles.sendBtn}
                textStyle={styles.sendBtnText}
                onPress={()=>{this.sendCode()}}
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
        width :140,
        height :140
    },
    text : {
        fontSize : 19,
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
    },
    circleCode : {
        fontSize : 25,
        color :  '#7f8fa6',
        paddingTop : 9,
        fontWeight : '400'
    }
})
