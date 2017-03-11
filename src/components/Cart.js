import React, {Component} from 'react';
import {AsyncStorage} from 'react-native';
import {Container, Content, Left, Body, Right, Text, Button, Icon, Header, Footer, Title, FooterTab} from 'native-base';
import CartItem from './common/CartItem';
import {Actions} from 'react-native-router-flux';

export default class Cart extends Component {
    constructor(props) {
        console.log("in constructor");
        super(props);
        this.state = {cart: [], total_price: 0};
        console.log(this.state);
    };

    componentWillMount() {
        console.log("will mount");
    };


    componentDidMount() {
        console.log("mounted");
        this.getCart();
    };

    getCart = async() => {
        try {
            var value = await AsyncStorage.getItem('@Gelsin:Cart');
            if (value !== null) {
                console.log(value);
                cart = JSON.parse(value);
                console.log(cart);
                this.setState({cart});
                console.log(this.state.cart)
                this.calcPrice();

            } else {
                console.log(value);
            }
        } catch (error) {
            console.log(error);
        }
    };

    calcPrice () {
        total_price = 0;
        cart = this.state.cart;
        for (i = 0; i < cart.length; i++) {
            total_price += cart[i].price * cart[i].quantity;
        }
        this.setState({total_price});
    }

    changeQuantity (id, change) {
        cart = this.state.cart;

        for (i = 0; i < cart.length; i++) {
            if (cart[i].id == id) {
                cart[i].quantity += change;

                total_price = this.state.total_price + change * cart[i].price;
            }
        }
        this.setState({cart, total_price});
        this.saveToDevice();
    };

    emptyBasket = async () => {
        this.setState({cart: []});
        try {
            await AsyncStorage.removeItem('@Gelsin:Cart');
        } catch (error) {
            this.setState({error: error.message});
        }
    };

    saveToDevice = async() => {
        try {
            await AsyncStorage.setItem('@Gelsin:Cart', JSON.stringify(this.state.cart));
        } catch (error) {
            console.log(error);
        }
    };


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
                    {this.state.cart.map((product, i) => {
                            return (
                                <CartItem
                                    key={i}
                                    id={product.id}
                                    name={product.name}
                                    price={product.price}
                                    thumbnail={product.cover_url}
                                    quantity={product.quantity}
                                    increment={()=>this.changeQuantity(product.id, +1)}
                                    decrement={()=>this.changeQuantity(product.id, -1)}
                                />
                            );
                        }
                    )}
                </Content>

                <Footer style={styles.footer}>
                    <FooterTab style={{backgroundColor: '#e5ddcb', flex: 48, }}>
                        <Left>
                            <Button transparent style={{  }} onPress={()=>Actions.category()}>
                                <Text style={{color: '#524656'}}>Continue Shopping</Text>
                            </Button>
                        </Left>

                        <Right>
                            <Button transparent onPress={this.emptyBasket.bind(this)}>
                                <Text style={{color: '#e57b59', textDecorationLine: 'line-through'}}>Empty Basket</Text>
                            </Button>
                        </Right>

                    </FooterTab>

                    <FooterTab style={{backgroundColor: '#524656', flex: 56, paddingLeft: 12, paddingRight: 12 }}>
                        <Left >
                            <Text style={{color: '#e5ddcb', fontFamily: 'SourceSansPro-Semibold', }}>Total amount</Text>
                            <Text style={{color: '#e57b59', fontFamily: 'SourceSansPro-Regular', fontSize: 18}}>{this.state.total_price} &#x20bc;</Text>
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
