/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
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

        this.dataManager.onAfterLoad(()=> {
            this.setState(this.state);

            this.setState({
                characterResults : this.dataManager.serverDataModel.currentUser.get('characterResults'),
                mapResults : this.dataManager.serverDataModel.currentUser.get('mapResults')
            });
        });


        // bind 'this' to our delegates
        this.onMapSelect = this.onMapSelect.bind(this);
        this.onCharacterSelect = this.onCharacterSelect.bind(this);
        this.onResultPick = this.onResultPick.bind(this);
        this.onMatchNotesChange = this.onMatchNotesChange.bind(this);
        this.addEntry =  this.addEntry.bind(this);
        this.onMyPerfChange = this.onMyPerfChange.bind(this);
        this.onTeamPerfChange = this.onTeamPerfChange.bind(this);
    }
    resetState() {
        this.setState({
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

        // Save log entry with parse
        let LogEntry = Parse.Object.extend("LogEntry");
        let logEntry = new LogEntry();

        this.setState({
            btnSaveText : "SAVING...",
            btnSaveEnabled : false
        });

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
            ratingMe : Math.round( this.state.myPerf/14 * 100 ),
            ratingTeam : Math.round( this.state.teamPerf/14 * 100) // normalize ratings
        }).then(() => {

            this.dataManager.getLogSessions()
                .then(()=>this.dataManager.selectSession(0))
                .then(() => {
                    // navigate to the history page
                    this.props.navigation.navigate("History");

                    setTimeout(()=>{
                        this.setState({
                            characterResults : this.dataManager.serverDataModel.currentUser.get('characterResults'),
                            mapResults : this.dataManager.serverDataModel.currentUser.get('mapResults')
                        });

                        // reset the selected values
                        this.resetState();
                    },200) ;
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
    render() {
        return (
            <View>

                <StatusBar backgroundColor="#34315a"  />

                <Image
                    source={require('../../images/app-bg2.png')}
                    resizeMode="cover"
                    style={{position:'absolute',top:0,left:0,width:'100%',height:'100%'}}
                />

                <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={-100}>

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

                    <View style={{margin:0, flexDirection : 'row', flexWrap: 'wrap'}}>

                        <View style={{padding : 10, width: '100%',backgroundColor: 'rgba(97, 91, 181, .0)' }}>
                            <TextInput
                                onChangeText={this.onMatchNotesChange}
                                style={{height: 50,width:'100%' }}
                                placeholder="Match Notes"
                            />
                        </View>

                        <View elevation={10} style={{width: '100%',padding : 10, flexDirection : 'row', justifyContent : 'center'}}>

                            <View style={{width : '33%', justifyContent : 'center', flexDirection: 'row',flexWrap:'wrap' }}>
                                <Switch
                                    onValueChange={(value) => {}}
                                    value={true} />
                                <Text style={{textAlign:'center',backgroundColor :'transparent', width: '100%', fontSize : 11}}>Thrower</Text>
                            </View>
                            <View style={{width : '33%', justifyContent : 'center', flexDirection: 'row',flexWrap:'wrap' }}>
                                <Switch
                                    onValueChange={(value) => {}}
                                    value={true} />
                                <Text style={{textAlign:'center',backgroundColor :'transparent', width: '100%', fontSize : 11}}>Leaver</Text>
                            </View>
                            <View style={{width : '33%', justifyContent : 'center', flexDirection: 'row',flexWrap:'wrap' }}>

                                <TextInput
                                    keyboardType="numeric"
                                    style={{height: 50,width:'100%' }}
                                    placeholder="SR Rating"
                                />
                            </View>

                        </View>

                        <View style={{width:'50%',margin: 0,  padding: 4,backgroundColor : 'rgba(0, 0, 0, .01)', borderColor : 'rgba(97, 91, 181, 0)', borderTopWidth: 1, borderBottomWidth:1, borderRightWidth:1}}>
                            <PerformanceSlider
                                value={this.state.myPerf}
                                onChange={this.onMyPerfChange}
                                text="My Gameplay"/>
                        </View>
                        <View style={{width:'50%', margin : 0, padding: 4, backgroundColor : 'rgba(0,0,0,.01)', borderColor : 'rgba(97, 91, 181, 0)', borderTopWidth: 1, borderBottomWidth:1,}}>
                            <PerformanceSlider
                                value={this.state.teamPerf}
                                onChange={this.onTeamPerfChange}
                                text="Team's Gameplay"/>
                        </View>

                    </View>

                    <View style={{height:100}}></View>

                </ScrollView>
                </KeyboardAvoidingView>

                <StyledButton
                    onPress={this.addEntry}
                    title={this.state.btnSaveText}
                    enabled={this.state.btnSaveEnabled}
                    style={{position: 'absolute',bottom : 0, left : 0, right : 0, height : 60,backgroundColor: '#00a5e2'  }}
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