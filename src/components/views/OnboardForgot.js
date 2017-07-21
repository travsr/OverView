import React, { Component } from 'react';
import {
    View,
    Alert,
    Image,
    TextInput,
    Text,
    Button,
    StyleSheet,
    StatusBar,
    Linking,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';

import {StyledButton} from '../presentation/StyledButton';
import { NavigationActions } from 'react-navigation';
import {Colors} from '../../data/Styles';
import { DataManager } from '../../data/DataManager';


let Parse = require('parse/react-native');

export class OnboardForgot extends Component {
    constructor(props) {
        super(props) ;

        this.state = {
            username : "",
            password : "",
            email : "",
            screen : 0,
            loading : false
        };

    }
    static navigationOptions = {
        title: 'Login' ,
        headerVisible : false
    };

    dataManager = new DataManager();

    sendForgot() {

    }

    render() {

        return (
            <View style={{width:'100%',height:'100%',justifyContent : 'center'}}>

                <Image source={require('../../images/maps/12-lijiang.jpg') }
                       resizeMode="cover"
                       style={{position:'absolute',top:0,left:0,width:'100%',height:'100%'}}/>

                <View style={{
                    position:'absolute',
                    bottom:20,
                    left:20,
                    right:20,
                    flexDirection:'row',
                    flexWrap:'wrap',
                    alignItems: 'center',
                    justifyContent : 'center',
                    marginTop : 20
                }}>
                    <Text style={{
                        color : '#fff',
                        backgroundColor:'transparent'
                    }}>
                        By signing up you agree to our
                    </Text>
                    <TouchableOpacity onPress={()=>{
                        Linking.openURL("https://overviewapp.herokuapp.com/tos.html");
                    }}>
                        <Text style={{ color : Colors.orange,backgroundColor:'transparent' }}> Terms of Service</Text>
                    </TouchableOpacity>
                    <Text style={{color : '#fff',backgroundColor:'transparent' }}> and </Text>
                    <TouchableOpacity onPress={()=>{
                        Linking.openURL("https://overviewapp.herokuapp.com/privacy.html");
                    }}>
                        <Text style={{color : Colors.orange,backgroundColor:'transparent' }}>Privacy Policy</Text>
                    </TouchableOpacity>
                </View>

                {/* Back button */}
                <TouchableOpacity
                        style={{position: 'absolute',top: 10,left:10}}
                        onPress={()=>{
                            const backAction = NavigationActions.back();
                            this.props.navigation.dispatch(backAction);
                        }}>
                    <Image resizeMode="contain" style={{width: 40, height : 40, opacity: .8}} source={require("../../images/icons/back.png")}/>
                </TouchableOpacity>






                <View style={{flexDirection : 'column', paddingLeft : 40, paddingRight : 40 }}>

                    <TextInput
                        style={styles.myInput}
                        placeholder="Email"
                        underlineColorAndroid="transparent"
                        placeholderTextColor="rgba(255,255,255,.7)"
                        onChangeText={(text) => {this.setState({email:text})} }
                    />

                    <View style={{flexDirection : 'row'}}>

                        <StyledButton title="Send Reset Email" onPress={()=>{this.sendForgot()}}
                                      enabled={true}
                                      style={{
                                          width: '100%',
                                          height : 40,
                                          backgroundColor: '#00a5e2',
                                          borderRadius : 20,
                                      }}
                                      textStyle={{
                                          fontSize:16,
                                          fontWeight: 'bold',
                                          color:'#fff',
                                          fontStyle:'italic'
                                      }}/>

                    </View>

                </View>


                { this.state.loading &&
                <ActivityIndicator size={50} style={{
                    position: 'absolute',
                    bottom: 100,
                    left: '50%',
                    marginLeft: -25
                }} />
                }

            </View>
        );
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