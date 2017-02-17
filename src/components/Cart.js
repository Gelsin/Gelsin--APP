import React, { Component } from 'react';
import { Container, Content, Left, Body, Right, Text, Button, Icon, Header, Footer, Title, FooterTab } from 'native-base';
import CartItem from './common/CartItem';

export default class Cart extends Component {
    render() {
        const styles = {
            header: {
                backgroundColor: '#524656',
            },
            footer: {
                backgroundColor: '#524656'
            }
        };

        return (
            <Container>
                <Header style={styles.header}>
                    <Left style={{ flex: 1}}>
                        <Button transparent>
                            <Icon name='arrow-back'/>
                        </Button>
                    </Left>

                    <Body style={{ flex: 7}}>
                    <Title style={{alignSelf: 'center'}}>Header</Title>
                    </Body>

                    <Right style={{ flex: 1}}>
                        <Button transparent>
                            <Icon name='menu'/>
                        </Button>
                    </Right>
                </Header>

                <Content>
                    <CartItem
                        name="Coca Cola"
                        price="0.80 m"
                        thumbnail="http://gelsin.az/app/api/product/image/1"
                        quantity="3"
                    />

                    <CartItem
                        name="Fanta"
                        price="0.80 m"
                        thumbnail="http://gelsin.az/app/api/product/image/2"
                        quantity="2"
                    />
                </Content>

                <Footer style={styles.footer}>
                    <FooterTab>
                        <Button full style={{flexDirection: 'row'}}>
                            <Icon name='add' />
                            <Text>Total amount</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        );
    }
}
