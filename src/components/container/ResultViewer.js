import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableHighlight,
    TouchableOpacity,
    Animated,
    Easing,
    Alert
} from 'react-native';
let TimeAgo = require('react-native-timeago');

import { Colors } from '../../data/Styles';


let Parse = require('parse/react-native');

export class ResultViewer extends Component {


    constructor(props) {
        super(props);

        this.state = {currentUser : null, isExpanded : false};
        // store current parse user in state, then get the history
        Parse.User.currentAsync().then((user) => {
            this.setState({currentUser : user});
        });

        this.spinValue = new Animated.Value(0);

        this.expandHeight = new Animated.Value(0);
        this.expandView = this.expandView.bind(this);
        this.showDeleteConfirm = this.showDeleteConfirm.bind(this);



    }
    spin () {
        this.spinValue.setValue(0);
        Animated.timing(
            this.spinValue,
            {
                toValue: 1,
                duration: 4000,
                easing: Easing.linear
            }
        ).start(() => this.spin());
    }
    expandView() {

        let expanded = this.state.isExpanded;

        if(!expanded) {
            this.expandHeight.setValue(0);
            Animated.spring(
                this.expandHeight,
                {
                    toValue : 1,
                    speed : 10,
                    bounciness : 20,
                    easing : Easing.linear
                }
            ).start();

        }
        else {
            this.expandHeight.setValue(1);
            Animated.spring(
                this.expandHeight,
                {
                    toValue : 0,
                    speed : 10,
                    bounciness : 20,
                    easing : Easing.linear
                }
            ).start();
        }

        this.setState({isExpanded : !expanded});
    }

    showDeleteConfirm() {

        let refresh = this.props.onDelete;
        this.expandView();

        // Works on both iOS and Android
        Alert.alert(
            'Delete Entry',
            'Are you sure you want to delete this entry?',
            [
                {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {text: 'Delete', onPress: () => {


                    this.props.entry.destroy().then(()=>{
                        if(refresh) {
                            refresh();
                        }
                    });

                } },
            ],
            { cancelable: false }
        )
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


        const spin = this.spinValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg']
        });


        const expandH = this.expandHeight.interpolate({
            inputRange : [0, 1],
            outputRange : [200, 250]
        });


        const toolH = this.expandHeight.interpolate({
            inputRange : [0, 1],
            outputRange : [0, 40]
        });


        let result = this.props.entry.get('result');
        let mapImgUri = {uri : this.props.entry.get('map').get('image').url()};
        let characters = this.props.entry.get('characters');
        let characterImgs = characters.map((character, index)=>{
            return {uri : characters[index].get('image').url() };
        });

        return (
            <TouchableHighlight onPress={this.expandView} activeOpacity={1}>

                <View style={{flexDirection:'column'}}>


                    {/* Top toolbar */}
                    <Animated.View style={{height: toolH, backgroundColor : Colors.purple}}>
                        {
                            this.state.isExpanded &&
                            <TouchableOpacity onPress={this.showDeleteConfirm} style={{
                                backgroundColor : '#777',
                                width : 30,
                                height : 30,
                                borderRadius: 15,
                                position : 'absolute',
                                right : 5,
                                top : 5
                            }}>
                                <Image style={{
                                    height: 20,
                                    width: 20,
                                    margin : 5
                                }} source={require('../../images/icons/delete.png')} />
                            </TouchableOpacity>
                        }

                    </Animated.View>


                    {/* Main view */}
                    <Animated.View style={[
                        styles.mainView,
                        {
                            height : expandH
                        }
                    ]}>
                        {/* Map thumbnail background */}
                        <Image source={mapImgUri} style={styles.mapBg} resizeMode="cover"/>

                        {/* marquee shadow overlay */}
                        <Animated.Image
                            source={require('../../images/inset-shadow.png')}
                            style={[styles.mapBg, { width: '100%',height:expandH, opacity: .9}]}
                            resizeMode="stretch"/>

                        {/* semi-transparent backdrop */}
                        <View style={styles.backdrop} />

                        {/* result details */}
                        <View style={styles.resultView}>
                            <Text style={styles.resultText}>
                                {this.props.entry.get('map').get('longName').toUpperCase()}
                            </Text>
                            <TimeAgo
                                style={{color:'#fff'}}
                                time={this.props.entry.get('createdAt').getTime()}
                            />
                            {   this.props.entry.get('matchNotes') &&
                                <View style={{backgroundColor : 'rgba(0,0,0,.1)', padding : 10, marginTop : 10, width : '80%', borderRadius : 10}}>
                                    <Text style={{color : '#fff'}}>{this.props.entry.get('matchNotes')}</Text>
                                </View>
                            }
                        </View>

                        {/* win/loss/draw visuals */}
                        <Text style={this.getIconStyle(result)}>
                            {this.getIcon(result)}
                        </Text>
                        <View style={this.getResultStyle(result)} />

                        {/* sr rating, throwers, etc */}
                        <View style={{flexDirection: 'row', position:'absolute',top:10,right:38}}>



                            {/* thrower */}
                            {   this.props.entry.get('thrower') &&
                                <View style={{backgroundColor:'rgba(0,0,0,.3)', borderRadius: 3, marginRight : 3}}>
                                    <Text style={{color:'#fff', margin: 2, fontWeight : 'bold', color : 'yellow' }}>T</Text>
                                </View>
                            }


                            {/* leaver */}
                            {
                                this.props.entry.get('leaver') &&
                                <View style={{backgroundColor:'rgba(0,0,0,.3)', borderRadius: 3, marginRight : 3}}>
                                    <Text style={{color:'#fff', margin: 2, fontWeight : 'bold', color : 'red' }}>L</Text>
                                </View>
                            }


                            {/* sr */}
                            {
                                this.props.entry.get('sr') &&
                                <View style={{backgroundColor:'rgba(0,0,0,.3)', borderRadius: 3}}>
                                    <Text style={{color:'#fff', margin: 2 }}>{this.props.entry.get('sr')}</Text>
                                </View>
                            }

                        </View>


                        {/* Map thumbnails, character thumbnails */}
                        <View style={styles.thumbView}>
                            {characters.map((character, index) =>
                                <View style={styles.charThumb} key={index}>
                                    <Image source={require('../../images/characters/00-portrait-bg.jpg')}  style={styles.charThumbImg}/>
                                    <Image source={characterImgs[index]} style={styles.charThumbImg}/>
                                </View>
                            )}
                        </View>

                    </Animated.View>

                </View>




            </TouchableHighlight>
        );
    }
}

const styles = StyleSheet.create({
    mainView : {
        width : '100%',
        height: 200,
        flexDirection : 'column'
    },
    winTopRightText :  {
        position: 'absolute',
        top: 10, right : 20,
        color : '#0f0',
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
        fontSize : 22,
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
        backgroundColor : 'rgba(0,0,0,.2)',
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