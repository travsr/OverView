import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ScrollView,
    Image,
    TouchableOpacity,
    ListView
} from 'react-native';

import { SessionItem } from '../container/SessionItem';
import { ResultHeader } from '../container/ResultHeader' ;
import { StyledButton } from '../presentation/StyledButton';
import {Colors} from '../../data/Styles';


export class SessionHistory extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {

        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        let dataSource = ds.cloneWithRows(this.props.sessions);


        return (
            <View style={{width: '100%',height:'100%'}}>
                <ListView
                    dataSource={dataSource}
                    enableEmptySections={true}
                    renderRow={(session)=>
                        <ResultHeader session={session} />
                    }
                />

                <StyledButton
                    onPress={()=>{
                        this.props.onClosePress();
                    }}
                    enabled={true}
                    style={{
                        position : 'absolute',
                        top : 10, left: 10,
                        height:30,
                        width: 50,
                        backgroundColor:Colors.lightBlue
                    }}
                    textStyle={{
                        color:'#fff',
                        fontSize:9
                    }}
                    title="back" />
            </View>
        );
    }
}


const styles = StyleSheet.create({

});