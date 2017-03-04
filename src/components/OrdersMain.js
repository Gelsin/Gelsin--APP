import React, {Component} from 'react';
import {Container, Content, Left, Body, Right, Text, Button, Icon, Header,  Title} from 'native-base';
import OrderItem from './common/OrderItem';
import {Actions} from 'react-native-router-flux';

export default class OrdersMain extends Component {
    render() {
        const styles = {
            header: {
                backgroundColor: '#524656',
                marginBottom: 10
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
                            <Icon style={{color: '#e5ddcb'}} name='ios-menu'/>
                        </Button>
                    </Left>

                    <Body style={{ flex: 7}}>
                    <Title style={{alignSelf: 'center', color: '#e5ddcb'}}>Basket</Title>
                    </Body>

                    <Right style={{ flex: 1}}/>

                </Header>

                <Content >
                    <OrderItem/>
                    <OrderItem/>
                    <OrderItem/>
                </Content>
            </Container>
        );
    }
}
