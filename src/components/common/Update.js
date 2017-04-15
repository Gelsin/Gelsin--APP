import React, {Component} from 'react';
import {Modal, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import {Text, Input, View, Item} from 'native-base';
import ButtonRound from './ButtonRound';


export default class Update extends Component {
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
            >
                <TouchableOpacity
                    style={{backgroundColor: 'rgba(0,0,0,0.67)', justifyContent: "center", flex: 1}}
                    onPress={this.props.close}>

                    <TouchableWithoutFeedback>
                        <View style={{backgroundColor: '#fff', margin: 24, padding: 12}}>
                            <Text style={styles.label}>{this.props.label}</Text>

                            <Input
                                style={styles.input}
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