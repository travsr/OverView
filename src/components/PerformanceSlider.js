import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Slider
} from 'react-native';


export class PerformanceSlider extends Component {



    constructor(props) {
        super(props);

        this.sliderChanged = this.sliderChanged.bind(this);
    }

    sliderChanged(value) {
        if(this.props.onChange) {
            this.props.onChange(value);
        }
    }

    getGrade() {
        let scale = ['F-','F', 'F+', 'D-', 'D', 'D+', 'C-', 'C', 'C+', 'B-','B','B+','A-','A','A+'];
        if(this.props.value != null) {
            return scale[this.props.value];
        }
        else {
            return "Not set";
        }
    }

    render() {

        return (
            <View style={{width: '100%', flexDirection : 'row',paddingTop : 20}}>
                <Text style={styles.sliderText}>{this.props.text}</Text>
                <View style={{width : '33%', justifyContent : 'center'}}>
                    <Text style={styles.rankText}>{this.getGrade()}</Text>
                </View>
                <View style={{width : '66%', justifyContent : 'center'}}>
                    <Slider
                        minimumValue={0}
                        maximumValue={14}
                        step={1}
                        value={7}
                        style={styles.slider}
                        onValueChange={(value) => {this.sliderChanged(value)}}
                    />
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    slider : {
        marginTop : 0,

    },
    sliderText : {
        marginLeft : 0,
        textAlign: 'center',
        backgroundColor : 'transparent',
        position: 'absolute',
        top : 0,
        left : 0,
        right : 0,
        textAlign : 'center'
    },
    rankText : {
        textAlign: 'center',
        fontSize : 20,
        fontWeight : 'bold',
        backgroundColor : 'transparent'
    }
});