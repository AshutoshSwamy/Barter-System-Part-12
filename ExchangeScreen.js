import React, { Component } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity,TextInput, Alert, ScrollView, Modal, KeyboardAvoidingView } from 'react-native';
import db from '../config';
import firebase from 'firebase';
import MyHeader from '../components/MyHeader';

export default class ExchangeScreen extends Component {

    constructor(){

        super()
        this.state = {
            objectName : "",
            reasonToBarter : "",
            userId : firebase.auth().currentUser.email
        }
    }

    createUniqueId(){

        return Math.random().toString(36).substring(7)
    }

    addRequest = (objectName, reasonToBarter)=>{
        var userId = this.state.userId
        var randomRequestId = this.createUniqueId()
        db.collection("barterRequests").add({
            userId : userId,
            objectName : objectName,
            reasonToBarter : reasonToBarter,
            requestId : randomRequestId
        })

        this.setState({
            objectName : "",
            reasonToBarter : ""
        })
        return alert("Your Barter Deal Was Successfull")
    }

    render(){

        return(

            <View>
                <MyHeader title = "Barter Here"/>

                <KeyboardAvoidingView>
                    <TextInput style = {styles.formTextInput}
                    placeholder = "Enter Object Name"
                    onChangeText = {(text)=>{
                        this.setState({
                            objectName : text
                        })
                    }}
                    value = {this.state.objectName}
                    
                    />

<TextInput style = {[styles.formTextInput, {height : 300}]}
                    placeholder = "Why do you need the object ?"
                    multiline = {true}
                    numberOfLines = {10}
                    onChangeText = {(text)=>{
                        this.setState({
                            reasonToBarter : text
                        })
                    }}
                    value = {this.state.reasonToBarter}

                    
                    />

                    <TouchableOpacity style = {styles.button}
                    onPress = {()=>{
                        this.addRequest(this.state.objectName , this.state.reasonToBarter)
                    }}
                    
                    >
                        <Text> Barter </Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </View>
        )
    }
}

const styles = StyleSheet.create({

    formTextInput : {
        borderWidth : 1,
        width : '75%',
        height : 35,
        padding : 10
    },

    button : {
        width : "75%",
        height : 50,
        borderRadius : 10,
        justifyContent : "center",
        alignItems : "center",
        backgroundColor : "#FF5722",
        marginTop : 20,
    }
})




