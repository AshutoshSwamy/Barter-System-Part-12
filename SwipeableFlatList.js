const { Component } = require("react")

import React, {Component} from 'react';
import {Animated , Dimensions , StyleSheet , Text, View, TouchableOpacity} from 'react-native';
import {ListItem , Icon} from 'react-native-elements';
import {SwipeListView} from 'react-native-swipe-list-view';
import db from '../config';

export default class SwipeableFlatList extends Component{

 constructor(props){
  super(props);
  this.state = {
   allNotifications : this.props.allNotifications
  }
 }

 updateMarkAsRead = (notification)=>{
  db.collection('allNotifications').doc(notification.docId).update({
   notificationStatus : "read"
  })
 }
 onSwipeValueChange = (swipeData)=>{
  var allNotifications = this.state.allNotifications
  const{key , value} = swipeData
  if (value > -Dimensions.get('window').width) {
   const newData = [...allNotifications]
   const previousIndex = allNotifications.findIndex(item=>item.key === key)
   this.updateMarkAsRead(allNotifications[previousIndex])
   newData.splice(previousIndex , 1)
   this.setState({
    allNotifications : newData
   })
  }
 }
 renderItem = (data)=>{
  <ListItem
  leftElement = {<Icon name = "book" type = "fotn-awesome" color = "#696969" />}
  title = {data.item.bookName}
  titleStyle = {{color : "black" , fontWeight : "bold"}}
  subtitle = {data.item.message}
  bottomDivider
  />
 }
 renderHiddenItem = ()=>{
  <View style = {styles.rowBack}>
  <View style = {[styles.backRight , styles.backRightButton]}>
    <Text style = {styles.backTextWhite}>
    </Text>
   </View>
  </View>
 }
 render(){
  return(
   <View style = {styles.container}>
    <SwipeListView
    disableRightSwipe
    data = {this.state.allNotifications}
    renderItem = {this.renderItem}
    renderHiddenItem = {this.renderHiddenItem}
    rightOpenValue = {-Dimensions.get("window").width}
    previewRowKey = {0}
    previewOpenValue = {-40}
    previewOpenDelay = {3000}
    onSwipeValueChange = {this.onSwipeValueChange} 
    />
   </View>
  )
 }
}

const styles = StyleSheet.create({

})