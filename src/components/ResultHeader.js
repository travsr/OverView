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

import { SessionVis } from './SessionVis';
import { SessionHistory } from './../views/SessionHistory';
import { StyledButton } from './StyledButton';
import { DataManager } from './DataManager';
let TimeAgo = require('react-native-timeago');

export class ResultHeader extends Component {

    constructor(props) {
        super(props);

        let resultMap = this.props.logEntries.map((entry, index) => {
            return entry.get('result');
        });

        this.state = {resultMap:resultMap, sessionModalVisible : false};

        this.showSessionModal = this.showSessionModal.bind(this);
    }

    dataManager = new DataManager();

    showSessionModal() {
        console.log("choose session clicked");
        this.setState({sessionModalVisible : true});
    }


    render() {
        let recordText = "0-0";
        if(this.props.session.get) {
            recordText = this.props.session.get('win') + "-" + this.props.session.get('loss') + "-" + this.props.session.get('draw');
        }

        return (
            <View style={styles.container}>

                <View style={styles.infoView} >
                    <Text style={styles.recordText}>{recordText}</Text>
                    <TimeAgo style={{color:'#fff',marginTop:0, width: '100%', textAlign: 'center'}} time={new Date().getTime()} />
                    <SessionVis logEntries={this.props.logEntries}
                                style={{width:'80%', height: 20, marginTop: 10 }}/>
                </View>

                <StyledButton
                    style={{position:'absolute',right:0,bottom:0, width : 120, height: 80, backgroundColor : 'transparent'}}
                    textStyle={{color : '#fff'}}
                    title={"View Session History"}
                    enabled={true}
                    onPress={this.showSessionModal}
                />



                <View style={styles.inlayShadow} elevation={20}/>


                <Modal
                        visible={this.state.sessionModalVisible}
                        onRequestClose={()=>{this.setState({sessionModalVisible : false})}}
                        animationType="slide">
                    <SessionHistory
                            sessions={this.dataManager.serverDataModel.logSessions} />
                </Modal>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container : {
        width : '100%',
        height: 220,
        backgroundColor :'rgba(97, 91, 181, .5)'
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