import React, { Component } from 'react';
import {
    View,
    Image,
    ListView,
    RefreshControl,
    ActivityIndicator,
    TouchableOpacity,
    Text,
    TextInput,
    Modal,
    StyleSheet,
    Animated,
    Easing
} from 'react-native';

import Drawer from 'react-native-drawer';
import ModalPicker from 'react-native-modal-picker';

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
            sessionModalVisible: false,
            pickerText : "This Session"
        };

        this.dataManager.onDataChange(() => {
            this.setState(this.state);
        });

        this.showSessionModal = this.showSessionModal.bind(this);
        this._onRefresh = this._onRefresh.bind(this);
        this.onDateRangePickerChange = this.onDateRangePickerChange.bind(this);
        this.loadOlderEntries = this.loadOlderEntries.bind(this);


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

        this.dataManager.getSessionInRange(this.dataManager.serverDataModel.entryStartDate, this.dataManager.serverDataModel.entryEndDate)
            .then(()=> {
                this.setState({refreshing: false});
            })
            .done(()=> {
                this.setState({refreshing: false});
            });

        // In order to update the log session record entries,
        // Get log sessions again in background
        this.dataManager.getLogSessions();
    }

    loadOlderEntries() {

        let sDate = this.dataManager.serverDataModel.entryStartDate;
        let eDate = this.dataManager.serverDataModel.entryEndDate;
        sDate = new Date(sDate.getTime() - 604800000 );

        let monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"
        ];

        let sDateText = monthNames[sDate.getMonth()] + " " + sDate.getDate();
        let eDateText = monthNames[eDate.getMonth()] + " " + eDate.getDate();



        this.setState({
            refreshing : true,
            pickerText : eDateText + " - " + sDateText
        });
        this.dataManager.getSessionInRange(sDate, eDate).done(()=>{
            this.setState({refreshing : false});
        });
    }

    onDateRangePickerChange(value) {


        this.setState({pickerText : value, refreshing : true});

        if(value == "This Session") {
            this.dataManager.selectSession(0)
                .done(()=>{this.setState({refreshing:false});});
        }
        else if(value == "Past 7 Days") {
            let eDate = new Date();
            let sDate = new Date(eDate.getTime() - 604800000 );
            this.dataManager.getSessionInRange(sDate, eDate )
                .done(()=>{this.setState({refreshing:false});});
        }
        else if(value == "Past 30 Days") {
            let eDate = new Date();
            let sDate = new Date(eDate.getTime() - 2592000000 );
            this.dataManager.getSessionInRange(sDate, eDate )
                .done(()=>{this.setState({refreshing:false});});
        }
        else if(value == "Season 5") {
            let eDate = new Date("8/28/17");
            let sDate = new Date("5/31/17");
            this.dataManager.getSessionInRange(sDate, eDate)
                .done(()=>{this.setState({refreshing:false});});
        }
        else if(value == "Season 6") {
            let eDate = new Date("10/01/17");
            let sDate = new Date("9/01/17");
            this.dataManager.getSessionInRange(sDate, eDate)
                .done(()=>{this.setState({refreshing:false});});
        }

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

        // Animation vars
        const expandH = this.expandHeight.interpolate({
            inputRange : [0, 1],
            outputRange : [60, 200]
        });

        // Record & summary
        let session = this.dataManager.serverDataModel.selectedSession;

        let recordText = "0-0";
        let summary = [];

        if(session && session.get) {
            recordText = session.get('win') + "-" + session.get('loss');
            if(session.get('draw') && session.get('draw') > 0)
                recordText += '-' + session.get('draw');
            summary =  session.get('summary');
        }


        // picker text
        let i = 0;
        const pickerData = [
            {key : i++, section : true, label : 'Select Time Range'},
            {key : i++, label : 'This Session'},
            {key : i++, label : 'Past 7 Days'},
            {key : i++, label : 'Past 30 Days'},
            {key : i++, label : 'Season 5'},
            {key : i++, label : 'Season 6'},
        ];

        return (
            <Drawer
                ref={(ref) => this._drawer = ref}
                type={"displace"}
                side={"top"}
                panOpenMask={.00}
                panThreshold={.10}
                captureGestures={false}
                openDrawerOffset={(viewport) => viewport.height - 200}
                content={<View style={{height: 200, width:'100%', backgroundColor:'#222'}}/>}
            >
            <View style={{width: '100%',height : '100%', backgroundColor : 'rgb(97, 91, 181)'}}>

                <Image
                    source={require('../../images/app-bg2.png')}
                    resizeMode="cover"
                    style={{position:'absolute',top:0,left:0,width:'100%',height:'100%', opacity: .4}}
                />


                <View style={{
                    backgroundColor:'#222',
                    height : 60,
                    width : '100%',
                    flexDirection : 'row'
                }}>
                    {/*<TouchableOpacity style={styles.filter} onPress={()=>{this._drawer.open();}}>*/}
                        {/*<Image style={{height : 20, width: 20, margin: 10}} resizeMode="contain" source={require('../../images/icons/list.png')} />*/}
                    {/*</TouchableOpacity>*/}

                    <ModalPicker
                        data={pickerData}
                        initValue="This Session"
                        onChange={(option)=>{this.onDateRangePickerChange(option.label)}}>

                        <TextInput
                            style={{color: '#fff', padding:10, height:60, width: 150, borderWidth : 0}}
                            editable={false}
                            placeholder="Select Date Range"
                            value={this.state.pickerText} />

                    </ModalPicker>
                    <Text style={{color : '#fff',marginTop: 25, marginLeft: -10, fontSize : 8}}>▼</Text>




                    <TouchableOpacity onPress={this.showSessionModal} style={{flexDirection:'column', position: 'absolute', right : 10}}>
                        <Text style={styles.recordText}>{recordText}</Text>
                        <SessionVis summary={summary}
                                    style={{width:'100%', height: 5, marginTop: 10 }}/>
                    </TouchableOpacity>
                </View>


                <View style={{flex:1}}>



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
                            <View style={{backgroundColor : Colors.purple, height: 60, flex : 1, flexDirection:'row',alignItems:'center',justifyContent:'center'}}>

                                {!this.state.refreshing &&
                                    <StyledButton
                                        enabled={true}
                                        title="Load Older Entries"
                                        style={{width : 150, height: 30, backgroundColor : '#857fd8', borderRadius: 5 }}
                                        textStyle={{color : '#fff'}}
                                        onPress={this.loadOlderEntries}/>
                                }
                                {this.state.refreshing &&
                                    <ActivityIndicator/>
                                }
                            </View>
                        }
                    />
                </View>

                {/*<StyledButton*/}
                    {/*style={{*/}
                        {/*position:'absolute',*/}
                        {/*right:10,bottom:10,*/}
                        {/*width : 140,*/}
                        {/*height: 30,*/}
                        {/*backgroundColor : Colors.lightBlue,*/}
                        {/*borderRadius : 30}}*/}
                    {/*textStyle={{color : '#fff'}}*/}
                    {/*title={"Previous Sessions"}*/}
                    {/*enabled={true}*/}
                    {/*onPress={this.showSessionModal}*/}
                {/*/>*/}

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
                        onItemSelect={(index)=>{
                            this.setState({pickerText : "Old Session",refreshing : true});
                            this.dataManager.selectSession(index)
                                .done(()=>{
                                    this.setState({refreshing : false});
                                });
                            this.closeModal();
                        }}
                        sessions={this.dataManager.serverDataModel.logSessions} />
                </Modal>

                {
                    this.state.refreshing &&
                    <View style={{
                        position:'absolute',
                        left : '50%',
                        marginLeft : -20,
                        top : 70,
                        backgroundColor: '#fff',
                        width: 40,
                        height: 40,
                        borderRadius: 4,
                        alignItems : 'center',
                        justifyContent: 'center'
                    }}>
                        <ActivityIndicator />
                    </View>
                }

            </View>
            </Drawer>
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