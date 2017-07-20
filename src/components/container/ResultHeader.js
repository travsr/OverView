import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ScrollView,
    Image,
    TouchableOpacity,
    Button,
    Modal
} from 'react-native';

import { SessionVis } from '../presentation/SessionVis';
import { SessionHistory } from '../views/SessionHistory';
import { StyledButton } from '../presentation/StyledButton';
import { DataManager } from '../../data/DataManager';
import { CharacterPortrait } from '../presentation/CharacterPortrait';
import { MapThumbnail } from '../presentation/MapThumbnail';
import { Colors } from '../../data/Styles';
let TimeAgo = require('react-native-timeago');

export class ResultHeader extends Component {

    constructor(props) {
        super(props);

        // let resultMap = this.props.logEntries.map((entry, index) => {
        //     return entry.get('result');
        // });

        this.state = {sessionModalVisible : false};
    }

    dataManager = new DataManager();

    getCharacterFromName(name) {
        if(this.dataManager.serverDataModel.characters) {
            let foundChar = {};
            for(var i = 0; i < this.dataManager.serverDataModel.characters.length; i++) {
                let char = this.dataManager.serverDataModel.characters[i];
                if(char.get('name') == name) {
                    foundChar = char;
                    break;
                }
            }
            return foundChar;
        }
        else {
            return {};
        }
    }

    getMapFromName(name) {
        if(this.dataManager.serverDataModel.maps) {
            let foundMap = null;
            for(var i = 0; i < this.dataManager.serverDataModel.maps.length; i++) {
                let map = this.dataManager.serverDataModel.maps[i];
                if(map.get('name') == name) {
                    foundMap = map;
                    break;
                }
            }
            return foundMap;
        }
        else {
            return null;
        }
    }


    render() {
        let recordText = "0-0";

        let characterResults = {};
        let mapResults = {};
        let summary = [];

        if(this.props.session && this.props.session.get) {
            recordText = this.props.session.get('win') + "-" + this.props.session.get('loss') + "-" + this.props.session.get('draw');
            characterResults = this.props.session.get('characterResults');
            mapResults = this.props.session.get('mapResults');
            summary = this.props.session.get('summary');
        }

        return (
            <View style={styles.container}>

                <View style={styles.infoView} >
                    <Text style={styles.recordText}>{recordText}</Text>
                    <TimeAgo style={{color:'#fff',marginTop:0, width: '100%', textAlign: 'center'}}
                             time={this.props.session ? this.props.session.createdAt : new Date().getTime()} />
                    <SessionVis summary={summary}
                                style={{width:'80%', height: 20, marginTop: 10 }}/>
                    <View style={{width: '80%', marginTop : 10, flexDirection: 'row',flexWrap:'wrap'}}>
                        {
                            Object.keys(characterResults).map((characterName, index) =>
                                <CharacterPortrait
                                    key={index}
                                    width={30}
                                    height={30}
                                    selected={true}
                                    character={this.getCharacterFromName(characterName)}
                                    record={characterResults[characterName]._all}/>
                            )
                        }

                    </View>
                    <View style={{width: '80%', marginTop : 10, marginBottom : 10, flexDirection: 'row',flexWrap:'wrap'}}>
                        {
                            Object.keys(mapResults).map((mapName, index) => {
                                    let myMap = this.getMapFromName(mapName);
                                    if(myMap) {
                                        return (<MapThumbnail
                                            key={index}
                                            width={50}
                                            height={40}
                                            selected={true}
                                            hideText={true}
                                            mapObject={myMap}
                                            record={mapResults[mapName]._all}/>);
                                    }
                                    else
                                        return;
                                }
                            )
                        }

                    </View>
                </View>



                <View style={styles.inlayShadow} elevation={20}/>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container : {
        width : '100%',
        backgroundColor :'rgba(97, 91, 181, .5)',
        paddingBottom : 20
    },
    containerBg : {
        position: 'absolute',
        top   : 0,
        right : 0,
        left  : 0,
        bottom : 0
    },
    inlayShadow : {
        position : 'absolute',
        left    : 0, right : 0,
        bottom  : 0,
        height  : 1,
        backgroundColor:'rgba(50,50,50,1)'

    },
    infoView : {
        justifyContent : 'center',
        flexDirection : 'row',
        flexWrap: 'wrap'
    },
    recordText : {
        marginTop : 10,
        color : '#fff',
        width : '100%',
        textAlign: 'center',
        fontWeight : 'bold',
        fontStyle : 'italic',
        fontSize : 30,
        textShadowColor : '#000',
        textShadowOffset : {width : 1,  height : 1},
        textShadowRadius : 4
    }
});