import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ScrollView,
    Image,
    TouchableOpacity
} from 'react-native';

import { SessionVis } from './SessionVis';

let TimeAgo = require('react-native-timeago');

export class SessionItem extends Component {

    constructor(props) {
        super(props);

        this.state = {};

    }

    render() {
        return (
            <View>
                <SessionVis summary={this.props.session.get('summary')}  style={{width: '100%',height:40}}/>
            </View>
        );
    }
}


const styles = StyleSheet.create({

})