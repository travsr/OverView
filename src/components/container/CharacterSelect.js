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


export class CharacterSelect extends Component {

    constructor(props) {
        super(props) ;

        this.state = {};

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
            <ScrollView horizontal={true} pagingEnabled={false} style={{width:'100%',height:180}}>
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

                    return(
                        <TouchableOpacity  key={index}  onPress={()=>{this.characterPressed(character)}}>
                            <View>
                                <CharacterPortrait
                                    width={60}
                                    height={90}
                                    record={record}
                                    selected={this.isCharacterSelected(character)} character={character}  />
                            </View>
                        </TouchableOpacity>
                    );
                }
                )}
                </View>
            </ScrollView>
        );
    }
}
