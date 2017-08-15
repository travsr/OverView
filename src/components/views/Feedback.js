import React, { Component } from 'react';
import {
    View,
    ScrollView,
    TouchableOpacity,
    Text,
    TextInput,
    Button,
    Image,
    StyleSheet,
    Linking
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import { DataManager } from '../../data/DataManager';

let Parse = require('parse/react-native');

export class Feedback extends Component {

    static navigationOptions  = {
        tabBarLabel: 'Settings' ,
        headerVisible : false
    };

    dataManager = new DataManager();

    constructor(props) {
        super(props);

        this.state = {

        }
    }

    leaveFeedback(text) {

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

                    <TextInput style={styles.myInput} />
                    <Button />

                </View>
            </ScrollView>
        </View>);
    }
}



const styles = StyleSheet.create({
    myInput : {
        borderRadius : 8,
        height : 50,
        paddingLeft : 10,
        paddingRight : 10,
        width : '100%',
        backgroundColor : 'rgba(0,0,0,.3)',
        color: '#fff',
        marginBottom : 20
    }
});