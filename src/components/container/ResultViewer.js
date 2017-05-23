import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableHighlight
} from 'react-native';
let TimeAgo = require('react-native-timeago');


let Parse = require('parse/react-native');

export class ResultViewer extends Component {


    constructor(props) {
        super(props);

        this.state = {currentUser : null};
        // store current parse user in state, then get the history
        Parse.User.currentAsync().then((user) => {
            this.setState({currentUser : user});
        });
    }
    getResultStyle(result) {
        if(result == "win")
            return styles.winColor;
        else if(result == "draw")
            return styles.drawColor;
        else
            return styles.lossColor;
    }
    getIcon(result) {
        if(result == "win")
            return "▲";
        else if(result == "draw")
            return "▪";
        else
            return "▼";
    }
    getIconStyle(result) {
        if(result == "win")
            return styles.winTopRightText;
        else if(result == "draw")
            return styles.drawTopRightText;
        else
            return styles.lossTopRightText;
    }
    render() {


        let result = this.props.entry.get('result');
        let mapImgUri = {uri : this.props.entry.get('map').get('image').url()};
        let characters = this.props.entry.get('characters');
        let characterImgs = characters.map((character, index)=>{
            return {uri : characters[index].get('image').url() };
        });


        return (
            <TouchableHighlight onLongPress={()=>{console.log("Pressed")}}>
                <View style={styles.mainView}>
                    <Image source={mapImgUri} style={styles.mapBg} resizeMode="cover"/>
                    <View style={styles.backdrop} />
                    <View style={styles.resultView}>
                        <Text style={styles.resultText}>{this.props.entry.get('map').get('longName').toUpperCase()}</Text>
                        <TimeAgo style={{color:'#fff'}} time={this.props.entry.get('createdAt').getTime()} />
                    </View>
                    <Text style={this.getIconStyle(result)} >{this.getIcon(result)}</Text>
                    <View style={this.getResultStyle(result)} />
                    <View style={styles.thumbView}>
                        {characters.map((character, index) =>
                            <View style={styles.charThumb} key={index}>
                                <Image source={require('../img/characters/00-portrait-bg.jpg')}  style={styles.charThumbImg}/>
                                <Image source={characterImgs[index]} style={styles.charThumbImg}/>
                            </View>
                        )}
                    </View>
                </View>
            </TouchableHighlight>
        );
    }
}

const styles = StyleSheet.create({
    mainView : {
        width : '100%',
        height: 150
    },
    winTopRightText :  {
        position: 'absolute',
        top: 10, right : 20,
        color : 'green',
        opacity : .8
    },
    lossTopRightText :  {
        position: 'absolute',
        top: 10, right : 20,
        color : 'red',
        opacity : .8
    },
    drawTopRightText :  {
        position: 'absolute',
        top: 10, right : 20,
        color : 'yellow',
        opacity : .8
    },
    resultView : {
        marginTop: 10,
        marginLeft: 12
    },
    resultText :  {
        color : '#fff',
        fontWeight : 'bold',
        fontStyle : 'italic',
        fontSize : 18,
        textShadowColor : '#000',
        textShadowOffset : {width : 1,  height : 1},
        textShadowRadius : 4

    },
    winColor : {
        opacity : .8,
        position: 'absolute',
        top: 3, right : 6, left: 6, bottom :3,
        borderColor : 'green',
        borderLeftWidth : 0,
        borderRightWidth : 4
    },
    drawColor : {
        opacity : .8,
        position: 'absolute',
        top: 3, right : 6, left: 6, bottom :3,
        borderColor : '#ff9c00',
        borderLeftWidth : 0,
        borderRightWidth : 4
    },
    lossColor : {
        opacity : .8,
        position: 'absolute',
        top: 3, right : 6, left: 6, bottom :3,
        borderColor : 'red',
        borderLeftWidth : 0,
        borderRightWidth : 4
    },
    mapBg : {
        position : 'absolute',
        top: 0, right : 0, left: 0, bottom :0
    },
    backdrop : {
        position : 'absolute',

        backgroundColor : 'rgba(0,0,0,.3)',
        top: 3, right : 6, left: 6, bottom :3
    },
    thumbView : {
        flexDirection : 'row',
        position: 'absolute',
        bottom : 10,
        left : 12
    },
    charThumb : {
        width : 50,
        height: 50
    },
    charThumbImg : {
        position : 'absolute',
        top : 0,
        left : 0,
        width : 50,
        height: 50
    }

});