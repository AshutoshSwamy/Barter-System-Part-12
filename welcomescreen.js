import React, { Component } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity,TextInput, Alert, ScrollView, Modal, KeyboardAvoidingView } from 'react-native';
import db from '../config';
import firebase from 'firebase';

export default class WelcomeScreen extends Component {
  constructor(){
    super()
    this.state={
      emailId : '',
      password: '',
      firstName : '',
      lastName : '',
      phone : '',
      address : '',
      confirmPassword : '',
      isModalVisible : false
    }
  }

  userLogin = (emailId, password)=>{
    firebase.auth().signInWithEmailAndPassword(emailId, password)
    .then(()=>{
     // return alert("Successfully Login")
     this.props.navigation.navigate("HomeScreen")
    })
    .catch((error)=> {
      var errorCode = error.code;
      var errorMessage = error.message;
      return alert(errorMessage)
    })
  }

  userSignUp = (emailId, password) =>{
    firebase.auth().createUserWithEmailAndPassword(emailId, password)
    .then((response)=>{
      return Alert.alert("User Added Successfully")
    })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      return Alert.alert(errorMessage)
    });
  }

  showModal = () => {
    return(
      <Modal 
      animationType = "fade"
      transparent = {true}
      visible = {false}
      >

        <View style = {styles.modalContainer}>

          <ScrollView style = {{
            width : '100%'
          }}>

            <KeyboardAvoidingView style = {styles.keyboardAvoidingView}>
              <Text style = {styles.modalTitle}> Create An Account </Text>

              <TextInput styles = {styles.loginBox}
            placeholder = "First Name"
            secureTextEntry = {false}
            maxLength = {10}
            onChangeText = {(text)=>{
                this.setState({
                    firstName : text,
                })
            }}
            />

<TextInput styles = {styles.loginBox}
            placeholder = "Last Name"
            secureTextEntry = {false}
            maxLength = {10}
            onChangeText = {(text)=>{
                this.setState({
                    lastName : text,
                })
            }}
            />

<TextInput styles = {styles.loginBox}
            placeholder = "Contact No."
            secureTextEntry = {false}
            keyboardType = 'numeric'
            maxLength = {10}
            onChangeText = {(text)=>{
                this.setState({
                    phone : Number,
                })
            }}
            />

<TextInput styles = {styles.loginBox}
            placeholder = "Residential Address"
            secureTextEntry = {false}
            multiline = {true}
            onChangeText = {(text)=>{
                this.setState({
                    address : text,
                })
            }}
            />

<TextInput styles = {styles.loginBox}
            placeholder = "Password"
            secureTextEntry = {true}
            onChangeText = {(text)=>{
                this.setState({
                    password : text,
                })
            }}
            />

<TextInput styles = {styles.loginBox}
            placeholder = "Confirm Password"
            secureTextEntry = {true}
            onChangeText = {(text)=>{
                this.setState({
                    confirmPassword : text,
                })
            }}
            />
            </KeyboardAvoidingView>

          </ScrollView>

        </View>
          
      </Modal>
    )
  }
  render(){
    return(
      <View style={styles.container}>
        {this.showModal()}
        <View style={styles.profileContainer}>
          <Text style={styles.title}>Book Santa</Text>

          <Image
          source = {
            require('../assets/Book Santa Logo.gif')
          }
          style = {
            {
              width : 250,
              height : 250
            }
          }
          />
            
         
        </View>
        <View style={styles.buttonContainer}>
          <TextInput
          style={styles.loginBox}
          placeholder="example@bartersystem.com"
          placeholderTextColor = "#ffff"
          keyboardType ='email-address'
          onChangeText={(text)=>{
            this.setState({
              emailId: text
            })
          }}
        />

        <TextInput
          style={styles.loginBox}
          secureTextEntry = {true}
          placeholder="password"
          placeholderTextColor = "#ffff"
          onChangeText={(text)=>{
            this.setState({
              password: text
            })
          }}
        />


          <TouchableOpacity
            style={[styles.button,{marginBottom:20, marginTop:20}]}
            onPress = {()=>{this.userLogin(this.state.emailId, this.state.password)}}
            >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress = {()=>{this.setState({isModalVisible : true})}}
            >
            <Text style={styles.buttonText}>SignUp</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#F8BE85'
  },
  profileContainer:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  },
  title :{
    fontSize:65,
    fontWeight:'300',
    paddingBottom:30,
    color : '#ff3d00'
  },
  loginBox:{
    width: 300,
    height: 40,
    borderBottomWidth: 1.5,
    borderColor : '#ff8a65',
    fontSize: 20,
    margin:10,
    paddingLeft:10
  },
  button:{
    width:300,
    height:50,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:25,
    backgroundColor:"#ff9800",
    shadowColor: "#000",
    shadowOffset: {
       width: 0,
       height: 8,
    },
    shadowOpacity: 0.30,
    shadowRadius: 10.32,
    elevation: 16,
  },
  buttonText:{
    color:'#ffff',
    fontWeight:'200',
    fontSize:20
  },
  buttonContainer:{
    flex:1,
    alignItems:'center'
  }
})
