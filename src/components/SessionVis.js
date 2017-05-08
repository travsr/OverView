import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ScrollView,
    Image,
    TouchableOpacity
} from 'react-native';


export class SessionVis extends Component {

    constructor(props) {
        super(props);

        this.state = {};

    }

    render() {

        let summary = [];

        // create our summary array based on
        if(this.props.logEntries) {
            summary = this.props.logEntries.map((entry)=>entry.get('result'));
        }
        else if(this.props.summary) {
            summary = this.props.summary;
        }

        return (
            <View style={styles.overview}>
                {summary.map((entry, index) => {

                    let w = 100/summary.length + '%';
                    let c = 'green';

                    if(entry == 'draw')
                        c = '#ff9c00';
                    else if(entry == 'loss')
                        c = 'red';

                    return (
                        <View style={{width:w,height: 80,backgroundColor : c, opacity : .8, borderLeftColor : 'rgba(0,0,0,.3)', borderLeftWidth : 1}} key={index}/>
                    );
                })}
                <View style={styles.overviewBorder}/>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    overview: {
        width: '100%',
        height: 80,
        backgroundColor: 'blue',
        flexDirection: 'row'
    },
    overviewBorder: {
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        opacity: .5,
        borderColor: '#000',
        borderWidth: 1
    },
})