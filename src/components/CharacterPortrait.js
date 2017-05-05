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

        let total, wins, losses, draws;
        let winP, drawP, lossP;

        wins = 0; losses = 0; draws = 0; total = 0;

        if(this.props.record) {
            total = this.props.record[0] + this.props.record[1] + this.props.record[2];
            wins = this.props.record[0];
            losses = this.props.record[1];
            draws = this.props.record[2];
        }

        winP = 0;
        drawP = 0;
        lossP = 0;

        if(total > 0) {
            winP = wins/total;
            drawP = draws/total;
            lossP = losses/total;
        }


        return(
            <View style={styles.portraitContainer}>
                <Image style={styles.portraitBg} source={require('./../img/characters/00-portrait-bg.jpg')}/>
                <Image style={this.props.selected ? styles.portraitImgSelected : styles.portraitImg} source={imgUri} resizeMode='cover'/>
                <View style={styles.portraitBorder} />
                <View style={{position:'absolute',bottom:2,left:2,right:2,height : 5,flexDirection:'row', backgroundColor: 'rgba(100,100,100,.4)'}}>
                    <View style={{opacity: .8,height : '100%', width : winP*100 + '%', backgroundColor : 'rgb(0,255,0)'}} />
                    <View style={{opacity: .8,height : '100%', width : lossP*100 + '%', backgroundColor : 'red'}} />
                    <View style={{opacity: .8,height : '100%', width : drawP*100 + '%', backgroundColor : 'yellow'}} />
                </View>

            </View>
        );
    }
}

const cWidth = 60;
const cHeight = 90;

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
    },
    marqueeTextRight:  {
        position: 'absolute',
        right: 0,
        fontSize : 10,
        fontWeight: 'bold',
        color: '#fff'
    }
});