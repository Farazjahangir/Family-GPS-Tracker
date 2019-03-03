import React, { Component } from 'react'
import {
    Text,
    View,
    StyleSheet
} from 'react-native'

import CustomButton from '../../Components/CustomButton/CustomButton'
import { loginWithFacebook } from '../../Config/Firebase/Firebase'
export default class Login extends Component {

    static navigationOptions = {
        header : null
    }

    async login(){
        const userObj = await loginWithFacebook()   
        this.props.navigation.push('SavingProfile' , {userObj})
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.heading}>Family GPS Tracker</Text>
                <CustomButton 
                    title={'Login With Facebook'} 
                    buttonStyle={styles.loginButton} 
                    textStyle={styles.loginBtnText} 
                    onPress={()=>{this.login()}}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    heading : {
        fontSize : 30,
    },
    loginButton : {
        backgroundColor : '#3742fa',
        borderWidth : 2,
        borderColor : '#3742fa',
        width : 220,
        borderRadius : 15,
        marginTop : 15,
        alignItems : 'center'
    },
    loginBtnText : {
        padding : 10,
        fontSize : 20,
        color : '#fff'
    }
});

