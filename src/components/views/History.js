import React, { Component } from 'react';
import {
    View,
    Image,
    ListView,
    RefreshControl,
    ActivityIndicator,
    TouchableOpacity,
    Text,
    Modal,
    StyleSheet,
    Animated,
    Easing
} from 'react-native';

import {ResultViewer} from '../container/ResultViewer';
import {ResultHeader} from '../container/ResultHeader';
import { DataManager } from '../../data/DataManager';
import { SessionVis } from '../presentation/SessionVis';
import { StyledButton } from '../presentation/StyledButton';
import { SessionHistory } from '../views/SessionHistory';
import { Colors } from '../../data/Styles';

export class History extends Component {

    static navigationOptions = {
        title: 'History'
    };

    dataManager = new DataManager();

    constructor(props) {
        super(props) ;

        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        this.state = {
            currentUser : null,
            logEntries : ds.cloneWithRows([]),
            refreshing : false,
            selectedSessionIndex : 0,
            sessionModalVisible: false
        };

        this.dataManager.onDataChange(() => {
            this.setState(this.state);
        });

        setInterval(()=>{
           // this.setState(this.state);
           // this.refs._scrollView.scrollTo({x:0,y:0, animated:true});
        }, 2000);

        this.showSessionModal = this.showSessionModal.bind(this);
        this._onRefresh = this._onRefresh.bind(this);


        this.expandHeight = new Animated.Value(0);
        this.expandView = this.expandView.bind(this);

    }

    expandView() {
        this.expandHeight.setValue(0);
        Animated.spring(
            this.expandHeight,
            {
                toValue: 1,
                speed: 10,
                bounciness: 20,
                easing: Easing.linear
            }
        ).start();

    }
    _onRefresh() {
        this.setState({refreshing: true});

        this.dataManager.getLogSessions()
            .then( this.dataManager.selectSession(this.state.selectedSessionIndex) )
            .then(()=> {
                this.setState({refreshing: false});
            })
            .done(()=> {
                this.setState({refreshing: false});
            });
    }
    showSessionModal() {
        console.log("choose session clicked");
        this.setState({sessionModalVisible : true});
    }
    closeModal() {
        this.setState({sessionModalVisible : false});
    }
    render() {

        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        let dataSource = ds.cloneWithRows(this.dataManager.serverDataModel.selectedLogEntries);

        const expandH = this.expandHeight.interpolate({
            inputRange : [0, 1],
            outputRange : [60, 200]
        });

        let session = this.dataManager.serverDataModel.selectedSession;

        let recordText = "0-0";
        let summary = [];

        if(session && session.get) {
            recordText = session.get('win') + "-" + session.get('loss');

            if(session.get('draw') && session.get('draw') > 0)
                recordText += '-' + session.get('draw');
            summary =  session.get('summary');
        }

        return (
            <View style={{width: '100%',height : '100%'}}>

                <Image
                    source={require('../../images/app-bg2.png')}
                    resizeMode="cover"
                    style={{position:'absolute',top:0,left:0,width:'100%',height:'100%'}}
                />

                <TouchableOpacity onPress={this.expandView}>
                    <Animated.View style={{
                        backgroundColor:'#222',
                        height : expandH,
                        width : '100%',
                        flexDirection : 'row'
                    }}>
                        <View style={styles.filter}>
                            <Image style={{height : 20, width: 20}} resizeMode="contain" source={require('../../images/icons/graph.png')} />
                        </View>
                        <View style={styles.filter}>
                            <Image style={{height : 20, width: 20}} resizeMode="contain" source={require('../../images/icons/list.png')} />
                        </View>

                        <View style={{flexDirection:'column'}}>
                            <Text style={styles.recordText}>{recordText}</Text>
                            <SessionVis summary={summary}
                                        style={{width:'100%', height: 20, marginTop: 10 }}/>
                        </View>
                    </Animated.View>
                </TouchableOpacity>

                <Animated.View style={{position:'absolute',top:expandH,left:0, right:0,bottom :0}}>

                    <ListView
                        ref="_scrollView"
                        style={{position:'absolute',top:0,left:0,width:'100%',height:'100%'}}
                        dataSource={dataSource}
                        enableEmptySections={true}
                        onEndReached={()=>{

                        }}
                        renderHeader={()=>
                            <ResultHeader
                                session={this.dataManager.serverDataModel.selectedSession}
                                logEntries={this.dataManager.serverDataModel.selectedLogEntries} />
                        }
                        renderRow={(entry)=>
                            <ResultViewer entry={entry} onDelete={this._onRefresh} />
                        }
                        renderFooter={()=>
                            <View style={{backgroundColor : Colors.purple, height: 30}}>
                                {/*<ActivityIndicator size="large" style={{margin:20}} />*/}
                            </View>
                        }
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={this._onRefresh}
                            />
                        }
                    />
                </Animated.View>

                <StyledButton
                    style={{
                        position:'absolute',
                        right:10,bottom:10,
                        width : 140,
                        height: 30,
                        backgroundColor : Colors.lightBlue,
                        borderRadius : 30}}
                    textStyle={{color : '#fff'}}
                    title={"Previous Sessions"}
                    enabled={true}
                    onPress={this.showSessionModal}
                />

                {/*<StyledButton*/}
                    {/*style={{*/}
                        {/*position:'absolute',*/}
                        {/*left:10,bottom:10,*/}
                        {/*width : 120,*/}
                        {/*height: 30,*/}
                        {/*backgroundColor : Colors.lightBlue,*/}
                        {/*borderRadius : 30}}*/}
                    {/*textStyle={{color : '#fff'}}*/}
                    {/*title={"Support the Devs"}*/}
                    {/*enabled={true}*/}
                    {/*onPress={()=>{*/}
                        {/*this.props.navigation.navigate("SupportDeveloper");*/}
                    {/*}}*/}
                {/*/>*/}

                <Modal
                    visible={this.state.sessionModalVisible}
                    onRequestClose={()=>{this.setState({sessionModalVisible : false})}}
                    animationType="slide">
                    <SessionHistory
                        onClosePress={()=>{this.closeModal();}}
                        sessions={this.dataManager.serverDataModel.logSessions} />
                </Modal>

            </View>
        );
    }

}

const styles = StyleSheet.create({

    filter : {
        height:40,
        width:40,
        borderRadius:30,
        backgroundColor : '#555',
        margin : 10
    },
    recordText : {
        marginTop : 10,
        color : '#fff',
        width : '100%',
        textAlign: 'center',
        fontWeight : 'bold',
        fontStyle : 'italic',
        fontSize : 30,
        textShadowColor : '#000',
        textShadowOffset : {width : 1,  height : 1},
        textShadowRadius : 4
    }

});