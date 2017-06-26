import React, { Component } from 'react';
import {
    View,
    Image,
    TextInput,
    Text,
    Button,
    StyleSheet,
    StatusBar
} from 'react-native';

import {StyledButton} from '../presentation/StyledButton';
import { NavigationActions } from 'react-navigation';


let Parse = require('parse/react-native');

export class Onboard extends Component {
    constructor(props) {
        super(props) ;

        this.state = {
            username : "",
            password : ""
        };

    }
    static navigationOptions = {
        title: 'Login' ,
        headerVisible : false
    };
    login() {

        console.log("Logging in...");
        Parse.User.logIn(this.state.username, this.state.password).then((user)=> {

            console.log("logged in");
            console.log(user.get("username"));
            this.props.navigation.navigate('MainTabs');

            // Reset the navigation stack so we can't go back to login
            const resetAction = NavigationActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'MainTabs'})]
            });
            this.props.navigation.dispatch(resetAction);

        }, (error) => {
            console.log(error);
        });

    }
    signUp() {

    }
    render() {

        return (
            <View style={{width:'100%',height:'100%',justifyContent : 'center'}}>
                <Image source={require('../../images/maps/12-lijiang.jpg') }  resizeMode="cover" style={{position:'absolute',top:0,left:0,width:'100%',height:'100%'}}/>

                <StatusBar backgroundColor="#34315a"  />
                <View style={{flexDirection : 'column', padding : 20 }}>


                    <TextInput
                        style={styles.myInput}
                        placeholder="Username"
                        underlineColorAndroid="transparent"
                        placeholderTextColor="#6b66a0"
                        onChangeText={(text) => {this.setState({username:text})} }
                    />
                    <TextInput
                        style={styles.myInput }
                        underlineColorAndroid="transparent"
                        placeholder="Password"
                        placeholderTextColor="#6b66a0"
                        secureTextEntry={true}
                        onChangeText={(text) => {this.setState({password:text})} }
                    />
                    <View style={{flexDirection : 'row'}}>
                        <StyledButton title="Sign Up" onPress={()=>{this.signUp()}}
                                      enabled={true}
                                      style={{width: '50%', height : 40,backgroundColor: '#00a5e2'  }}
                                      textStyle={{fontSize:16, fontWeight: 'bold',color:'#fff', fontStyle:'italic' }}/>
                        <StyledButton title="Log In" onPress={()=>{this.login()}}
                                      enabled={true}
                                      style={{width: '50%', height : 40,backgroundColor: '#ff9c00'  }}
                                      textStyle={{fontSize:16, fontWeight: 'bold',color:'#fff', fontStyle:'italic'}}/>
                    </View>

                    <Text style={{marginTop : 20 }}>By signing up you agree to our Terms of Service and Privacy Policy</Text>

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