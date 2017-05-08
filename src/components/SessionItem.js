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

export class SessionItem extends Component {

    constructor(props) {
        super(props);

        this.state = {};

    }

    render() {
        return (
            <View>
                <SessionVis summary={this.props.session.get('summary')} />
            </View>
        );
    }
}


const styles = StyleSheet.create({

})