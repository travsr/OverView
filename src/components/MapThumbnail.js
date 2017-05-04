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

        return(
            <View style={styles.thumbContainer}>
                <Image source={imgUri}
                        style={this.props.selected ? styles.thumbSelected : styles.thumb}
                        resizeMode="cover"/>
                <View style={styles.marquee}>
                    <Text style={styles.marqueeText}>{this.props.mapObject.get('name') }</Text>
                </View>

                <View style={styles.marqueeTopLeft}>
                    <Text style={styles.recordText}>1-1 </Text>
                </View>

                <View style={styles.mapBorder}  />
            </View>
        );
    }
}


const styles = StyleSheet.create({
   thumbContainer  : {
       width: 80
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
    marqueeTopLeft: {
        position: 'absolute',
        bottom  : 0,
        right:0,
        backgroundColor: 'rgba(255,255,255,0)'
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
    recordText :  {
        fontWeight:'bold',
        fontSize:10,
        padding: 1,
        color: '#444',
        textAlign: 'right'
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