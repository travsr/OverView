import React, { Component } from 'react';
import {
    View,
    Image,
    ListView,
    RefreshControl,
    Text,
    Modal,
} from 'react-native';

import {ResultViewer} from '../container/ResultViewer';
import {ResultHeader} from '../container/ResultHeader';
import { DataManager } from '../../data/DataManager';
import { StyledButton } from '../presentation/StyledButton';
import { SessionHistory } from '../views/SessionHistory';
import { Colors } from '../../data/Styles';

export class History extends Component {

    static navigationOptions = {
        title: 'History' ,
        headerStyle : { backgroundColor: '#000' },
        headerTitleStyle : {color : '#fff'}
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

        this.showSessionModal = this.showSessionModal.bind(this);

    }
    _onRefresh() {
        this.setState({refreshing: true});

        this.dataManager.selectSession(this.state.selectedSessionIndex)
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


        return (
            <View style={{width: '100%',height : '100%'}}>

                <Image
                    source={require('../../images/app-bg2.png')}
                    resizeMode="cover"
                    style={{position:'absolute',top:0,left:0,width:'100%',height:'100%'}}
                />

                <ListView
                    dataSource={dataSource}
                    enableEmptySections={true}
                    renderHeader={()=>
                        <ResultHeader
                            session={this.dataManager.serverDataModel.selectedSession}
                            logEntries={this.dataManager.serverDataModel.selectedLogEntries} />
                    }
                    renderRow={(entry)=>
                        <ResultViewer entry={entry}/>
                    }
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh.bind(this)}
                        />
                    }
                />

                <StyledButton
                    style={{
                        position:'absolute',
                        right:10,bottom:10,
                        width : 120,
                        height: 30,
                        backgroundColor : Colors.lightBlue,
                        borderRadius : 30}}
                    textStyle={{color : '#fff'}}
                    title={"Previous Sessions"}
                    enabled={true}
                    onPress={this.showSessionModal}
                />

                <StyledButton
                    style={{
                        position:'absolute',
                        left:10,bottom:10,
                        width : 120,
                        height: 30,
                        backgroundColor : Colors.lightBlue,
                        borderRadius : 30}}
                    textStyle={{color : '#fff'}}
                    title={"Support the Devs"}
                    enabled={true}
                    onPress={()=>{
                        this.props.navigation.navigate("SupportDeveloper");
                    }}
                />

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