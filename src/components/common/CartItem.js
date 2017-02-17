import React, {Component} from 'react';
import { Left, Body, Right, ListItem, Thumbnail, Text, Button, Icon} from 'native-base';

export default class CartItem extends Component {
    render() {
        return (

            <ListItem  thumbnail>
                <Left>
                    <Thumbnail square size={50} source={{uri: this.props.thumbnail }} />
                </Left>
                <Body>
                <Text> {this.props.name} </Text>
                <Text note> {this.props.price} </Text>
                </Body>
                <Right style={{height: 100}} >
                    <Button transparent>
                        <Icon name="ios-arrow-up" />
                    </Button>
                    <Text style={{paddingRight: 22}} note> {this.props.quantity} </Text>
                    <Button transparent>
                        <Icon name="ios-arrow-down" />
                    </Button>
                </Right>
            </ListItem>

        );
    }
}
