import React, {Component} from 'react';
import {Container, Content, Left, Body, Right, Text, Button, Icon, Header, Footer, Title, FooterTab} from 'native-base';
import CartItem from './common/CartItem';
import {Actions} from 'react-native-router-flux';

export default class Cart extends Component {
    render() {
        const styles = {
            header: {
                backgroundColor: '#524656',
                marginBottom: 10
            },
            footer: {
                flexDirection: 'column',
                height: 104
            },
            button: {
                alignSelf: 'flex-end',
                backgroundColor: '#e57b59',
                width: 90,
                height: 32,
                justifyContent: 'center',
                padding: 0,
            },
            text: {
                fontFamily: 'SourceSansPro-Regular'
            }
        };

        return (
            <Container>
                <Header style={styles.header}>
                    <Left style={{ flex: 1}}>
                        <Button transparent>
                            <Icon style={{color: '#e5ddcb'}} name='ios-arrow-round-back'/>
                        </Button>
                    </Left>

                    <Body style={{ flex: 7}}>
                    <Title style={{alignSelf: 'center', color: '#e5ddcb'}}>Basket</Title>
                    </Body>

                    <Right style={{ flex: 1}}/>

                </Header>

                <Content >
                    <CartItem
                        name="Coca Cola"
                        price={0.80}
                        thumbnail="http://gelsin.az/app/api/product/image/35"
                        quantity="333"
                    />

                    <CartItem
                        name="Coca Cola"
                        price={0.80}
                        thumbnail="http://gelsin.az/app/api/product/image/34"
                        quantity="3"
                    />

                    <CartItem
                        name="Coca Cola"
                        price={0.80}
                        thumbnail="http://gelsin.az/app/api/product/image/33"
                        quantity="3"
                    />

                    <CartItem
                        name="Coca Cola"
                        price={0.80}
                        thumbnail="http://gelsin.az/app/api/product/image/32"
                        quantity="3"
                    />

                    <CartItem
                        name="Coca Cola"
                        price={0.80}
                        thumbnail="http://gelsin.az/app/api/product/image/31"
                        quantity="3"
                    />

                    <CartItem
                        name="Coca Cola"
                        price={0.80}
                        thumbnail="http://gelsin.az/app/api/product/image/30"
                        quantity="3"
                    />

                    <CartItem
                        name="Coca Cola"
                        price={0.80}
                        thumbnail="http://gelsin.az/app/api/product/image/29"
                        quantity="3"
                    />

                    <CartItem
                        name="Coca Cola"
                        price={0.80}
                        thumbnail="http://gelsin.az/app/api/product/image/28"
                        quantity="3"
                    />

                    <CartItem
                        name="Fanta"
                        price={0.80}
                        thumbnail="http://gelsin.az/app/api/product/image/27"
                        quantity="66"
                    />
                </Content>

                <Footer style={styles.footer}>
                    <FooterTab style={{backgroundColor: '#e5ddcb', flex: 48, }}>
                        <Left>
                            <Button transparent style={{  }}>
                                <Text style={{color: '#524656'}}>Continue Shopping</Text>
                            </Button>
                        </Left>

                        <Right>
                            <Button transparent onPress={()=>Actions.ordersMain()} >
                                <Text style={{color: '#e57b59', textDecorationLine: 'line-through'}}>Empty Basket</Text>
                            </Button>
                        </Right>

                    </FooterTab>

                    <FooterTab style={{backgroundColor: '#524656', flex: 56, paddingLeft: 12, paddingRight: 12 }}>
                        <Left >
                            <Text style={{color: '#e5ddcb', fontFamily: 'SourceSansPro-Semibold', }} >Total amount</Text>
                            <Text style={{color: '#e57b59', fontFamily: 'SourceSansPro-Regular', fontSize: 18}}>32.50 &#x20bc;</Text>
                        </Left>

                        <Right style={{   }}>
                            <Button rounded style={styles.button} onPress={()=>Actions.orderAddress()}>
                                <Text style={styles.text}>Confirm</Text>
                            </Button>

                        </Right>
                    </FooterTab>
                </Footer>
            </Container>
        );
    }
}
