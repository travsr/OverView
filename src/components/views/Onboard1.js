import React, { Component } from 'react';
import {
    View,
    Image,
    TextInput,
    Text,
    Button,
    StyleSheet,
    StatusBar,
    Linking,
    TouchableOpacity
} from 'react-native';

import {StyledButton} from '../presentation/StyledButton';
import { NavigationActions } from 'react-navigation';
import {Colors} from '../../data/Styles';


let Parse = require('parse/react-native');

export class Onboard1 extends Component {
    constructor(props) {
        super(props) ;

        this.state = {
            username : "",
            password : "",
            screen : 0
        };

    }
    static navigationOptions = {
        title: 'Login' ,
        headerVisible : false
    };
    continue() {

        this.props.navigation.navigate("Onboard2");



    }
    render() {

        return (
            <View style={{width:'100%',height:'100%',justifyContent : 'center'}}>
                <Image source={require('../../images/maps/12-lijiang.jpg') }  resizeMode="cover" style={{position:'absolute',top:0,left:0,width:'100%',height:'100%'}}/>

                <View style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginBottom: 0}}>
                    <Image source={require('../../images/screenshots/screen1.png')} style={{width: 180, height: 250}}/>


                    <Text style={{
                        color: '#fff',
                        fontSize: 20,
                        fontWeight : 'bold',
                        marginTop: 18,
                        backgroundColor : 'transparent'
                    }}>Record Match Data</Text>

                    <Text style={{
                        color: '#fff',
                        fontSize: 14,
                        opacity: .8,
                        textAlign: 'center' ,
                        marginTop: 0,
                        marginLeft: 20,
                        marginRight: 20,
                        marginBottom : 20,
                        backgroundColor : 'transparent'
                    }}>Make smarter character decisions on-the-fly based on your previous match history.</Text>

                    <StyledButton title="Next" onPress={()=> {this.continue()}}
                                  enabled={true}
                                  style={{
                                      width: '40%',
                                      height: 40,
                                      backgroundColor: Colors.lightBlue,
                                      borderRadius : 20
                                  }}
                                  textStyle={{
                                      fontSize: 16,
                                      fontWeight: 'bold',
                                      color: '#fff',
                                      fontStyle: 'italic',
                                  }}/>
                </View>




            </View>
        );
    }
}


const styles = StyleSheet.create({
    myInput : {
        height : 50,
        width : '100%',
        backgroundColor : 'rgba(0,0,0,.3)',
        color: '#fff',
        marginBottom : 20
    }
});