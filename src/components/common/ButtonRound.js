import React, {Component} from 'react';
import {Button, Text} from 'native-base';

export default class ButtonRound extends Component {
    render() {
        const styles = {
            button: {
                alignSelf: 'center',
                backgroundColor: this.props.color ? this.props.color : '#e57b59',
                width: 180,
                height: 42,
                justifyContent: 'center',
                marginTop: 30,
            }
        };

        return (
            <Button rounded style={styles.button} { ...this.props }>
                <Text>{this.props.text}</Text>
            </Button>
        );
    }

}