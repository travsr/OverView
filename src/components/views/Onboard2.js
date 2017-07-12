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

export class Onboard2 extends Component {
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
    continue() {

        this.props.navigation.navigate('Onboard3');



    }
    render() {

        return (
            <View style={{width:'100%',height:'100%',justifyContent : 'center'}}>
                <Image source={require('../../images/maps/12-lijiang.jpg') }  resizeMode="cover" style={{position:'absolute',top:0,left:0,width:'100%',height:'100%'}}/>

                {
                    this.state.screen == 2 &&
                    <View style={{position:'absolute',bottom:20,left:20,right:20,flexDirection:'row',flexWrap:'wrap',alignItems: 'center', justifyContent : 'center', marginTop : 20}}>
                        <Text style={{color : '#fff' }}>By clicking "Get Started" you agree to our</Text>
                        <TouchableOpacity onPress={()=>{Linking.openURL("https://overlog.herokuapp.com/tos.html")}}>
                            <Text style={{ color : Colors.orange }}> Terms of Service</Text>
                        </TouchableOpacity>
                        <Text style={{color : '#fff' }}> and </Text>
                        <TouchableOpacity onPress={()=>{Linking.openURL("https://overlog.herokuapp.com/privacy.html")}}>
                            <Text style={{color : Colors.orange }}>Privacy Policy</Text>
                        </TouchableOpacity>
                    </View>

                }




                <View style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginBottom: 0}}>
                    <Image source={require('../../images/screenshots/screen2.png')} style={{width: 180, height: 250}}/>


                    <Text style={{
                        color: '#fff',
                        fontSize: 20,
                        fontWeight : 'bold',
                        marginTop: 18,
                        backgroundColor : 'transparent'
                    }}>View Past Sessions</Text>


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
                    }}>Every gaming session's history is stored for later review and analysis.</Text>

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
                                      fontStyle: 'italic'
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