import React, {Component} from 'react';
import {Left, Body, Right, Thumbnail, Text, Button, Icon, Card, CardItem, View} from 'native-base';
// import Swipeout from 'rc-swipeout/lib';

export default class CartItem extends Component {
    renderDelete() {
        if (this.props.delete) {
            return (
                <Text style={{ alignSelf: 'flex-end', color: '#eb7b59', fontSize: 15, fontFamily: 'SourceSansPro-Regular'}}
                      onPress={this.props.delete}>Remove item</Text>
            )
        }
        return null;
    }

    renderChange() {
        if (this.props.increment) {
            return (
                <Right style={{flex:1, padding:0, margin: 0, justifyContent: 'center', alignItems: 'center' }}>
                    <Button style={{ padding:0, margin: 0,  height: 20, }} transparent
                            onPress={this.props.increment}>
                        <Icon style={{padding:0, margin: 0,  color: '#eb7b59'}} name="ios-arrow-up"/>
                    </Button>
                    <Text
                        style={{ padding:0, margin: 0,   color: '#e57b59', fontFamily: 'SourceSansPro-Semibold'}}> {this.props.quantity} </Text>
                    <Button style={{ padding:0, margin: 0,  height: 20}} transparent
                            onPress={this.props.decrement}>
                        <Icon style={{ padding:0, margin: 0,  color: '#e57b59'}} name="ios-arrow-down"/>
                    </Button>
                </Right>
            )
        }
        return (
            <Right style={{flex:1, padding:0, margin: 0, justifyContent: 'center', alignItems: 'center' }}>

                <Text
                    style={{ padding:0, margin: 0,   color: '#e57b59', fontFamily: 'SourceSansPro-Semibold'}}>x {this.props.quantity} </Text>

            </Right>
        );
    }


    render() {
        return (

            // <Swipeout
            //     right={[
            //         {
            //           text: 'sil',
            //           onPress:() => console.log('delete'),
            //           style: { backgroundColor: '#eb7b59', color: 'white',  }
            //         }
            //       ]}
            //     onOpen={() => console.log('open')}
            //     onClose={() => console.log('close')}
            //     style={{backgroundColor: 'transparent', marginTop: 6, marginBottom: 6 }}>
            //
            // </Swipeout>

            <View style={{marginLeft: 12, marginRight: 12, marginTop: 6, marginBottom: 6}}>
                <Card
                    style={{ elevation: 0, backgroundColor: '#e5ddcb', borderRadius: 4, margin:0 }}>
                    <CardItem bordered={true}
                              style={{ borderColor: '#e5ddcb', borderStyle: 'solid',  borderRadius: 4, margin: 0.5 }}>
                        <Left style={{flex:2}}>
                            <Thumbnail square size={50} source={{uri: this.props.thumbnail }}/>
                        </Left>

                        <Body style={{ flex:7, justifyContent: 'center'}}>
                        <Text
                            style={{alignSelf: 'flex-start', color: '#524656', fontSize:16, fontFamily: 'SourceSansPro-Semibold'}}> {this.props.name} </Text>
                        <Text
                            style={{ color: '#524656', fontSize: 15, fontFamily: 'SourceSansPro-Regular'}}> {this.props.price}
                            &#x20bc; </Text>
                        </Body>

                        {this.renderChange()}
                    </CardItem>
                </Card>

                {this.renderDelete()}
            </View>



        );
    }
}
