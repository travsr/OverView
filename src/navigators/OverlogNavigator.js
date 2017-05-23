/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    Image,
    View,
    ScrollView,
    Slider,
    TextInput,
    Button,
    Platform
} from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Startup } from '../components/views/Startup';
import { Entry } from '../components/views/Entry';
import { History } from '../components/views/History';
import { Onboard } from '../components/views/Onboard';
import { DataManager } from '../data/DataManager';

// Init parse
let Parse = require('parse/react-native');
Parse.initialize("OverLog");
Parse.serverURL = 'https://overlog.herokuapp.com/parse';


let dataManager = new DataManager();


let labelStyle = {};

if(Platform.OS === 'ios') {
    labelStyle.fontSize = 14;
    labelStyle.marginBottom = 16
}

const MainTabs = TabNavigator({
    EntryNew: { screen : Entry  },
    History : { screen : History },
}, {
    tabBarOptions : {
        style : {
            backgroundColor : '#000',
        },
        labelStyle : labelStyle,
        indicatorStyle : {
            backgroundColor : '#ff9c00'
        },
        activeTintColor : '#ff9c00'
    }
});

MainTabs.navigationOptions = {
    headerVisible : false
};

Parse.User.currentAsync().then((user) => {


});

export const OverlogNavigator = StackNavigator({
    Onboard :  {screen : Onboard  },
    MainTabs : {screen : MainTabs }
},{
    initialRouteName : "MainTabs"
});


