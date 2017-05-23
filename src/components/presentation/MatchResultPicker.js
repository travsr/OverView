import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Platform,
    Alert
} from 'react-native';

export class MatchResultPicker extends Component {
    constructor(props) {
        super(props) ;

    }
    onButtonPress(type) {
        if(this.props.onResultPick) {
            this.props.onResultPick(type);
        }
    }
    render()  {
        return(
            <View style={styles.btnContainer} >
                <TouchableOpacity style={styles.btnMatch} onPress={() => {this.onButtonPress('win')}}>
                    <Text style={this.props.result == "win" ? styles.btnTextSelected : styles.btnText}>WIN</Text>
                </TouchableOpacity>
                <TouchableOpacity  style={styles.btnMatch}  onPress={() => {this.onButtonPress('draw')}}>
                    <Text style={this.props.result == "draw" ? styles.btnTextSelected : styles.btnText}>DRAW</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnMatch} onPress={() => {this.onButtonPress('loss')}}>
                    <Text style={this.props.result == "loss" ? styles.btnTextSelected : styles.btnText}>LOSS</Text>
                </TouchableOpacity>

            </View>
        );
    }
}


const styles = StyleSheet.create({
    btnContainer: {
        flexDirection: 'row',
        width: '100%'
    },
    btnMatch: {
        width: '33.33%',
    },
    btnText: {
        textAlign: 'center',
        fontFamily:(Platform.OS === 'ios') ? 'HelveticaNeue-CondensedBold' : 'sans-serif-condensed',
        fontWeight:'bold',
        fontStyle: 'italic',
        fontSize: 20,
        backgroundColor: '#615bb5' ,
        paddingTop: 10,
        paddingBottom:10,
        borderRightColor : '#ccc',
        borderRightWidth : 1
    },
    btnTextSelected: {
        textAlign: 'center',
        fontFamily:(Platform.OS === 'ios') ? 'HelveticaNeue-CondensedBold' : 'sans-serif-condensed',
        fontWeight:'bold',
        fontStyle: 'italic',
        fontSize:20,
        color : '#111' ,
        backgroundColor: '#ff9c00',
        paddingTop: 10,
        paddingBottom:10,
        borderRightColor : '#ccc',
        borderRightWidth : 1
    }
});