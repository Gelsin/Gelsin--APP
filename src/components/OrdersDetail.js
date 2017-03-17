import React, {Component} from 'react';
import {Container, Content, Left, Body, Right, Text, Button, Icon, Header, Title, FooterTab, Footer} from 'native-base';
import CartItem from './common/CartItem';
import {Actions} from 'react-native-router-flux';

export default class OrdersDetail extends Component {
    constructor(props) {
        console.log("in constructor");
        super(props);
        this.state = {
            error: '', loading: false, products: this.props.products,
            price: this.props.price, date: this.props.date
        };
        console.log(this.state);
    };

    componentWillMount() {
        console.log("will mount");
    };


    componentDidMount() {
        console.log("mounted");

    };


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
                        <Button transparent onPress={()=>Actions.ordersMain()}>
                            <Icon style={{color: '#e5ddcb'}} name='ios-arrow-round-back'/>
                        </Button>
                    </Left>

                    <Body style={{ flex: 7}}>
                    <Title style={{alignSelf: 'center', color: '#e5ddcb'}}>Order Details</Title>
                    </Body>

                    <Right style={{ flex: 1}}/>

                </Header>

                <Content >
                    {this.state.products.map((product, i) => {
                            return (
                                <CartItem
                                    key={i}
                                    id={product.related_product.id}
                                    name={product.related_product.name}
                                    price={product.price}
                                    thumbnail={product.related_product.cover_url}
                                    quantity={product.quantity}
                                />
                            );
                        }
                    )}
                </Content>

                <Footer >
                    <FooterTab style={{backgroundColor: '#e5ddcb', paddingLeft: 12, paddingRight: 12 }}>
                        <Left>
                            <Text style={{color: '#524656', fontFamily: 'SourceSansPro-Regular'}}>{this.state.date}</Text>
                        </Left>

                        <Right style={{   }}>
                            <Text style={{color: '#eb7b59', fontFamily: 'SourceSansPro-Regular'}}>{this.state.price} &#x20bc;</Text>
                        </Right>
                    </FooterTab>
                </Footer>
            </Container>
        );
    }
}
