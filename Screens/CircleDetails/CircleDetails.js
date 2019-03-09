import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'

import {
    Spinner,
    List,
    ListItem,
    Body,
    Thumbnail,
    Left,
    Text
} from 'native-base'

import CustomHeader from '../../Components/CustomHeader/CustomHeader'
import CustomButton from '../../Components/CustomButton/CustomButton'
import { geetingCircleMembers } from '../../Config/Firebase/Firebase'

export default class CircleDetails extends Component {
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
        const { members, circleName, admin } = this.props.navigation.state.params.circleObj
        this.setState({ circleName })
        geetingCircleMembers(members).then((users) => {
            this.setState({ users, isLoading: false, admin })
        })
    }
    invitePeoples(){
        const { circleCode } = this.props.navigation.state.params.circleObj
        console.log('InvitingCode' ,circleCode );
        

        this.props.navigation.push('InviteScreen' , {circleCode})
    }
    render() {
        const { members, circleName, users, isLoading, admin } = this.state
        return (
            <View style={{flex:1}}>
                <CustomHeader title={circleName} backArrow />
                {!!isLoading && <Spinner color='blue' />}
                <List style={{ marginTop: 20 }}>
                    {!!users &&
                        users.map((val) => {
                            return <ListItem thumbnail>
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
                    <View style={{flex : 1, justifyContent:"flex-end" , alignItems : 'flex-end' , padding : 10}}>
                        <CustomButton 
                            title={'+'} 
                            buttonStyle={styles.addBtn} 
                            textStyle={styles.addBtnText}  
                            onPress={()=>{this.invitePeoples()}}
                        />
                    </View>
            </View>
        )
    }
}

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
    }
})
