import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Platform
} from 'react-native';

export class MapThumbnail extends Component {
    constructor(props) {
        super(props);
        //console.log(this.props.mapObject);
    }
    render() {
        let imgUri = {uri: this.props.mapObject.get('image').url()};

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
            <View style={styles.thumbContainer}>
                <Image source={imgUri}
                        style={this.props.selected ? styles.thumbSelected : styles.thumb}
                        resizeMode="cover"/>
                <View style={styles.marquee}>
                    <Text style={styles.marqueeText}>{this.props.mapObject.get('name') }</Text>
                </View>

                <View style={styles.mapBorder}  />


                <View style={{position:'absolute',bottom:2,left:2,right:2,height : 2,flexDirection:'row', backgroundColor: 'rgba(100,100,100,.4)'}}>
                    <View style={{opacity: .8,height : '100%', width : winP*100 + '%', backgroundColor : 'rgb(0,255,0)'}} />
                    <View style={{opacity: .8,height : '100%', width : lossP*100 + '%', backgroundColor : 'red'}} />
                    <View style={{opacity: .8,height : '100%', width : drawP*100 + '%', backgroundColor : 'yellow'}} />
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
   thumbContainer  : {
       width: 120
   },
   thumb: {
       height:100,
       width:'100%' ,
       opacity : .2
   },
    thumbSelected: {
        height:100,
        width:'100%',
        opacity : 1
    },
    marquee: {
        position: 'absolute',
        top : 0,
        right:0,
        left:0,
        backgroundColor: 'rgba(255,255,255,.6)'
    },
    marqueeText :  {
        fontFamily:(Platform.OS === 'ios') ? 'HelveticaNeue-CondensedBold' : 'sans-serif-condensed',
        fontWeight:'bold',
        fontStyle:'italic',
        fontSize:12,
        padding: 1,
        color: '#444',
        textAlign: 'center'
    },
    mapBorder: {
        position: 'absolute' ,
        borderColor : '#fff',
        borderTopWidth : 1 ,
        borderRightWidth : 1 ,
        opacity:.5,
        top: 0,
        left : 0,
        right : 0,
        bottom : 0
    },
});