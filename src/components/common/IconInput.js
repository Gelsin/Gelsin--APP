import React, {Component} from 'react';
import {Item, Icon, Input} from 'native-base';

export default class IconInput extends Component {
    render() {

        return (
            <Item>
                <Icon active name={this.props.icon} />
                <Input placeholder={this.props.placeholder} {...this.props} />
            </Item>
        );
    }

}