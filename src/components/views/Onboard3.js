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

export class Onboard3 extends Component {
    constructor(props) {
        super(props) ;

        this.state = {
            username : "",
            password : "",
            screen : 0,
            loading : false
        };

    }
    static navigationOptions = {
        title: 'Login' ,
        headerVisible : false
    };

    dataManager = new DataManager();

    login() {

        this.setState({loading:true});

        console.log("Logging in...");
        Parse.User.logIn(this.state.username, this.state.password).then((user)=> {

            console.log("logged in");
            console.log(user.get("username"));

            this.dataManager.getServerDataModel();



            // Reset the navigation stack so we can't go back to login
            const resetAction = NavigationActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'MainTabs'})]
            });
            this.props.navigation.dispatch(resetAction);

            this.setState({loading:false});






        }, (error) => {

            // Works on both iOS and Android
            Alert.alert(
                'Login Error',
                error.message,
                [
                    {text: 'OK', onPress: () => console.log('OK Pressed')},
                ],
                { cancelable: false }
            );

            this.setState({loading:false});

        });

    }
    signUp() {

        this.setState({loading:true});


        let user = new Parse.User();
        user.set("username", this.state.username);
        user.set("password", this.state.password);

        user.signUp({username : this.state.username, password: this.state.password}).then((user)=> {

            console.log("logged in");
            console.log(user.get("username"));

            this.dataManager.getServerDataModel();

            // Reset the navigation stack so we can't go back to login
            const resetAction = NavigationActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'MainTabs'})]
            });
            this.props.navigation.dispatch(resetAction);

            this.setState({loading:false});

        }, (error) => {


            // Works on both iOS and Android
            Alert.alert(
                'Sign Up Error',
                error.message,
                [
                    {text: 'OK', onPress: () => console.log('OK Pressed')},
                ],
                { cancelable: false }
            );

            this.setState({loading:false});

        });
    }
    continue() {

        //this.props.navigation.navigate('MainTabs');
        this.setState({screen : this.state.screen+1});



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






                <View style={{flexDirection : 'column', paddingLeft : 40, paddingRight : 40 }}>

                    <TextInput
                        style={styles.myInput}
                        placeholder="Username"
                        underlineColorAndroid="transparent"
                        placeholderTextColor="rgba(255,255,255,.7)"
                        onChangeText={(text) => {this.setState({username:text})} }
                    />
                    <TextInput
                        style={styles.myInput }
                        underlineColorAndroid="transparent"
                        placeholder="Password"
                        placeholderTextColor="rgba(255,255,255,.7)"
                        secureTextEntry={true}
                        onChangeText={(text) => {this.setState({password:text})} }
                    />
                    <View style={{flexDirection : 'row'}}>

                        <StyledButton title="Sign Up" onPress={()=>{

                                            this.props.navigation.navigate("OnboardSignUp");
                                      }}
                                      enabled={true}
                                      style={{
                                          width: '50%',
                                          height : 40,
                                          backgroundColor: '#00a5e2',
                                          borderTopLeftRadius : 20,
                                          borderBottomLeftRadius : 20
                                      }}
                                      textStyle={{
                                          fontSize:16,
                                          fontWeight: 'bold',
                                          color:'#fff',
                                          fontStyle:'italic'
                                      }}/>
                        <StyledButton title="Log In" onPress={()=>{this.login()}}
                                      enabled={true}
                                      style={{
                                          width: '50%',
                                          height : 40,
                                          backgroundColor: '#ff9c00' ,
                                          borderTopRightRadius : 20,
                                          borderBottomRightRadius : 20
                                      }}
                                      textStyle={{
                                          fontSize:16,
                                          fontWeight: 'bold',
                                          color:'#fff',
                                          fontStyle:'italic'
                                      }}/>
                    </View>

                    <TouchableOpacity onPress={()=> {
                        this.props.navigation.navigate("OnboardForgot");
                    }}>
                        <Text style={{color : '#FFF', marginTop: 14,fontSize : 10, opacity: .5, backgroundColor : 'transparent'}}>Forgot Password?</Text>
                    </TouchableOpacity>

                </View>


                { this.state.loading &&
                    <ActivityIndicator style={{
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