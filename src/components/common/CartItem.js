import React, {Component} from 'react';
import {Left, Body, Right, Thumbnail, Text, Button, Icon, Card, CardItem} from 'native-base';

export default class CartItem extends Component {
    render() {
        return (

            <Card style={{marginRight: 12, marginLeft: 12, elevation: 0, borderRadius: 10 }} >
                <CardItem  style={{ borderColor: '#e5ddcb', borderStyle: 'solid', borderWidth: 1,  }} >
                    <Left style={{flex:2}}>
                        <Thumbnail square size={50} source={{uri: this.props.thumbnail }}/>
                    </Left>

                    <Body style={{ flex:7, justifyContent: 'center'}}>
                    <Text style={{alignSelf: 'flex-start', color: '#524656', fontSize:16, fontFamily: 'SourceSansPro-Semibold'}}> {this.props.name} </Text>
                    <Text style={{ color: '#524656', fontSize: 15, fontFamily: 'SourceSansPro-Regular'}} > {this.props.price} &#x20bc; </Text>
                    </Body>
                    <Right style={{flex:1, padding:0, margin: 0, justifyContent: 'center', alignItems: 'center' }}>
                        <Button style={{ padding:0, margin: 0,  height: 20, }} transparent>
                            <Icon style={{padding:0, margin: 0,  color: '#e57b59'}} name="ios-arrow-up"/>
                        </Button>
                        <Text  style={{ padding:0, margin: 0,   color: '#e57b59', fontFamily: 'SourceSansPro-Semibold'}} > {this.props.quantity} </Text>
                        <Button style={{ padding:0, margin: 0,  height: 20}} transparent>
                            <Icon style={{ padding:0, margin: 0,  color: '#e57b59'}} name="ios-arrow-down"/>
                        </Button>
                    </Right>
                </CardItem>
            </Card>

        );
    }
}
