import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    TouchableOpacity
} from 'react-native';

import {
    CharacterPortrait
} from '../presentation/CharacterPortrait';

import {Colors} from '../../data/Styles';


export class CharacterSelect extends Component {

    constructor(props) {
        super(props) ;

        this.state = {
            type : "all"
        };

        this.characterPressed = this.characterPressed.bind(this);


    }
    characterPressed(character) {

        let selectedCharacters = this.props.selectedCharacters;

        // toggle selecting a character
        if(selectedCharacters.indexOf( character ) == -1) {
            selectedCharacters.push(character);
        }
        else {
            selectedCharacters.splice( selectedCharacters.indexOf(character), 1);
        }

        // call the callback upstream
        if(this.props.onCharacterSelect) {
            this.props.onCharacterSelect(selectedCharacters);
        }

    }
    isCharacterSelected(character) {
        return this.props.selectedCharacters.indexOf(character) != -1 || this.props.selectedCharacters.length == 0;
    }
    render() {

        return (
            <View style={{height: 204}}>
                <View style={{flexDirection : 'row'}}>

                    <TouchableOpacity
                        style={[styles.filterOption, this.state.type == "all" ? {backgroundColor:Colors.purple} : {} ]}
                        onPress={()=>{this.setState({type : "all"});  this.refs._scrollView.scrollTo(0,0);  }}>
                        <Text style={{color:'white', fontSize : 9}}>ALL</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.filterOption, this.state.type == "offense" ? {backgroundColor:Colors.purple} : {} ]}
                        onPress={()=>{this.setState({type : "offense"});  this.refs._scrollView.scrollTo(0,0); }}>
                        <Image style={styles.filterOptionImg} source={require('../../images/icons/char-offense.png')} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.filterOption, this.state.type == "defense" ? {backgroundColor:Colors.purple} : {} ]}
                        onPress={()=>{this.setState({type : "defense"});  this.refs._scrollView.scrollTo(0,0); }}>
                        <Image style={styles.filterOptionImg} source={require('../../images/icons/char-defense.png')} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.filterOption, this.state.type == "tank" ? {backgroundColor:Colors.purple} : {} ]}
                        onPress={()=>{this.setState({type : "tank"});  this.refs._scrollView.scrollTo(0,0); }}>
                        <Image style={styles.filterOptionImg} source={require('../../images/icons/char-tank.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.filterOption, this.state.type == "support" ? {backgroundColor:Colors.purple} : {} ]}
                        onPress={()=>{this.setState({type : "support"});  this.refs._scrollView.scrollTo(0,0); }}>
                        <Image style={styles.filterOptionImg} source={require('../../images/icons/char-support.png')} />
                    </TouchableOpacity>





                </View>
                <ScrollView ref="_scrollView" horizontal={true} pagingEnabled={false} style={{width:'100%',height:180}}>
                    <View style={{ flexWrap:'wrap',flexDirection:'column',height:180  }}>
                    {this.props.characterList.map((character, index) => {

                        let record = [0,0,0];
                        if(this.props.characterResults && this.props.characterResults[character.get('name')]) {

                            if(this.props.selectedMapObject && this.props.selectedMapObject.get('name')) {
                                let n = this.props.selectedMapObject.get('name');
                                record = this.props.characterResults[character.get('name')][n];
                            }
                            else {
                                record = this.props.characterResults[character.get('name')]['_all'];
                            }
                        }

                        if(character.get('type') == this.state.type || this.state.type == 'all') {

                            return (
                                <TouchableOpacity key={index} onPress={()=> {
                                    this.characterPressed(character)
                                }}>
                                    <View>
                                        <CharacterPortrait
                                            width={60}
                                            height={90}
                                            record={record}
                                            selected={this.isCharacterSelected(character)} character={character}/>
                                    </View>
                                </TouchableOpacity>
                            );
                        }
                    }
                    )}
                    </View>
                </ScrollView>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    filterOption : {
        flex: 1,
        height :24,
        backgroundColor: 'rgba(25,25,25,.75 )',
        alignItems: 'center',
        justifyContent : 'center',
        borderRightWidth:1,
        borderRightColor : 'rgba(255,255,255,.2)'
    },
    filterOptionImg : {
        height : 9,
        width:9
    }
});
