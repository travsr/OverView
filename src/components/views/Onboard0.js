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

export class Onboard0 extends Component {
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

        //this.props.navigation.navigate('MainTabs');
        this.props.navigation.navigate("Onboard1");

    }

    render() {

        return (
            <View style={{width:'100%',height:'100%',justifyContent : 'center'}}>
                <Image source={require('../../images/maps/12-lijiang.jpg') }
                       resizeMode="cover"
                       style={{position:'absolute',top:0,left:0,width:'100%',height:'100%'}}/>


                <View style={{flexDirection: 'column', alignItems: 'center', marginBottom: 50}}>
                    <Image source={require('../../images/app_icon.png')} style={{width: 180, height: 180}}/>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{
                            color: '#fff',
                            fontStyle: 'italic',
                            fontSize: 70,
                            fontWeight: 'bold',
                            marginTop: -10,
                            backgroundColor : 'transparent'
                        }}>Over</Text>
                        <Text style={{
                            color: Colors.orange,
                            fontStyle: 'italic',
                            fontSize: 30,
                            fontWeight: 'bold',
                            backgroundColor : 'transparent'
                        }}>LOG</Text>
                    </View>
                    <View style={{flexDirection: 'row', marginTop: 20}}>
                        <StyledButton title="Get Started" onPress={()=> {this.continue()}}
                                      enabled={true}
                                      style={{
                                          width: '80%',
                                          height: 40,
                                          backgroundColor: Colors.lightBlue,
                                          borderRadius : 20
                                      }}
                                      textStyle={{
                                          fontSize: 16,
                                          fontWeight: 'bold',
                                          color: '#fff',
                                          fontStyle: 'italic'
                                      }}/>
                    </View>
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