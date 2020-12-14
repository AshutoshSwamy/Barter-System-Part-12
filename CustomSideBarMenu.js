import React, {Component} from 'react';
import {Stylesheet, Text, TouchableOpacity, View} from 'react-native';
import {DrawerItems} from 'react-navigation-drawer';
import {Avatar} from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';

export default class CustomSideBarMenu extends Component{
    state={
        userID:firebase.auth().currentUser.email,
        image:'#',
        name:'',
        docId:''
    }

    selectImage  = async()=>{
        const {cancelled , uri} = await ImagePicker.launchImageLibraryAsync({
            mediaTypes : ImagePicker.MediaTypeOptions.All , 
            allowEditing : true, aspect : [4,3],
            quality :  1
        })

        if(!cancelled){
            this.uploadImage(uri , this.state.userID)
        }
    }
//uploaded on firebase storage bucket
    uploadImage = async(uri ,imageName)=>{
        var response = await fetch(uri);
        var blob = await response.blob()
        var ref = firebase.storage().ref().child("user_profiles/"+imageName)

        return ref.put(blob).then((response)=>{
            this.fetchImage(imageName);
        })
    }
    //fetching from the firebase storage bucket
    fetchImage =(imageName)=>{
        var storageRef = firebase
        .storage()
        .ref()
        .child("user_profiles")

    }
    render(){
        return(
            <View style = {{flex:1}}>
                <View>
                    <Avatar 
                    rounded
                    source = {{
                        uri : this.state.image
                    }}
                    size =  "medium"
                    onPress = {()=>{
                        this.selectImage()
                    }}
                    containerStyle = {styles.imageContainer}
                    showEditButton
                    />
                    <Text style = {{
                        fontSize : 20,
                        fontWeight : "100",
                        paddingTop : 10,
                    }}>{this.state.name}</Text>
                </View>
                <View>
                    <DrawerItems {...this.props}/>

                </View>
                <View>
                    <TouchableOpacity
                    onPress = {() => {
                        this.props.navigation.navigate('WelcomeScreen')
                        firebase.auth().signOut()
                    }}
                    >
                        <Text>Log Out</Text>
                    </TouchableOpacity>
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({

    imageContainer : {

    }
})