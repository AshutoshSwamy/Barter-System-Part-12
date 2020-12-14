import React, { Component } from 'react';
import {View , Text , TouchableOpacity , StyleSheet , TextInput} from 'react-native';
import db from '../config';
import MyHeader from '../components/MyHeader';
import firebase from firebase;
import { Header } from 'react-native/Libraries/NewAppScreen';

export default class SettingsScreen extends Component {

    constructor(){
        super();
        this.state = {
            firstName : "",
            lastName : "",
            address : "",
            phone : "",
            emailId : "",
            docId : "",
        }
    }

    getUserDetails = ()=>{
        var email = firebase.auth().currentUser.email
        db.collection('users').where('emailId', '==' , email)
        .get().then((snapshot)=>{
            snapshot.forEach((doc)=>{
                var data = doc.data()
                this.setState({
                    firstName : data.firstName,
                    lastName : data.lastName,
                    address : data.address,
                    phone  : data.phone,
                    emailId : data.emailId,
                    docId : doc.id,
                })
            })
        })
    }

    componentDidMount(){
        this.getUserDetails()
    }

    updateUserDetails = ()=>{
        db.collection('users').doc(this.state.docId)
        .update({
            firstName : this.state.firstName,
                    lastName : this.state.lastName,
                    address : this.state.address,
                    phone  : this.state.phone,
        })
        alert("User Profile Updated Successfully")
    }

    render() { 
        return ( 
            <View style = {styles.container}>

                <MyHeader title = "Profile Settings"
                    navigation = {this.props.navigation}
                />

                <View style = {styles.formContainer}>
                <TextInput
          style={styles.formTextInput}
          placeholder ={"First Name"}
          maxLength ={8}
          onChangeText={(text)=>{
            this.setState({
              firstName: text
            })
          }}
        />
        <TextInput
          style={styles.formTextInput}
          placeholder ={"Last Name"}
          maxLength ={8}
          onChangeText={(text)=>{
            this.setState({
              lastName: text
            })
          }}
        />
        <TextInput
          style={styles.formTextInput}
          placeholder ={"Contact"}
          maxLength ={10}
          keyboardType={'numeric'}
          onChangeText={(text)=>{
            this.setState({
              phone: text
            })
          }}
        />
        <TextInput
          style={styles.formTextInput}
          placeholder ={"Address"}
          multiline = {true}
          onChangeText={(text)=>{
            this.setState({
              address: text
            })
          }}
        />

<TouchableOpacity
           style={[styles.button,{marginBottom:20, marginTop:20}]}
           onPress = {()=>{
             this.updateUserDetails()
           }}
           >
           <Text style={styles.buttonText}>Save Settings</Text>
         </TouchableOpacity>
                </View>

            </View>
         );
    }
}

const styles = StyleSheet.create({
    container:{
     flex:1,
     alignItems: 'center',
     justifyContent: 'center'
   },

   formTextInput:{
    width:"75%",
    height:35,
    alignSelf:'center',
    borderColor:'#ffab91',
    borderRadius:10,
    borderWidth:1,
    marginTop:20,
    padding:10
  },

  formContainer : {
    flex:1,
    width: "100%",
    alignItems : "center",

  },

  buttonText : {
      fontSize : 25,
      fontWeight : 'bold',
      color : "white",
  }

})
 
