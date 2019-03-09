import React, { Component } from 'react'
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native'

import {
  Spinner,
  List,
  ListItem,
  Text,
  Left,
  Body,
  Thumbnail,
  Right,
  Icon
} from 'native-base'

import CustomHeader from '../../Components/CustomHeader/CustomHeader'
import CustomButton from '../../Components/CustomButton/CustomButton'
import { gettingCircles } from '../../Config/Firebase/Firebase'


class circles extends Component {
  constructor() {
    super()
    this.state = {
      isLoading: true,
      userCircles: '',
      errorMessage: ''
    }
  }

  async componentDidMount() {
    try {
      const circlesArr = await gettingCircles()
      console.log('circlesArr' , circlesArr);
      
      this.setState({ isLoading: false, userCircles: circlesArr })
    }
    catch (e) {
      this.setState({ errorMessage: e, isLoading: false })
    }

  }
  render() {
    const { isLoading, userCircles, errorMessage } = this.state
    return (
      <View>
        <CustomHeader title="Circles" addCircleIcon />
        <View style={{ alignItems: 'center' }}>
          <CustomButton
            title={'Create Circle'}
            buttonStyle={styles.createBtn}
            textStyle={styles.createBtnText}
            onPress={() => { this.props.navigation.push('CreateCirlce') }}
          />
        </View>
        {!!isLoading && <Spinner color='blue' />}

        <List style={{ marginTop: 30 }}>
          {!!userCircles &&
            userCircles.map((val, i) => {
              return <ListItem avatar key={i}>
                  <Left>
                    <Thumbnail source={require('../../assets/icons/user.png')} style={{ width: 20, height: 20 }} />
                    <Text>{val.members.length}</Text>
                  </Left>
                  <Body>
                    <Text>{val.circleName}</Text>
                  </Body>
                  <Right>
                    <TouchableOpacity onPress = {()=>{this.props.navigation.push('CircleDetails' ,  {circleObj : val})}}>
                      <Image source = {require('../../assets/icons/rightArrow.png')} style={{width : 30, height : 30}} />
                    </TouchableOpacity>
                  </Right>
                </ListItem>
               
            })
          }
        </List>

        {!!errorMessage && <Text style={{ color: 'red', fontSize: 17 }}>{errorMessage}</Text>}
      </View>
    )
  }
}

export default circles



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  createBtn: {
    backgroundColor: '#EA2027',
    borderWidth: 2,
    borderColor: '#EA2027',
    width: 220,
    borderRadius: 15,
    marginTop: 15,
    alignItems: 'center'
  },
  createBtnText: {
    padding: 8,
    fontSize: 14,
    color: '#fff'
  }
});
