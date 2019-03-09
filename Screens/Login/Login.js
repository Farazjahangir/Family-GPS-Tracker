import React, { Component } from 'react'
import {
    Text,
    View,
    StyleSheet
} from 'react-native'

import CustomButton from '../../Components/CustomButton/CustomButton'
import { loginWithFacebook, checkingUserProfile } from '../../Config/Firebase/Firebase'
import { connect } from 'react-redux'
import { loginUser } from '../../Redux/actions/authActions'

class Login extends Component {

    static navigationOptions = {
        header : null
    }

    componentDidMount(){
        console.log('Login' , this.props);
        if(this.props.userObj){
            this.props.navigation.replace('Home')
        }
    }

    componentWillReceiveProps(nextProps){
        console.log('Login_Next' , nextProps);
        if(nextProps.userObj){
            nextProps.navigation.replace('Home')
        } 
    }

    async login(){
        const userObj = await loginWithFacebook() 
        let checkingUser = await checkingUserProfile()

        if (checkingUser.exists) {
            checkingUser =  checkingUser.data()
            this.props.loginUser(checkingUser)
            this.props.navigation.replace('Home')
            this.setState({isLoading : false})
        }  
        else{
            this.props.navigation.push('SavingProfile' , {userObj})
        }
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

const mapDispatchToProps = (dispatch) => {
    return {
        loginUser: (userData) => dispatch(loginUser(userData))
    }
}
const mapStateToProps = (state) => {
    console.log('Login_mapState' , state);
    
    return {
        userObj : state.authReducer.user
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)


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

