/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    Alert,
    AsyncStorage,
    ActivityIndicator,
    StyleSheet,
    Text,
    Image,
    View,
    ScrollView,
    Slider,
    TextInput,
    Button,
    StatusBar,
    Platform,
    KeyboardAvoidingView,
    Switch
} from 'react-native';

import { TabNavigator } from 'react-navigation';
import { CharacterSelect } from '../container/CharacterSelect';
import { MapSelect } from '../container/MapSelect';
import { MatchResultPicker } from '../presentation/MatchResultPicker';
import { PerformanceSlider } from '../presentation/PerformanceSlider';
import { StyledButton } from '../presentation/StyledButton';
import { StatusBarBackground } from '../presentation/StatusBarBackground';
import { DataManager } from '../../data/DataManager';

let Parse = require('parse/react-native');

export class Entry extends Component {

    static navigationOptions = {
        title: 'New' ,
        headerStyle : { backgroundColor: '#000' },
        headerTitleStyle : {color : '#fff' },
    };

    dataManager = new DataManager();

    constructor(props) {
        super(props);

        // Initialize all the things that we need to keep in our state
        this.state = {
            thrower : false,
            leaver : false,
            sr : null,
            selectedMapObject : null,
            selectedCharacters : [],
            selectedResult : "win",
            myPerf : null,
            teamPerf : null,
            matchNotes : null,
            btnSaveEnabled : true,
            btnSaveText : "SAVE",
            characterResults : {},
            mapResults : {},
        };


        this.dataManager.onDataChange(()=> {
            this.setState(this.state);

            this.setState({
                characterResults : this.dataManager.serverDataModel.currentUser.get('characterResults'),
                mapResults : this.dataManager.serverDataModel.currentUser.get('mapResults')
            });
        });


        this.dataManager.getCurrentUser();


        // bind 'this' to our delegates
        this.onMapSelect = this.onMapSelect.bind(this);
        this.onCharacterSelect = this.onCharacterSelect.bind(this);
        this.onResultPick = this.onResultPick.bind(this);
        this.onMatchNotesChange = this.onMatchNotesChange.bind(this);
        this.addEntry =  this.addEntry.bind(this);
        this.onMyPerfChange = this.onMyPerfChange.bind(this);
        this.onTeamPerfChange = this.onTeamPerfChange.bind(this);
        this.onSRChange = this.onSRChange.bind(this);


        this.checkUpdateMessage();

    }

