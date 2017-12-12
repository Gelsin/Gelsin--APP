import React, {Component} from 'react';
import {AsyncStorage, Alert} from 'react-native';
import {Container, Content, Left, Body, Right, Text, Button, Icon, Header, Footer, Title, FooterTab} from 'native-base';
import CartItem from './common/CartItem';
import {Actions} from 'react-native-router-flux';

export default class Cart extends Component {
    constructor(props) {
        console.log("in constructor");
        super(props);
        this.state = {cart: [], total_price: 0, min_value: 0};
        console.log(this.state);
    };

    componentWillMount() {
        console.log("will mount");
    };


    componentDidMount() {
        console.log("mounted");
        this.getCart();
        this.getMinValue();
    };

    getMinValue () {
        fetch('http://gelsin.az/app/api/setting/min_order', {method: 'GET'})
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);

                this.setState({min_value:responseJson.value});
                console.log(this.state);
            })
            .catch((error) => {
                console.error(error);
            });
    }

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

                if (cart[i].quantity < 1) {
                    cart[i].quantity = 1;
                }
                else total_price = this.state.total_price + change * cart[i].price;
            }
        }
        this.setState({cart, total_price});
        this.saveToDevice();
    };

    deleteItem(item) {
        console.log(item, "must be deleted");

        cart = this.state.cart;
        index = cart.indexOf(item);
        console.log(index);
        delete cart[index];
        cart.splice(index, 1);

        total_price = this.state.total_price - item.price * item.quantity;

        this.setState( {cart, total_price} );
        this.saveToDevice();
    }

    emptyBasket = async () => {
        this.setState({cart: [], total_price: 0});
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

    proceed () {
        if (this.state.total_price < this.state.min_value) {
            alertTitle = 'You are below minimum value - ' + this.state.min_value + ' AZN' ;
            alertMessage = 'Please add more products worth ' + (parseFloat(this.state.min_value) - this.state.total_price) + ' AZN to proceed';
            Alert.alert(alertTitle, alertMessage);
        }
        else Actions.orderAddress({total_price: this.state.total_price})
    }


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
                width: 111,
                height: 33,
                justifyContent: 'center',
                padding: 0,
            },
            text: {
                fontFamily: 'SourceSansPro-Regular',
                margin: 0,
                padding: 0,
            }
        };

        return (
            <Container>
                <Header style={styles.header}>
                    <Left style={{ flex: 1}}>
                        <Button transparent onPress={()=>Actions.pop()}>
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
                                    delete={()=>this.deleteItem(product)}
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
                            <Button rounded style={styles.button} onPress={()=>this.proceed()}>
                                <Text style={styles.text}>Confirm</Text>
                            </Button>

                        </Right>
                    </FooterTab>
                </Footer>
            </Container>
        );
    }
}
