import React, { Component } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity,TextInput, Alert, ScrollView, Modal, KeyboardAvoidingView } from 'react-native';
import db from '../config';
import firebase from 'firebase';
import MyHeader from '../components/MyHeader';

export default class RequestScreen extends Component {

    constructor(){

        super()
        this.state = {
            bookName : "",
            reasonToRequest : "",
            userId : firebase.auth().currentUser.email
        }
    }

    createUniqueId(){

        return Math.random().toString(36).substring(7)
    }

    addRequest = (bookName, reasonToRequest)=>{
        var userId = this.state.userId
        var randomRequestId = this.createUniqueId()
        db.collection("requestedBooks").add({
            userId : userId,
            bookName : bookName,
            reasonToRequest : reasonToRequest,
            requestId : randomRequestId
        })

        this.setState({
            bookName : "",
            reasonToRequest : ""
        })
        return alert("Book Request Successfull")
    }

    render(){

        return(

            <View>
                <MyHeader title = "Request Books"/>

                <KeyboardAvoidingView>
                    <TextInput style = {styles.formTextInput}
                    placeholder = "Enter Book Name"
                    onChangeText = {(text)=>{
                        this.setState({
                            bookName : text
                        })
                    }}
                    value = {this.state.bookName}
                    
                    />

<TextInput style = {[styles.formTextInput, {height : 300}]}
                    placeholder = "Why do you need the book ?"
                    multiline = {true}
                    numberOfLines = {10}
                    onChangeText = {(text)=>{
                        this.setState({
                            reasonToRequest : text
                        })
                    }}
                    value = {this.state.reasonToRequest}

                    
                    />

                    <TouchableOpacity style = {styles.button}
                    onPress = {()=>{
                        this.addRequest(this.state.bookName , this.state.reasonToRequest)
                    }}
                    
                    >
                        <Text> Request </Text>
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