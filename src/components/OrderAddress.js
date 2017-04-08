import React, {Component} from 'react';
import {AsyncStorage, Alert} from 'react-native';
import {
    Container,
    Content,
    ListItem,
    Text,
    Radio,
    Right,
    Left,
    Body,
    Separator,
    Header,
    Button,
    Icon,
    Title,
    StyleProvider,
    FooterTab,
    Footer
} from 'native-base';
import radioTheme from '../../native-base-theme/components/';
import platform from '../../native-base-theme/variables/platform';
import {Actions} from 'react-native-router-flux';

export default class OrderAddress extends Component {
    constructor(props) {
        console.log("in constructor");
        super(props);
        this.state = {
            cart: [], products: [], total_price: this.props.total_price, token: '', addresses: [], selectedIndex: 0,
            selectedAddress: '', error: ''
        };
        console.log(this.state);
    };

    componentWillMount() {
        console.log("will mount");
    };


    componentDidMount() {
        console.log("mounted");
        this.getToken();
        this.getCart();

    };

    getToken = async() => {
        try {
            var value = await AsyncStorage.getItem('@Gelsin:auth_user');
            if (value !== null) {
                //console.log(value);
                this.setState({token: value});
                console.log(this.state.token);

                this.getAddresses(this.state.token);

            } else {
                Actions.signIn();
            }
        } catch (error) {
            console.log(error);
        }
    };

    getCart = async() => {
        try {
            var value = await AsyncStorage.getItem('@Gelsin:Cart');
            if (value !== null) {
                console.log(value);
                cart = JSON.parse(value);
                // console.log(cart);
                this.setState({cart});
                console.log(this.state.cart)

                products = this.state.products;

                for (i = 0; i < cart.length; i++) {
                    products.push({
                        product_id: cart[i].id,
                        quantity: cart[i].quantity,
                        price: cart[i].price
                    });
                }

                this.setState({products});
                console.log(this.state.products);

            } else {
                console.log(value);
            }
        } catch (error) {
            console.log(error);
        }
    };

    getAddresses(token) {
        console.log("getting user addresses");

        fetch('http://gelsin.az/app/api/addresses?token=' + token, {method: 'GET'})
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                this.setState({addresses: responseJson.address});
                if (this.state.addresses.length > 0) {
                    this.setState({
                        selectedAddress: this.state.addresses[0].address_line + ',' + this.state.addresses[0].branch_address.street_name
                    });
                }
                console.log(this.state);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    onButtonPress() {
        console.log('button pressed');

        address = this.state.selectedAddress;
        delivery_is_now = 1;
        notes = "Static note";
        products = this.state.products;

        rbody = {
            address,
            delivery_is_now,
            notes,
            products
        };
        console.log(rbody);
        console.log(JSON.stringify(rbody));

        fetch('http://gelsin.az/app/api/order/add', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + this.state.token,
                'Accept': 'application/json',
                'Content-Type': 'application/json',

            },
            body: JSON.stringify(rbody)
        })
            .then((response) => response.json()
                .then((responseData) => {
                    console.log("inside responsejson");
                    console.log('response object:', responseData);

                    switch (responseData.error) {
                        case false: {
                            this.onSuccess();
                            break;
                        }

                        default: {
                            this.setState({error: responseData.message});
                        }
                    }
                })
                .catch((error) => {
                    console.log(error);
                })
            )
            .catch((error) => {
                console.log(error);
            });
    };

    onSuccess = async() => {
        this.setState({
            cart: [],
            total_price: 0,
        });

        alertTitle = 'Success' ;
        alertMessage = 'Order completed successfully';
        Alert.alert(alertTitle, alertMessage);

        try {
            await AsyncStorage.removeItem('@Gelsin:Cart');
        } catch (error) {
            this.setState({error: error.message});
        }

        Actions.ordersMain({message: alertMessage});
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
                backgroundColor: '#eb7b59',
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
            <StyleProvider style={radioTheme(platform)}>
                <Container>
                    <Header style={styles.header}>
                        <Left style={{ flex: 1}}>
                            <Button transparent onPress={()=>Actions.cart()}>
                                <Icon style={{color: '#e5ddcb'}} name='ios-arrow-round-back'/>
                            </Button>
                        </Left>

                        <Body style={{ flex: 7}}>
                        <Title style={{alignSelf: 'center', fontSize: 16, color: '#e5ddcb'}}>Address</Title>
                        </Body>

                        <Right style={{ flex: 1}}/>
                    </Header>

                    <Content>
                        <Separator style={{backgroundColor: '#fff'}}>
                            <Text
                                style={{ fontFamily: 'SourceSansPro-Semibold', fontSize: 16, color: '#eb7b59'}}>Choose an address</Text>
                        </Separator>

                        {this.state.addresses.map((address, i) => {
                                return (
                                    <ListItem selected={this.state.selectedIndex==i} key={i}
                                              onPress={()=>this.setState({selectedIndex: i,
                                        selectedAddress: address.address_line + ',' + address.branch_address.street_name },
                                        ()=>console.log(this.state.selectedAddress))}>
                                        <Left style={{ flex: 1}}>
                                            <Radio selected={this.state.selectedIndex==i}
                                                   onPress={()=>this.setState({selectedIndex: i,
                                        selectedAddress: address.address_line + ',' + address.branch_address.street_name },
                                        ()=>console.log(this.state.selectedAddress))}
                                            />
                                        </Left>
                                        <Body style={{ flex: 9, }}>
                                        <Text
                                            style={{alignSelf: 'flex-start', marginLeft: 0, fontFamily: 'SourceSansPro-Regular'}}>
                                            {address.address_line}, {address.branch_address.street_name}
                                        </Text>
                                        </Body>
                                    </ListItem>
                                );
                            }
                        )}


                    </Content>

                    <Footer style={styles.footer}>
                        <FooterTab style={{backgroundColor: '#e5ddcb', flex: 48, }}>
                            <Left>
                                <Button transparent style={{  }} onPress={()=>Actions.addresses()}>
                                    <Icon style={{color: '#524656'}} name="ios-add-circle-outline"/>
                                    <Text style={{color: '#524656', fontFamily: 'SourceSansPro-Regular'}}>Add new address</Text>
                                </Button>
                            </Left>
                        </FooterTab>

                        <FooterTab style={{backgroundColor: '#524656', flex: 56, paddingLeft: 12, paddingRight: 12 }}>
                            <Left >
                                <Text
                                    style={{color: '#e5ddcb', fontFamily: 'SourceSansPro-Semibold', }}>Total amount</Text>
                                <Text
                                    style={{color: '#e57b59', fontFamily: 'SourceSansPro-Regular', fontSize: 18}}>{this.state.total_price}
                                    &#x20bc;</Text>
                            </Left>

                            <Right style={{   }}>
                                <Button rounded style={styles.button} onPress={this.onButtonPress.bind(this)}>
                                    <Text style={styles.text}>Confirm</Text>
                                </Button>
                            </Right>
                        </FooterTab>
                    </Footer>
                </Container>
            </StyleProvider>

        );
    }
}
