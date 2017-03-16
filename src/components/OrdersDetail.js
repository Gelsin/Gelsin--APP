import React, {Component} from 'react';
import {Container, Content, Left, Body, Right, Text, Button, Icon, Header, Title} from 'native-base';
import CartItem from './common/CartItem';
import {Actions} from 'react-native-router-flux';

export default class OrdersDetail extends Component {
    constructor(props) {
        console.log("in constructor");
        super(props);
        this.state = {
            error: '', loading: false, products: this.props.products,
            price: this.props.price, data: this.props.date
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
                    <Title style={{alignSelf: 'center', color: '#e5ddcb'}}>Basket</Title>
                    </Body>

                    <Right style={{ flex: 1}}/>

                </Header>

                <Content  >
                    {/*{this.state.cart.map((product, i) => {*/}
                            {/*return (*/}
                                {/*<CartItem*/}
                                    {/*key={i}*/}
                                    {/*id={product.id}*/}
                                    {/*name={product.name}*/}
                                    {/*price={product.price}*/}
                                    {/*thumbnail={product.cover_url}*/}
                                    {/*quantity={product.quantity}*/}
                                {/*/>*/}
                            {/*);*/}
                        {/*}*/}
                    {/*)}*/}
                    <CartItem
                        name="Coca Cola"
                        price={0.80}
                        thumbnail="http://gelsin.az/app/api/product/image/30"
                        quantity="3"
                    />
                </Content>
            </Container>
        );
    }
}
