import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native';

export class CharacterPortrait extends Component {
    constructor(props) {
        super(props);
    }
    render() {

        let imgUri = {uri: this.props.character.get('image').url()};


        let recordText = "";
        if(this.props.record[2] === 0) {
            let newRec = this.props.record.slice();
            newRec.pop();
            recordText = newRec.join('-');
        }
        else {
            recordText = this.props.record.slice().join('-');
        }


        // let pct, total, wins, losses;
        //
        // total = this.props.record[0] + this.props.record[1] + this.props.record[2];
        // wins = this.props.record[0] + .5*this.props.record[2];
        // losses = this.props.record[1] + .5*this.props.record[2];
        // if(total > 0)
        //     pct = wins/total;
        // else
        //     pct = .5;
        //
        // let green = 255*pct;
        // let red = 255-green;
        // let rgb = "rgba("+red+','+green+',0,.8)';

        let pct = .5;
        let rgb = "rgba(0,0,0,.5)";



        return(
            <View style={styles.portraitContainer}>
                <Image style={styles.portraitBg} source={require('./../img/characters/00-portrait-bg.jpg')}/>
                <Image style={this.props.selected ? styles.portraitImgSelected : styles.portraitImg} source={imgUri} resizeMode='cover'/>
                <View style={styles.portraitBorder} />
                <View style={{padding:1, position:'absolute',bottom:0,left:0,right:0, backgroundColor: rgb}}>
                    <Text style={styles.marqueeText}>{pct}</Text>
                </View>
            </View>
        );
    }
}

const cWidth = 60;
const cHeight = 75;

const styles = StyleSheet.create({
    portraitContainer: {
        height : cHeight,
        width : cWidth,
        overflow : 'hidden'
    },
    portraitImg: {
        position: 'absolute',
        top: 0,
        left : 0,
        height : cHeight,
        width : cWidth,
        opacity : .2
    },
    portraitImgSelected: {
        position: 'absolute',
        top: 0,
        left : 0,
        height : cHeight,
        width : cWidth,
        opacity: .95 ,
    },
    portraitBg: {
        position: 'absolute',
        top: 0,
        left : 0,
        height : cHeight,
        width : cWidth,
    },
    portraitBorder: {
        position: 'absolute' ,
        borderColor : '#fff',
        borderTopWidth : 1 ,
        borderRightWidth : 1 ,
        opacity:.5,
        top: 0, left : 0, right : 0, bottom :0,
    },
    marquee: {
        padding:1,
        backgroundColor: 'rgba(0,0,0,.1)',
        position: 'absolute',
        bottom : 0,
        left:0
    },
    marqueeText:  {
        fontSize : 10,
        fontWeight: 'bold',
        color: '#fff'
    }
});