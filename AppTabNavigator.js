import React, { Component } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity,TextInput, Alert, ScrollView, Modal, KeyboardAvoidingView } from 'react-native';
import {createBottomTabNavigator} from 'react-navigation-tabs'
import RequestScreen from '../screens/RequestScreen'
import DonateScreen from '../screens/DonateScreen'

export const AppTabNavigator = createBottomTabNavigator({

    ExchangeScreen : {

        screen : ExchangeScreen,
        navigationOptions : {

            tabBarIcon : <Image

            
            /> ,

            tabBarLabel : "Barter Here"
        }
    },

    HomeScreen : {

        screen : HomeScreen,
        navigationOptions : {

            tabBarIcon : <Image

            
            /> ,

            tabBarLabel : "Barter Lobby"
        }
    }
})