    checkUpdateMessage() {

        console.log("Getting update code");

        AsyncStorage.getItem('updateMessageCode').done((value) => {


            let updateCode = "2";

            if(value != updateCode) {

                Alert.alert(
                    'Thank you for using OverView! v1.0.4',
                    '-New top bar\n-Sort Log entries by Season, Current Session, or week or month period\n-View old sessions by selecting the record text in the top right\n-SR, leaver, thrower, and self-rating now shown on log entries\n-"Load Older Entries" button\n-Minor style tweaks, groundwork finished for more filtering options in later releases',
                    [
                        {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ],
                    { cancelable: false }
                );

               AsyncStorage.setItem('updateMessageCode',updateCode);

            }


        });


    }

    resetState() {
        this.setState({
            thrower : false,
            leaver : false,
            sr : null,
            selectedMapObject : null,
            selectedCharacters : [],
            selectedResult : "win",
            myPerf : null,
            teamPerf : null,
            matchNotes : null,
            btnSaveEnabled : true,
            btnSaveText : "SAVE"
        });
    }
    addEntry() {

        if(!this.state.selectedMapObject) {
            // Works on both iOS and Android
            Alert.alert(
                'Error',
                'Please select the map you played on',
                [
                    {text: 'OK', onPress: () => console.log('OK Pressed')},
                ],
                { cancelable: false }
            );
            return;
        }

        // Save log entry with parse
        let LogEntry = Parse.Object.extend("LogEntry");
        let logEntry = new LogEntry();

        this.setState({
            btnSaveText : "SAVING...",
            btnSaveEnabled : false
        });



        // parse sr
        let sr = null;
        if(this.state.sr && this.state.sr.length > 0) {

            if(!isNaN( parseInt(this.state.sr) )) {
                sr = parseInt(this.state.sr);
            }
        }

        // normalize ratings
        let ratingMe = null;
        let ratingTeam = null;

        if(this.state.myPerf) {
            ratingMe = Math.round( this.state.myPerf/14 * 100 );  // normalize 0-100
        }

        if(this.state.teamPerf) {
            ratingTeam = Math.round( this.state.teamPerf/14 * 100 ); // normalize ratings 0-100
        }


        logEntry.save({
            user : this.dataManager.serverDataModel.currentUser,
            matchNotes  : this.state.matchNotes,
            result : this.state.selectedResult,
            characters : this.state.selectedCharacters,
            characterNames : this.state.selectedCharacters.map((character)=>character.get('name')),
            characterTypes : this.state.selectedCharacters.map((character)=>character.get('type')),
            map : this.state.selectedMapObject,
            mapType : this.state.selectedMapObject.get('type'),
            mapName : this.state.selectedMapObject.get('name'),
            ratingMe : ratingMe,
            ratingTeam : ratingTeam, // normalize ratings
            sr : sr,
            thrower : this.state.thrower,
            leaver : this.state.leaver
        }).then(() => {

            this.dataManager.getLogSessions()
                .then(()=>this.dataManager.selectSession(0))
                .then(() => {
                    // navigate to the history page
                    this.props.navigation.navigate("History");

                    this.dataManager.getCurrentUser()
                        .then(()=>{
                            this.setState({
                                characterResults : this.dataManager.serverDataModel.currentUser.get('characterResults'),
                                mapResults : this.dataManager.serverDataModel.currentUser.get('mapResults')
                            });

                            // reset the selected values
                            this.resetState();
                        }) ;
                });

        },(err) => {
            console.log(err);
            this.resetState();
        });

    }
    onMapSelect(m) {
        this.setState({selectedMapObject : m});
    }
    onCharacterSelect(characters) {
        this.setState({selectedCharacters: characters});
    }
    onResultPick(result) {
        this.setState({selectedResult : result});
    }
    onMatchNotesChange(text) {
        this.setState({matchNotes : text});
    }
    onMyPerfChange(value) {
        this.setState({myPerf : value});
    }
    onTeamPerfChange(value) {
        this.setState({teamPerf : value});
    }
    onSRChange(value) {
        this.setState({sr : "" + value});
    }
    render() {
        return (
            <View>

                <StatusBar hidden={true} />

                <Image
                    source={require('../../images/app-bg2.png')}
                    resizeMode="cover"
                    style={{position:'absolute',top:0,left:0,width:'100%',height:'100%'}}
                />

                <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={-50}  >

                <ScrollView style={{width:'100%',height:'100%'}} >

                    <MapSelect
                        mapList={this.dataManager.serverDataModel.maps}
                        mapResults={this.state.mapResults}
                        selectedMapObject={this.state.selectedMapObject}
                        onMapSelect={this.onMapSelect}
                    />

                    <CharacterSelect
                        selectedMapObject={this.state.selectedMapObject}
                        characterList={this.dataManager.serverDataModel.characters}
                        characterResults={this.state.characterResults}
                        selectedCharacters={this.state.selectedCharacters}
                        onCharacterSelect={this.onCharacterSelect} />

                    <MatchResultPicker
                        onResultPick={this.onResultPick}
                        result={this.state.selectedResult}
                    />



                    <View style={{margin:0, flexDirection : 'row', flexWrap: 'wrap',backgroundColor: 'rgba(97, 91, 181, .3 )', paddingBottom : 100 }}>

                        {/* match notes */}
                        <View style={{padding : 5, width: '100%',backgroundColor: 'rgba(97, 91, 181, .6 )', borderTopWidth : 1, borderTopColor : 'rgba(255,255,255,.3)',  borderBottomWidth : 1, borderBottomColor : 'rgba(255,255,255,.3)' }}>
                            <TextInput
                                onChangeText={this.onMatchNotesChange}
                                style={{height: 40,width:'100%',color: "#FFF" }}
                                placeholder="Write some match notes..."
                                placeholderTextColor="rgba(255,255,255,.7) "
                                underlineColorAndroid="transparent"
                                multiline={true}
                            />
                        </View>

                        <View style={{width: '100%',flexDirection: 'row', justifyContent: 'center',paddingTop:20}}>

                            {/* my performance */}
                            <View style={{width:'50%',margin: 0,  padding: 4,backgroundColor : 'rgba(0, 0, 0, .01)', borderColor : 'rgba(97, 91, 181, 0)', borderTopWidth: 1, borderBottomWidth:1, borderRightWidth:1}}>
                                <PerformanceSlider
                                    value={this.state.myPerf}
                                    onChange={this.onMyPerfChange}
                                    text="My Gameplay"/>
                            </View>

                            {/* team performance */}
                            <View style={{width:'50%', margin : 0, padding: 4, backgroundColor : 'rgba(0,0,0,.01)', borderColor : 'rgba(97, 91, 181, 0)', borderTopWidth: 1, borderBottomWidth:1,}}>
                                <PerformanceSlider
                                    value={this.state.teamPerf}
                                    onChange={this.onTeamPerfChange}
                                    text="Team's Gameplay"/>
                            </View>
                        </View>

                        <View elevation={10} style={{width: '100%',padding : 10, flexDirection : 'row', justifyContent : 'center', paddingTop : 10}}>

                            {/* thrower switch */}
                            <View style={{width : '33%', justifyContent : 'center', flexDirection: 'row',flexWrap:'wrap' }}>
                                <Switch
                                    onValueChange={(value) => {
                                        this.setState({thrower : value})
                                    }}
                                    value={this.state.thrower} />
                                <Text style={{textAlign:'center',backgroundColor :'transparent', width: '100%', fontSize : 11, color : '#fff'}}>Thrower</Text>
                            </View>

                            {/* leaver switch */}
                            <View style={{width : '33%', justifyContent : 'center', flexDirection: 'row',flexWrap:'wrap' }}>
                                <Switch
                                    onValueChange={(value) => {
                                        this.setState({leaver: value})
                                    }}
                                    value={this.state.leaver} />
                                <Text style={{textAlign:'center',backgroundColor :'transparent', width: '100%', fontSize : 11, color : '#fff'}}>Leaver</Text>
                            </View>

                            {/* sr rating */}
                            <View style={{width : '33%', justifyContent : 'center', flexDirection: 'row',flexWrap:'wrap' }}>

                                <TextInput
                                    onChangeText={this.onSRChange}
                                    keyboardType="numeric"
                                    style={{height: 50,width:'100%', color : '#fff' }}
                                    placeholder="SR Rating"
                                    placeholderTextColor="#FFF"
                                />
                            </View>

                        </View>



                    </View>


                </ScrollView>
                </KeyboardAvoidingView>

                <StyledButton
                    onPress={this.addEntry}
                    title={this.state.btnSaveText}
                    enabled={this.state.btnSaveEnabled}
                    style={{position: 'absolute',bottom : 0, left : 0, right : 0, height : 50,backgroundColor: '#00a5e2'  }}
                    textStyle={{fontSize:20, fontWeight: 'bold',color:'#fff', fontStyle:'italic' }}/>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    textSmall: {
        fontFamily:(Platform.OS === 'ios') ? 'HelveticaNeue-CondensedBold' :  'sans-serif-condensed',
        fontWeight:'bold',
        fontStyle:'italic',
        color: '#111',
        fontSize:12
    }
});