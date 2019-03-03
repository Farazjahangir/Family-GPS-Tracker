import React, { Component } from 'react'
import { Text, View } from 'react-native'
import {  
    StyleSheet, 
    Image , 
    TouchableOpacity 
} from 'react-native'

import { 
    Header, 
    Icon, 
    Button, 
    Title, 
    Left, 
    Body, 
    Right 
} from 'native-base';

import { withNavigation } from 'react-navigation'

class CustomHeader extends Component {
    render(){
        return(
            <Header style={{marginTop : 25 , backgroundColor : '#fff'}}>
            <Left>
                {this.props.backArrow
                ?
                <Button transparent>
                  <Icon name='arrow-back' style={{color : 'black'}} onPress={()=>{this.props.navigation.goBack()}} />
                </Button>
                :
                <TouchableOpacity onPress={()=>{this.props.navigation.toggleDrawer()}}>
                    <Image source={require('../../assets/icons/menuIcon.png')} style={{width : 30 , height : 30}} />
                </TouchableOpacity>
                }
            </Left>
            <Body style={{flexDirection : 'row' , justifyContent : 'center'}}>
                <Title style={{color : 'black'}}>{this.props.title}</Title>
            </Body>
            <Right>
                <TouchableOpacity
                    // onPress = {()=>{this.logout()}}      
                    // style={{marginBottom : 10}}
                >
                <Image 
                    source={require('../../assets/icons/logoutIcon.png')} 
                    style={{width : 40 , height : 40}} 
                    />
                </TouchableOpacity>
            </Right>
        </Header>
        )
    }
}

export default withNavigation(CustomHeader)