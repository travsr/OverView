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
import { Startup } from '../views/Startup';
import { Entry } from '../views/Entry';
import { History } from '../views/History';
import { Onboard } from '../views/Onboard';
import { DataManager } from '../components/DataManager';

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

export const OverlogNavigator = StackNavigator({
    Startup : {screen : Startup},
    Onboard :  {screen : Onboard  },
    MainTabs : {screen : MainTabs }
});