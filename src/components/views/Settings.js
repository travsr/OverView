import React, { Component } from 'react';
import {
    View,
    Image
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import { DataManager } from '../../data/DataManager';

let Parse = require('parse/react-native');


export class Settings extends Component {

    static navigationOptions  = {
        tabBarLabel: 'Settings' ,
        headerVisible : false,
        tabBarIcon: ({ tintColor }) => (
            <Image
                source={require('../../images/icons/char-defense.png')}
                style={{width : 16, height: 16, tintColor : tintColor}}
            />
        )
    };

    dataManager = new DataManager();

    constructor(props) {
        super(props);

    }


    render() {

        return (
            <View/>
        );
    }
}