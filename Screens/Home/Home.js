import React, { Component } from 'react'
import { View, ScrollView, Image, StyleSheet } from 'react-native'
import {
  List,
  ListItem,
  Left,
  Body,
  Right,
  Thumbnail,
  Text,
  Item,
  Picker
} from 'native-base';
import { connect } from 'react-redux'
import MapView from 'react-native-maps';

import CustomHeader from '../../Components/CustomHeader/CustomHeader'
import CustomButton from '../../Components/CustomButton/CustomButton'
import markerPng from '../../assets/icons/marker.png'

import { firebase, gettingUsersPushTokens } from '../../Config/Firebase/Firebase'
import { sendingPushNotification } from '../../helper'
class Home extends Component {
  constructor() {
    super()
    this.state = {
      userObj: '',
      selectedCircle: '',
      userCircles: [],
      circlesList: false
    }
  }

  componentDidMount() {

    if (this.props.userObj) {
      console.log('componentDidMount');

      this.setState({ userObj: this.props.userObj }, () => {
        this.gettingCircles()
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.userObj) {
      console.log('componentWillReceiveProps');

      this.setState({ userObj: nextProps.userObj }, () => {
        this.gettingCircles()
      })
    }
  }

  gettingCircles = () => {
    console.log('gettingCircles', this.state);

    const db = firebase.firestore()
    const { userUid } = this.state.userObj
    const { userCircles } = this.state
    console.log('UserUid', userUid);


    try {
      db.collection('Circles').where('members', 'array-contains', userUid)
        .onSnapshot((snapshot) => {
          const circlesArr = []
          snapshot.forEach((change) => {
            circlesArr.push(change.data())
          })
          console.log('CirclesArr', circlesArr);
          this.setState({ userCircles: circlesArr, isLoading: false, circlesList: true })

        })
    }
    catch (e) {
      this.setState({ errorMessage: e, isLoading: false })
      console.log('CAtch==>', e);

    }
  }

  sendNotification(){
    const { selectedCircle, userObj } = this.state

    gettingUsersPushTokens(selectedCircle , userObj.userUid).then((pushTokens)=>{
      console.log('pushTokens' , pushTokens);
      
      const sent = sendingPushNotification(pushTokens , userObj.userName)
      
    })
  }


  render() {
    const { userObj, selectedCircle, userCircles, circlesList } = this.state
    let coords = {
      latitude: userObj.lat, longitude: userObj.long
    }
    console.log('This.State===>', this.state);

    return (
      <View style={{ flex: 1 }}>
        <CustomHeader title="Home" addCircleIcon />
        <View style={styles.pickerContainer}>
          <Item picker style={{ width: '90%', }}>
            <Picker
              mode='dropdown'
              selectedValue={selectedCircle}
              onValueChange={(itemValue) => { this.setState({ selectedCircle: itemValue }) }}
            >
              {!!circlesList ? userCircles.map((val , i) =>
                <Picker.Item label={val.circleName} value={val.circleName} key={i} />
              )
                :
                <Picker.Item label='Fetching Circles' value='Fetching Circles' />
              }
            </Picker>
          </Item>
          <CustomButton 
            title="Help" 
            buttonStyle={styles.helpBtn} 
            textStyle={styles.helpBtnText}
            onPress = {()=>{this.sendNotification()}} 
          />
        </View>


        {!!userObj &&
          <MapView
            initialRegion={{
              latitude: userObj.lat,
              longitude: userObj.long,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            style={{ flex: 0.75 }}
          >
            <MapView.Marker
              coordinate={coords}
              title="My Marker"
              description="Some description"
            >
              <View
                style={{
                  width: 60,
                  height: 60,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Image
                  source={markerPng}
                  style={{ width: 50, height: 50 }}
                // resizeMode="contain"
                />
                <View style={{ position: "absolute", top: 10 }}>
                  <Image
                    source={{ uri: userObj.profilePicUrl }}
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: 10
                    }}
                  />
                </View>
              </View>
            </MapView.Marker>
          </MapView>
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
export default connect(mapStateToProps, mapDispatchToProps)(Home)


const styles = StyleSheet.create({
  pickerContainer: {
    flex: 0.25,
    alignItems: 'flex-start',
    marginTop: 15,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  helpBtn : {
    backgroundColor : '#eb2f06',
    borderWidth : 1,
    borderColor : '#eb2f06',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop : 8,
    borderRadius : 15,
    width : 120,
  },
  helpBtnText : {
    color : '#fff',
    padding : 4,
    fontSize : 19,
    textAlign : 'center'
  }
})