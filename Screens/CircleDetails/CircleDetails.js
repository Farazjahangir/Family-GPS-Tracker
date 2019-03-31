import React, { Component } from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'

import {
    Spinner,
    List,
    ListItem,
    Body,
    Thumbnail,
    Left,
    Text
} from 'native-base'
import { connect } from 'react-redux'

import CustomHeader from '../../Components/CustomHeader/CustomHeader'
import CustomButton from '../../Components/CustomButton/CustomButton'
import { geetingCircleMembers } from '../../Config/Firebase/Firebase'

class CircleDetails extends Component {
    constructor() {
        super()
        this.state = {
            members: '',
            users: '',
            isLoading: true,
            admin: ''
        }
    }

    async componentDidMount() {
        const { 
            members, 
            circleName, 
            admin 
        } = this.props.navigation.state.params.circleObj

        this.setState({ circleName })
        try{
            const users = await geetingCircleMembers(members)
            this.setState({ users, isLoading: false, admin })
        }
        catch(e){
            console.log('Error' , e);    
        }
    }
    invitePeoples(){
        const { circleCode } = this.props.navigation.state.params.circleObj
        this.props.navigation.push('InviteScreen' , {circleCode})
    }
    render() {
        const { circleName, users, isLoading, admin } = this.state
        const { userUid } = this.props.userObj
        return (
            <View style={{flex:1}}>
                <CustomHeader title={circleName} backArrow />
                {isLoading &&
                    <View style={styles.loaderDiv}>
                        <Spinner color='blue' />
                    </View>
                }
                <ScrollView>
                <List style={{ marginTop: 20 }}>
                    {!!users &&
                        users.map((val) => {
                            return <ListItem thumbnail style={{marginTop : 20}}>
                                <Left>
                                    <Thumbnail square source={{ uri: val.profilePicUrl }} style={{ width: 80, height: 80 }} />
                                </Left>
                                <Body>
                                    <Text>{val.userName}</Text>
                                    <Text note>{val.userUid === admin ? 'Circle Owner' : 'Member'}</Text>
                                </Body>
                            </ListItem>
                        })
                    }
                </List>
                </ScrollView>
                {userUid === admin
                    &&
                    <View style={{flex : 1, justifyContent:"flex-end" , alignItems : 'flex-end' , padding : 10}}>
                        <CustomButton 
                            title={'+'} 
                            buttonStyle={styles.addBtn} 
                            textStyle={styles.addBtnText}  
                            onPress={()=>{this.invitePeoples()}}
                        />
                    </View>
                }
            </View>
        )
    }
}


const mapDispatchToProps = () => {
    return {}
  
  }
  const mapStateToProps = (state) => {
    return {
      userObj: state.authReducer.user
    }
  }

  export default connect(mapStateToProps, mapDispatchToProps)(CircleDetails)
  

const styles = StyleSheet.create({
    addBtn : {
        borderWidth : 1,
        borderColor : '#e74c3c',
        borderRadius : 100,
        backgroundColor : '#e74c3c',
        width : 60,
        alignItems:"center",
        justifyContent:"center",
        height : 60,
    },
    addBtnText : {
        fontSize : 35,
        color : '#fff'
    },
    loaderDiv: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        backgroundColor: '#fff',
        opacity: 0.6,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100
    },

})
