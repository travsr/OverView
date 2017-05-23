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

export class MapSelect extends Component {

    constructor(props) {
        super(props);

        this.state = {};
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
            <ScrollView horizontal={true} pagingEnabled={false} style={{height: 100, width: '100%'}}>
                <View style={{flexWrap: 'wrap', flexDirection: 'column', height: 100}}>
                    {this.props.mapList.map((mapObject, index) => {

                        let record = [0,0,0];
                        if(this.props.mapResults && this.props.mapResults[mapObject.get('name')]) {
                            record = this.props.mapResults[mapObject.get('name')]['_all'];
                        }

                        return(
                            <TouchableOpacity key={index} onPress={()=> { this.mapPressed(index)}}>
                                <View>
                                    <MapThumbnail
                                        record={record}
                                        mapObject={mapObject}
                                        selected={this.props.mapList[index] == this.props.selectedMapObject || this.props.selectedMapObject == null}/>
                                </View>
                            </TouchableOpacity>
                        );

                    })}
                </View>
            </ScrollView>
        );
    }
}