import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { Form, Item, Input, Label, Spinner } from 'native-base';
import { addingUserInCircle } from '../../Config/Firebase/Firebase'
import CustomHeader from '../../Components/CustomHeader/CustomHeader'
import CustomButton from '../../Components/CustomButton/CustomButton'
import { connect } from 'react-redux'

class JoinCircle extends Component {
    constructor(){
        super()
        this.state = {
            circleCode : '',
        }
    }

    async addInCircle(){
        const { circleCode } = this.state
        const { userUid } = this.props.userObj

        try{
            const result = await addingUserInCircle(circleCode , userUid)
        }
        catch(e){
            console.log("Error" , e);
            
        }
    }
  render() {
      const { circleCode } = this.state
    return (
      <View style={{flex : 1}}>
        <CustomHeader title={'Join Circle'} backArrow />
        <View style={styles.container}>
            <Text style={styles.text}>Please , enter valid invite code</Text>
            <Form>
                <Item floatingLabel style={{ width: '60%' }}>
                    <Label>Write Phone Number</Label>
                    <Input
                        value={circleCode}
                        onChange={(e) => { this.setState({ circleCode: e.nativeEvent.text }) }}
                    />
                </Item>
            </Form>
            <CustomButton 
                title={'Submit'}
                buttonStyle={styles.submitBtn}
                textStyle={styles.submitBtnText}
                onPress = {()=>{this.addInCircle()}}
            />
            <Text style={styles.note}>Ask circel code to circel admin</Text>
        </View>
      </View>
    )
  }
}

const mapDispatchToProps = () => {
    return {}

}
const mapStateToProps = (state) => {

    return {
        userObj : state.authReducer.user
    }
}


export default connect(mapStateToProps , mapDispatchToProps)(JoinCircle)


const styles = StyleSheet.create({
    container : {
        flex : 1,
        alignItems : 'center',
        justifyContent : 'center'
    },
    text : {
        fontSize : 22,
        textAlign : 'center',
        color : '#7f8c8d',
        fontWeight : '600'
    },
    submitBtn : {
        backgroundColor : '#e74c3c',
        borderWidth : 2,
        borderRadius : 25,
        width :'60%',
        borderColor : '#e74c3c',
        marginTop : 15
    },
    submitBtnText : {
        color : '#fff',
        padding : 8,
        fontSize : 19,
        textAlign : 'center'
    },
    note : {
        color : '#7f8c8d',
        textAlign : 'center',
        fontSize : 19,
        marginTop : 15,
        fontWeight : '600'
    }
})