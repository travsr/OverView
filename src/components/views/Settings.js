import React, { Component } from 'react';
import {
    View,
    ScrollView,
    TouchableOpacity,
    Text,
    Image,
    StyleSheet
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


    render() {

        return (<View style={{ flex : 1, backgroundColor : '#fff'}}>
            <Image
                source={require('../../images/app-bg2.png')}
                resizeMode="cover"
                style={{position:'absolute',top:0,left:0,width:'100%',height:'100%'}}
            />
            <ScrollView style={{ flex : 1}}>
                <View style={{marginLeft: 14, marginRight : 14, marginTop: 0, marginBottom : 0}}>
                    <TouchableOpacity style={styles.menuOption}
                                      onPress={()=>{this.props.navigation.navigate('Onboard');}}>
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
        borderBottomColor : Colors.lightBlue,
        padding: 12,
        marginBottom: 5,
        fontWeight:'bold',
        flex :  1,
        flexDirection : 'row',
        alignItems : 'center'
    },
    menuOptionText : {
        marginLeft : 8,
        color: '#000',
        fontWeight:'bold'
    }
});