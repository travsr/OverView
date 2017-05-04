import React, { Component } from 'react';
import {
    View,
} from 'react-native';

let Parse = require('parse/react-native');

export class Startup extends Component {

    constructor(props) {
        super(props) ;




    }
    static navigationOptions = {
        title: 'Startup' ,
        headerStyle : { backgroundColor: '#9b9dc4' },
        headerTitleStyle : {color : '#fff'}
    };
    render() {

        return (
            <View/>
        );
    }
}