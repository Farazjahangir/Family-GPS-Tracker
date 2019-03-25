import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { Form, Item, Input, Label, Spinner } from 'native-base';
import { connect } from 'react-redux'

import { addingUserInCircle } from '../../Config/Firebase/Firebase'
import CustomHeader from '../../Components/CustomHeader/CustomHeader'
import CustomButton from '../../Components/CustomButton/CustomButton'

class JoinCircle extends Component {
    constructor(){
        super()
        this.state = {
            circleCode : '',
            isLoading : false
        }
    }

    async addInCircle(){
        const { circleCode } = this.state
        const { userUid } = this.props.userObj
        this.setState({isLoading : true})
        if(circleCode === ''){
            alert('Write Your Circle Code')
            this.setState({isLoading : false})
            return
        }
        try{
            const result = await addingUserInCircle(circleCode , userUid)
            console.log('REsult' , result);
            
            this.setState({isLoading : false})
            alert(result)
        }
        catch(e){
            this.setState({isLoading : false})
            alert(e)
        }
    }
  render() {
      const { circleCode, isLoading } = this.state
    return (
      <View style={{flex : 1}}>
        <CustomHeader title={'Join Circle'} backArrow />
        {isLoading &&
        <View style={styles.loaderDiv}>
            <Spinner color='blue' />
        </View>
        }
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
        justifyContent : 'center',
        opacity : 0.6

    },
    text : {
        fontSize : 22,
        textAlign : 'center',
        color : '#353b48',
        fontWeight : '600'
    },
    submitBtn : {
        backgroundColor : '#eb2f06',
        borderWidth : 2,
        borderRadius : 25,
        width :'60%',
        borderColor : '#eb2f06',
        marginTop : 15
    },
    submitBtnText : {
        color : '#fff',
        padding : 8,
        fontSize : 19,
        textAlign : 'center'
    },
    note : {
        color : '#353b48',
        textAlign : 'center',
        fontSize : 19,
        marginTop : 15,
        fontWeight : '600'
    },
    loaderDiv : {
        position : 'absolute',
        height : '100%',
        width : '100%',
        backgroundColor : '#fff',
        opacity : 0.6,
        alignItems : 'center',
        justifyContent : 'center',
        zIndex : 100
    },
})