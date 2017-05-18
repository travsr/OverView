import React, { Component } from 'react';
import {
    View,
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import { DataManager } from '../components/DataManager';

let Parse = require('parse/react-native');


export class Startup extends Component {

    static navigationOptions = {
        title: 'Startup' ,
        headerVisible : false,
    };

    dataManager = new DataManager();

    constructor(props) {
        super(props);

        Parse.User.currentAsync().then((user) => {

            let navigationAction = null;

            // If a user is logged in let's immediately go to the main screen
            if(user) {
                this.props.navigation.navigate('MainTabs');
                // Reset the navigation stack so we can't go back to login
                const resetAction = NavigationActions.reset({
                    index: 0,
                    actions: [NavigationActions.navigate({ routeName: 'MainTabs'})]
                });
                //this.props.navigation.dispatch(resetAction);
            }
            // Otherwise show the login screen
            else {
                this.props.navigation.navigate('Onboard');
                // Reset the navigation stack so we can't go back to login
                const resetAction = NavigationActions.reset({
                    index: 0,
                    actions: [NavigationActions.navigate({ routeName: 'Onboard'})]
                });
                //this.props.navigation.dispatch(resetAction);
            }


        });
    }


    render() {

        return (
            <View/>
        );
    }
}