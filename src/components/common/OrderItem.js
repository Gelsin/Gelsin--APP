import React, {Component} from 'react';
import {Body, Right, ListItem, Icon, Text, Button, View} from 'native-base';
import {Actions} from 'react-native-router-flux';

export default class OrderItem extends Component {
    render() {
        const styles = {
            text: {
                fontFamily: 'SourceSansPro-Regular',
                margin: 0,
                padding: 0
            },
            price: {
                fontFamily: 'SourceSansPro-Semibold',
                color: '#eb7b59',
            }
        };

        var status = "unknown"

        switch (this.props.status) {
            case 0:
                status = "pending...";
                break;
            case 1:
                status = "approved";
                break;
            case 2:
                status = "cancelled";
                break;
            case 3:
                status = "on the way)";
                break;
            case 4:
                status = "completed";
                break;
        }

        return (
            <ListItem onPress={this.props.action} style={{margin: 0, paddingRight: 0}}>
                <Body style={{paddingLeft: 12}} >
                <Text style={styles.text}>{this.props.date}</Text>
                <View style={{flexDirection: 'row', }}>
                    <Text style={styles.price}>{this.props.price} &#x20bc;    </Text>
                    <Text style={{fontFamily: 'SourceSansPro-Regular', color: '#888'}}>{status}</Text>
                </View>
                </Body>
                <Right >
                    <Button transparent onPress={this.props.action}>
                        <Icon style={{color: '#eb7b59'}} name="ios-arrow-forward-outline"></Icon>
                    </Button>
                </Right>
            </ListItem>
        );
    }
}