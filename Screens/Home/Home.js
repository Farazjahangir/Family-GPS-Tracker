import React, { Component } from 'react'
import {  View, ScrollView } from 'react-native'
import { 
  Container, 
  Content, 
  List, 
  ListItem, 
  Left, 
  Body, 
  Right, 
  Thumbnail, 
  Text 
} from 'native-base';
import { connect } from 'react-redux'
import MapView from 'react-native-maps';

import CustomHeader from '../../Components/CustomHeader/CustomHeader'

class Home extends Component {
  constructor(){
    super()
    this.state = {
      userObj : ''
    }
  }

  componentDidMount(){
    console.log('Home');
    
    if(this.props.userObj){
        this.setState({userObj : this.props.userObj})
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.userObj){
        this.setState({userObj : nextProps.userObj})
    }
  }
  render() {
    const { userObj } = this.state
    console.log('Longitude' , userObj.long);
    console.log('Latitude' , userObj.lat);
    
    return (
      <View style={{flex: 1}}>
        <CustomHeader title="Home" addCircleIcon />
          {!!userObj && 
            <MapView 
            initialRegion={{
              latitude: userObj.lat ,
              longitude: userObj.long,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
              }}
              style={{flex : 0.7}}
            />
          }
            <View style={{flex : 0.3}}>
          <ScrollView vertical={true} >
            <List>
              <ListItem avatar>
                <Left>
                  <Thumbnail source={require('../../assets/images/dummyProfile.png')} />
                </Left>
                <Body>
                  <Text>Kumar Pratik</Text>
                  <Text note>Doing what you like will always keep you happy . .</Text>
                </Body>
                <Right>
                  <Text note>3:43 pm</Text>
                </Right>
              </ListItem>
              <ListItem avatar>
                <Left>
                  <Thumbnail source={require('../../assets/images/dummyProfile.png')} />
                </Left>
                <Body>
                  <Text>Kumar Pratik</Text>
                  <Text note>Doing what you like will always keep you happy . .</Text>
                </Body>
                <Right>
                  <Text note>3:43 pm</Text>
                </Right>
              </ListItem>
              <ListItem avatar>
                <Left>
                  <Thumbnail source={require('../../assets/images/dummyProfile.png')} />
                </Left>
                <Body>
                  <Text>Kumar Pratik</Text>
                  <Text note>Doing what you like will always keep you happy . .</Text>
                </Body>
                <Right>
                  <Text note>3:43 pm</Text>
                </Right>
              </ListItem>

              </List>
          </ScrollView>
            </View>
      </View>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}
const mapStateToProps = (state) => {

  return {
      userObj : state.authReducer.user
  }
}
export default connect(mapStateToProps , mapDispatchToProps)(Home)
