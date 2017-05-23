import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native';


export class StyledButton extends Component {

    constructor(props) {
        super(props) ;
    }
    tryOnPress() {
        if(this.props.onPress && this.props.enabled) {
            this.props.onPress();
        }
    }
    render() {

        return (
            <TouchableOpacity  onPress={() => {this.tryOnPress()}} style={this.props.style}>
                <View style={styles.btnView}>
                    <Text style={this.props.textStyle}>{this.props.title}</Text>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    btnView : {
        justifyContent : 'center',
        alignItems : 'center',
        position : 'absolute',
        top : 0, left:0,right:0,bottom:0
    }
});