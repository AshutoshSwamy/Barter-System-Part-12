import React, { Component } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity,TextInput, Alert, ScrollView, Modal, KeyboardAvoidingView } from 'react-native';
import {createDrawerNavigator} from 'react-navigation-drawer';
import CustomSideBarMenu from './CustomSideBarMenu';
import {AppTabNavigator} from './AppTabNavigator;'

export const AppDrawerNavigator = createDrawerNavigator({

    Home : {

        screen : AppTabNavigator
    }
},
{
    contentComponent : CustomSideBarMenu
},
{
    intialRootName : 'Home'
}
)