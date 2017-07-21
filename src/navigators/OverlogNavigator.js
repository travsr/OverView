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
import { Settings } from '../components/views/Settings';
import { History } from '../components/views/History';

import { DataManager } from '../data/DataManager';

import { Onboard0 } from '../components/views/Onboard0';
import { Onboard1 } from '../components/views/Onboard1';
import { Onboard2 } from '../components/views/Onboard2';

import { Onboard3 } from '../components/views/Onboard3';
import { OnboardSignUp  } from '../components/views/OnboardSignUp';
import { OnboardForgot  } from '../components/views/OnboardForgot';

import { SupportDeveloper } from '../components/views/SupportDeveloper';

// Init parse
let Parse = require('parse/react-native');
Parse.initialize("OverView");
Parse.serverURL = 'https://overviewapp.herokuapp.com/parse';

let dataManager = new DataManager();

let labelStyle = {};

if(Platform.OS === 'ios') {
    labelStyle.fontSize = 14;
    labelStyle.marginBottom = 16
}



// Onboard Tabs
const OnboardTabs = TabNavigator({
    Onboard0: { screen : Onboard0  },
    Onboard1 : { screen : Onboard1 },
    Onboard2 : { screen : Onboard2 },
    Onboard3 : { screen : Onboard3 }
}, {
    tabBarOptions : {
        style :  {
            display :'none',
        },
        showLabel :  false ,
        showIcon : false
    },
    swipeEnabled : true
});


// Main Tabs
const MainTabs = TabNavigator({
    EntryNew: { screen : Entry  },
    History : { screen : History },
    Settings : { screen : Settings }
}, {
    tabBarOptions : {
        style : {
            backgroundColor : '#000',
        },
        indicatorStyle : {
            backgroundColor : '#ff9c00'
        },
        activeTintColor : '#ff9c00',
        showLabel :  true   ,
        showIcon : false
    },
    initialRouteName:"EntryNew",
    swipeEnabled : true,
    lazy : false
});

MainTabs.navigationOptions = {
    headerVisible : false
};

Parse.User.currentAsync().then((user) => {


});

export const OverlogNavigator = StackNavigator({
    Startup : {screen : Startup},
    Onboard :  {screen : OnboardTabs  },
    OnboardSignUp :  {screen : OnboardSignUp  },
    OnboardForgot :  {screen : OnboardForgot  },
    MainTabs : {screen : MainTabs },
    SupportDeveloper : {screen : SupportDeveloper}
},{
    initialRouteName : "Startup",
    headerMode : "none"
});


