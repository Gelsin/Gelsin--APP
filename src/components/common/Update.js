import React, {Component} from 'react';
import {Modal, TouchableOpacity, TouchableWithoutFeedback, TextInput} from 'react-native';
import {Text, Input, View, Item} from 'native-base';
import ButtonRound from './ButtonRound';


export default class Update extends Component {
    // constructor(props) {
    //     super(props);
    //     this.focus = this.focus.bind(this);
    // }

    focus() {
        // Explicitly focus the text input using the raw DOM API
        this.refs.textInput.focus();
    }


    render() {
        const styles = {
            label: {
                fontFamily: 'SourceSansPro-Semibold',
                color: '#eb7b59'
            },
            input: {
                fontFamily: 'SourceSansPro-Regular',
                margin: 12
            }
        };

        return (
            <Modal
                visible={this.props.visible}
                transparent
                animationType='slide'
                onRequestClose={() => {
                }}
                onShow={ ()=> this.refs.textInput.focus() }
            >
                <TouchableOpacity
                    style={{backgroundColor: 'rgba(0,0,0,0.67)', justifyContent: "center", flex: 1}}
                    onPress={this.props.close}>

                    <TouchableWithoutFeedback>
                        <View style={{backgroundColor: '#fff', margin: 24, padding: 12}}>
                            <Text style={styles.label}>{this.props.label}</Text>

                            <TextInput
                                style={styles.input}
                                ref={'textInput'}
                                value={this.props.value}
                                onChangeText={this.props.onChange}
                            />

                            <ButtonRound width={123} text="Update" onPress={this.props.onPress}/>
                        </View>
                    </TouchableWithoutFeedback>

                </TouchableOpacity>
            </Modal>
        );
    }
}