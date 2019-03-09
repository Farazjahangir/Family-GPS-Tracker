import React, { Component } from 'react'
import { connect } from 'react-redux'
import {  
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

import { logoutUser } from '../../Redux/actions/authActions'
import { withNavigation } from 'react-navigation'

class CustomHeader extends Component {

    logout(){
        this.props.logoutUser()
        this.props.navigation.replace('Login')
    }      
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
                {this.props.addCircleIcon &&
                <TouchableOpacity
                    onPress = {()=>{this.props.navigation.push('Circles')}}
                >
                <Image 
                    source={require('../../assets/icons/addCircle.png')} 
                    style={{width :40 , height :40 , marginRight : 20}} 
                    />
                </TouchableOpacity>
                }
                <TouchableOpacity
                    onPress = {()=>{this.logout()}}      
                    style={{marginBottom : 5}}
                >
                <Image 
                    source={require('../../assets/icons/logoutIcon.png')} 
                    style={{width : 30 , height : 30}} 
                    />
                </TouchableOpacity>
            </Right>
        </Header>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
      logoutUser: () => dispatch(logoutUser())
    }

}
const mapStateToProps = (state) => {

  return {}
}

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(CustomHeader))