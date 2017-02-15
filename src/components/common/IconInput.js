import React, {Component} from 'react';
import {Item, Icon, Input} from 'native-base';

export default class IconInput extends Component {
    render() {
        const styles = {
            input: {
                textAlign: 'center',
                // paddingLeft: -50
            }
        };

        return (
            <Item>
                <Icon active name={this.props.icon} />
                <Input style={styles.input} placeholder={this.props.placeholder} {...this.props} />
            </Item>
        );
    }

}