import React, { Component } from 'react';
import {View, Text,TouchableOpacity,ScrollView,FlatList,StyleSheet, SnapshotViewIOS} from 'react-native';
import {Icon,ListItem} from 'react-native-elements'
import MyHeader from '../components/MyHeader.js'
import firebase from 'firebase';
import db from '../config.js';
import SwipableFlatList from '../components/SwipeableFlatList'

export default class NotificationScreen extends  Component {

    constructor(props){

        super(props);

        this.state = {
            userId  : firebase.auth().currentUser.email,
            allNotifications : []
        }

        this.notificationRef = null
    }

    getNotifications = ()=>{
        this.notificationRef = db.collection('notifications').where('notificationStatus', '==', 'unread')
        .where('targetedUserId', '==', this.state.userId)
        .onSnapshot((snapshot)=>{
            var allNotifications = []
            snapshot.docs.map((doc)=>{
                var notification = doc.data()
                notification['docId']=doc.id
                allNotifications.push(notification)
            })

            this.setState({
                allNotifications : allNotifications,
            })
        })
        
    }

    componentDidMount(){
        this.getNotifications()
    }

    componentWillUnmount(){
        this.notificationRef = null
    }

    keyExtractor = (item , index)=>index.toString()
    renderItems = ({item , index})=>{
        return(

            <ListItem
                key = {index}
                leftElement = {<Icon name = "book" type = "font-awesome" color = "#696969"/>}
                title = {item.bookName}
                titleStyle = {{color : "black" , fontWeight : "bold"}}
                subtitle = {item.message}
                bottomDivider
            />
        )
    }

    render(){
        return(
            <View style = {{ flex : 1}}>
                <View style = {{flex : 0.1}}>
                    <MyHeader title = {"Notifications"} navigation = {this.props.navigation}/>      
                    </View>
                    <View style = {{flex : 0.9}}>
                        {
                            this.state.allNotifications.length === 0
                            ?(
                                <View style = {{flex : 1 , justifyContent : 'center' , alignItems : 'center'}}>
                                    <Text style = {{fontSize : 25}}>
                                        You Have No Notifications
                                    </Text>
                                </View>
                            )
                            :(
                                <SwipableFlatList allNotifications = {this.state.allNotifications}/>
                            )
                        }
                    </View>          
            </View>
        )
    }
}