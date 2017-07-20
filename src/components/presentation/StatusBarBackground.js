import React, { Component } from 'react';
import {Colors} from '../../data/Styles';
import {
    StyleSheet,
    View,
    Platform
} from 'react-native';

export class StatusBarBackground extends Component{
    render(){
        return(
            <View style={[styles.statusBarBackground, this.props.style || {}]}/>
        );
    }
}

const styles = StyleSheet.create({
    statusBarBackground: {
        height: (Platform.OS === 'ios') ? 20 : 0,
        backgroundColor: "white",
    }
});