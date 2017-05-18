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
            return "_" ;
        }
    }

    render() {

        return (
            <View style={{width: '100%', flexDirection : 'column',justifyContent:'center',  paddingTop : 8, paddingBottom : 8}}>

                <View style={{width : '100%', justifyContent : 'center'}}>
                    <Slider
                        minimumValue={0}
                        maximumValue={14}
                        step={1}
                        value={7}
                        style={styles.slider}
                        onValueChange={(value) => {this.sliderChanged(value)}}
                    />
                </View>
                <Text style={styles.sliderText}>{this.props.text}</Text>
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
        textAlign : 'center',
        fontSize : 11
    },
    rankText : {
        textAlign: 'center',
        fontSize : 25,
        fontWeight : 'bold',
        backgroundColor : 'transparent'
    }
});