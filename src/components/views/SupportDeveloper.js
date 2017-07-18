import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Linking,
    TouchableOpacity
} from 'react-native';

import {Colors} from '../../data/Styles';
import {StyledButton} from '../presentation/StyledButton';
import { NavigationActions } from 'react-navigation';


export class SupportDeveloper extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <View style={{width:'100%',height:'100%',justifyContent : 'center'}}>
                <Image source={require('../../images/maps/12-lijiang.jpg') }  resizeMode="cover" style={{position:'absolute',top:0,left:0,width:'100%',height:'100%'}}/>

                {/* Back button */}
                <TouchableOpacity
                    style={{position: 'absolute',top: 10,left:10}}
                    onPress={()=>{
                        const backAction = NavigationActions.back();
                        this.props.navigation.dispatch(backAction);
                    }}>
                    <Image resizeMode="contain" style={{width: 40, height : 40, opacity: .8}} source={require("../../images/icons/back.png")}/>
                </TouchableOpacity>

                <View style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginBottom: 0}}>
                    <Image source={require('../../images/screenshots/brewfund.png')} style={{width: 180, height: 250}}/>


                    <Text style={{
                        color: '#fff',
                        fontSize: 22,
                        fontWeight : 'bold',
                        marginTop: 18,
                        backgroundColor : 'transparent'
                    }}>Give the developers a beer!</Text>

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
                    }}>BrewFund is an app that allows you to give the gift of beer, redeemable at local craft breweries. (Must be 21 or older to use).</Text>

                    <StyledButton title="Give the developers a beer!" onPress={()=> {
                                    Linking.openURL("https://brewfund.com/travis");
                                }}
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
                                      fontStyle: 'italic',
                                  }}/>
                </View>

            </View>
        );
    }
}