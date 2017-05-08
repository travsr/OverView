import React, { Component } from 'react';
import {
    View,
    Image,
    ListView,
    RefreshControl,
    Text
} from 'react-native';

import {ResultViewer} from '../components/ResultViewer';
import {ResultHeader} from '../components/ResultHeader';
import { DataManager } from '../components/DataManager';

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
            selectedSessionIndex : 0
        };

        this.dataManager.onAfterLoad(() => {
            this.setState(this.state);
        });
        // this.dataManager.selectSession().then(()=>{
        //     this.setState(this.state);
        // },(err)=>{
        //
        // });

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
    render() {

        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        let dataSource = ds.cloneWithRows(this.dataManager.serverDataModel.selectedLogEntries);


        return (
            <View style={{width: '100%',height : '100%'}}>

                <ListView
                    dataSource={dataSource}
                    enableEmptySections={true}
                    renderHeader={()=><ResultHeader session={this.dataManager.serverDataModel.selectedSession} logEntries={this.dataManager.serverDataModel.selectedLogEntries} /> }
                    renderRow={(entry)=><ResultViewer entry={entry}/>}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh.bind(this)}
                        />
                    }
                />
            </View>
        );
    }

}