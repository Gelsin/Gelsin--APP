import React, { Component } from 'react';
import { Body, Right, ListItem, Icon, Text, Button } from 'native-base';
import {Actions} from 'react-native-router-flux';

export default class OrderItem extends Component {
    render() {
        const styles = {
            text: {
                fontFamily: 'SourceSansPro-Regular',
            },
            price: {
                fontFamily: 'SourceSansPro-Semibold',
                color: '#eb7b59',
            }
        };

        return (
                    <ListItem onPress={this.props.action} style={{  margin: 0, paddingRight: 0 }} >
                        <Body  >
                        <Text style={styles.text}>{this.props.date}</Text>
                        <Text   style={styles.price}>{this.props.price} &#x20bc;</Text>
                        </Body>
                        <Right >
                            <Button transparent  onPress={this.props.action}>
                                <Icon style={{color: '#eb7b59'}} name="ios-arrow-forward-outline"></Icon>
                            </Button>
                        </Right>
                    </ListItem>
        );
    }
}