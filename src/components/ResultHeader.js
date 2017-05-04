import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ScrollView,
    Image,
    TouchableOpacity,
    Modal
} from 'react-native';

import { SessionVis } from './SessionVis';


export class ResultHeader extends Component {

    constructor(props) {
        super(props);


        let resultMap = this.props.logEntries.map((entry, index) => {
            return entry.get('result');
        });

        this.state = {resultMap:resultMap};
    }


    render() {

        let recordText = "0 - 0 - 0";
        if(this.props.session.get) {
            recordText = this.props.session.get('win') + "-" + this.props.session.get('loss') + "-" + this.props.session.get('draw');
        }

        return (
            <View style={styles.container}>

                <SessionVis logEntries={this.props.logEntries} style={{position:'absolute',top : 0,left:0,right:0,bottom: 0}}/>

                <View style={styles.inlayShadow} elevation={20}/>
                <View style={styles.infoView} >
                    <Text style={styles.recordText}>{recordText}</Text>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container : {
        width : '100%',
        height: 60,
        backgroundColor : 'purple'
    },
    containerBg : {
        position: 'absolute',
        top : 0,
        right : 0,
        left : 0,
        bottom : 0
    },
    inlayShadow : {
        position : 'absolute',
        left : 0, right : 0,
        bottom : 0,
        height: 1,
        backgroundColor:'rgba(50,50,50,1)'

    },
    infoView : {
        position : 'absolute',
        left : 0, right : 0,
        bottom : 0,
        top: 0,

        backgroundColor:'rgba(50,50,50,.2)'
    },
    recordText : {

        color : '#fff',
        fontWeight : 'bold',
        fontStyle : 'italic',
        fontSize : 30,
        margin : 10,
        textShadowColor : '#000',
        textShadowOffset : {width : 1,  height : 1},
        textShadowRadius : 4

    }
});