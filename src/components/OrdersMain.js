import React, {Component} from 'react';
import {AsyncStorage} from 'react-native';
import {Container, Content, Left, Body, Right, Text, Button, Icon, Header,  Title} from 'native-base';
import OrderItem from './common/OrderItem';
import {Actions} from 'react-native-router-flux';

export default class OrdersMain extends Component {
    constructor(props) {
        console.log("in constructor");
        super(props);
        this.state = { error: '', loading: false, token: '', orders: []};
        console.log(this.state);
    };

    componentWillMount() {
        console.log("will mount");
    };


    componentDidMount() {
        console.log("mounted");
        this.getToken();
    };

    getToken = async () => {
        try {
            var value = await AsyncStorage.getItem('@Gelsin:auth_user');

            if (value !== null){
                //console.log(value);
                this.setState({token: value});
                console.log(this.state.token);

                this.getOrders(this.state.token);
            } else {
                Actions.auth();
            }
        } catch (error) {
            console.log(error);
        }
    };

    getOrders(token) {
        console.log("getting orders");

        fetch('http://gelsin.az/app/api/orders?token=' + token, {method: 'GET'})
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                if (responseJson.orders.length > 0) {
                    this.setState({
                        orders: responseJson.orders
                    });
                }
                console.log(this.state);
            })
            .catch((error) => {
                console.error(error);
            });
    }

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
                        <Button transparent onPress={()=>Actions.category()}>
                            <Icon style={{color: '#e5ddcb'}} name='ios-arrow-round-back'/>
                        </Button>
                    </Left>

                    <Body style={{ flex: 7}}>
                    <Title style={{alignSelf: 'center', color: '#e5ddcb'}}>Orders</Title>
                    </Body>

                    <Right style={{ flex: 1}}/>

                </Header>

                <Content >
                    {this.state.orders.map((order, i) => {
                            return (
                                <OrderItem
                                    key={i}
                                    date={order.created_at}
                                    price={order.total_price}
                                    action={()=>Actions.ordersDetail({products: order.products, date: order.created_at, price: order.total_price})}
                                />
                            );
                        }
                    )}
                </Content>
            </Container>
        );
    }
}
