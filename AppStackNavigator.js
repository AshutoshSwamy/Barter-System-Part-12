import React, { Component } from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import HomeScreen from '../screens/HomeScreen';
import RecieverDetailsScreen from '../screens/RecieverDetailsScreen';

export const AppStackNavigator = createStackNavigator({

    HomeList : {

        screen : HomeScreen,
        navigationOptions : {

            headerShown : false,

        }
    },

    RecieverDetails : {

        screen : RecieverDetailsScreen,
        navigationOptions : {

            headerShown : false,

        }
    },
},
{
    initialRouteName : 'HomeList'
},

)