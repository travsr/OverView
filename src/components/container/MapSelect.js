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

import { MapThumbnail } from '../presentation/MapThumbnail';
import {Colors} from '../../data/Styles';

export class MapSelect extends Component {

    constructor(props) {
        super(props);

        this.state = {
            type : "all"
        };
    }

    mapPressed(index) {

        let mapObject = null;

        // Toggle map on or off
        if (this.props.mapList[index] == this.props.selectedMapObject) {
            mapObject = null;
        }
        else {
            mapObject = this.props.mapList[index];
        }

        if (this.props.onMapSelect) {
            this.props.onMapSelect(mapObject);
        }
    }

    render() {

        return (
            <View>
                <View style={{flexDirection : 'row'}}>

                    <TouchableOpacity
                        style={[styles.filterOption, this.state.type == "all" ? {backgroundColor : Colors.purple} : {}]}
                        onPress={()=>{this.setState({type : "all"})}}>
                        <Text style={styles.filterOptionText}>ALL</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.filterOption, this.state.type == "assault" ? {backgroundColor : Colors.purple} : {}]}
                        onPress={()=>{this.setState({type : "assault"})}}>
                        <Text style={styles.filterOptionText}>Assault</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.filterOption, this.state.type == "koth" ? {backgroundColor : Colors.purple} : {}]}
                        onPress={()=>{this.setState({type : "koth"})}}>
                        <Text style={styles.filterOptionText}>Control</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.filterOption, this.state.type == "hybrid" ? {backgroundColor : Colors.purple} : {}]}
                        onPress={()=>{this.setState({type : "hybrid"})}}>
                        <Text style={styles.filterOptionText}>Hybrid</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.filterOption, this.state.type == "payload" ? {backgroundColor : Colors.purple} : {}]}
                        onPress={()=>{this.setState({type : "payload"})}}>
                        <Text style={styles.filterOptionText}>Payload</Text>
                    </TouchableOpacity>

                </View>
                <ScrollView horizontal={true} pagingEnabled={false} style={{height: 100, width: '100%'}}>
                    <View style={{flexWrap: 'wrap', flexDirection: 'column', height: 100}}>
                        {this.props.mapList.map((mapObject, index) => {

                            let record = [0,0,0];
                            if(this.props.mapResults && this.props.mapResults[mapObject.get('name')]) {
                                record = this.props.mapResults[mapObject.get('name')]['_all'];
                            }

                            if(mapObject.get('type') == this.state.type || this.state.type == 'all') {

                                return (
                                    <TouchableOpacity key={index} onPress={()=> {
                                        this.mapPressed(index)
                                    }}>
                                        <View>
                                            <MapThumbnail
                                                record={record}
                                                mapObject={mapObject}
                                                selected={this.props.mapList[index] == this.props.selectedMapObject || this.props.selectedMapObject == null}/>
                                        </View>
                                    </TouchableOpacity>
                                );
                            }

                        })}
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    filterOption : {
        flex: 1,
        height : 30,
        backgroundColor: 'rgba(25,25,25,.4 )',
        alignItems: 'center',
        justifyContent : 'center',
        borderRightWidth:1,
        borderRightColor : 'rgba(255,255,255,.2)',
        borderTopWidth:1,
        borderTopColor : 'rgba(255,255,255,.2)'
    },
    filterOptionText : {
        color : '#fff',
        fontSize : 9
    }
});