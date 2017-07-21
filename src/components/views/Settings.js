import React, { Component } from 'react';
import {
    View,
    ScrollView,
    TouchableOpacity,
    Text,
    Image,
    StyleSheet,
    Linking
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import { DataManager } from '../../data/DataManager';
import { Colors } from '../../data/Styles';

let Parse = require('parse/react-native');


export class Settings extends Component {

    static navigationOptions  = {
        tabBarLabel: 'Settings' ,
        headerVisible : false,
        // tabBarIcon: ({ tintColor }) => (
        //     <Image
        //         source={require('../../images/icons/char-defense.png')}
        //         style={{width : 16, height: 16, tintColor : tintColor}}
        //     />
        // )
    };

    dataManager = new DataManager();

    constructor(props) {
        super(props);

    }

    logOut() {
        Parse.User.logOut();
        // Reset the navigation stack so we can't go back to login
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'Onboard'})]
        });
        this.props.navigation.dispatch(resetAction);
    }


    render() {

        return (<View style={{ flex : 1, backgroundColor : 'rgb(97, 91, 181)'}}>

            <Image
                source={require('../../images/app-bg2.png')}
                resizeMode="cover"
                style={{position:'absolute',top:0,left:0,width:'100%',height:'100%',opacity:.2}}
            />
            <ScrollView style={{ flex : 1}}>
                <View style={{marginLeft: 14, marginRight : 14, marginTop: 20, marginBottom : 0}}>
                    <TouchableOpacity style={styles.menuOption}
                                      onPress={()=>{
                                          this.props.navigation.navigate("SupportDeveloper");
                                      }}>
                        <Text style={styles.menuOptionText}>Give the Devs a Beer!</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.menuOption}
                                      onPress={()=>{
                                          Linking.openURL("https://overviewapp.herokuapp.com/privacy.html");
                                      }}>
                        <Text style={styles.menuOptionText}>Privacy Policy</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuOption}
                                      onPress={()=>{
                                          Linking.openURL("https://overviewapp.herokuapp.com/tos.html");
                                      }}>
                        <Text style={styles.menuOptionText}>Terms of Service</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuOption}
                                      onPress={()=>{
                                          this.logOut();
                                      }}>
                        <Text style={styles.menuOptionText}>Log Out</Text>
                    </TouchableOpacity>

                </View>
            </ScrollView>
        </View>);
    }
}



const styles = StyleSheet.create({
    menuOption : {
        borderBottomWidth : 1,
        borderBottomColor : 'rgba(255,255,255,.2)',
        paddingTop: 20,
        paddingBottom : 20,
        paddingLeft: 5,
        paddingRight: 5,
        marginBottom: 0,
        marginTop: 0,
        flex :  1,
        flexDirection : 'row',
        alignItems : 'center',
        backgroundColor: 'rgba(255,255,255,.2)'
    },
    menuOptionText : {
        marginLeft : 8,
        color: '#fff',
        fontWeight:'bold'
    }
});