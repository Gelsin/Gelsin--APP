import React, {Component} from 'react';
import {ListView, TextInput, View, Image, Platform, TouchableOpacity, ScrollView, StyleSheet,Animated} from "react-native";
import {Header,Container,Body,Text,Icon,Right,Left,Item,Button,Input,Content,Card,CardItem,Thumbnail} from "native-base";
import {Actions} from 'react-native-router-flux';
import Product from './common/ProductItem';
export default class Products extends Component {


    constructor(props) {
        super(props);
        this.state = {
        }
    }
    getProducts()
    {

    }

    componentWillMount()
    {
        this.getProducts();
        console.log(this.props.data);
    }

    render() {


        const css = {
            "subCategoryRow": {
                "height": 40,
                "backgroundColor": '#524656',
                "paddingTop": 0,
                "marginLeft": 0,
                "marginBottom": 8,
                "flexDirection": "row"

            },
            "subCategoryBtn": {
                "backgroundColor": '#524656',
                borderWidth: 1,
                borderColor: '#FFF',
                height: 30,
                margin: 5
            },
            "searchBar": {
                "backgroundColor": 'green',
                "alignItems": 'center',
                "justifyContent": 'center',
            },
            "Product": {
                "height": 70,
                "borderWidth": 3,
                'flexWrap': 'wrap'

            }}

        return (
            <Container>
                <Header style={{"backgroundColor": '#524656'}}>
                    <Left>
                        <Icon name="ios-menu" style={{color: '#E5DDCB'}}></Icon>
                    </Left>
                    <Body>
                    <Text style={{letterSpacing: 0.5,color: '#E5DDCB'}}>GƏLSİN</Text>
                    </Body>
                    <Right>
                        <Text style={{top: -12,color: '#E5DDCB',fontSize: 14}}>12.50</Text>
                        <Button transparent onPress={()=>Actions.cart()}>
                            <Icon name="ios-cart-outline" style={{color: '#E5DDCB'}}></Icon>
                        </Button>
                    </Right>
                </Header>
                    <Item style={{backgroundColor: '#EB7B59',justifyContent: 'center',margin: 0}}>
                        <Icon name="search" style={{color: '#E5DDCB',marginLeft: 6}}></Icon>
                        <Input placeholder="search something" placeholderTextColor="rgba(255, 255, 255, 0.6)" style={{textAlign: 'center',color: '#FFF'}}/>
                    </Item>

                <View horizontal={true} style={css.subCategoryRow}>
                   <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    <Button rounded style={css.subCategoryBtn}>
                        <Text>Juice</Text>
                    </Button>
                    <Button rounded style={css.subCategoryBtn}>
                        <Text>Water</Text>
                    </Button>
                    <Button rounded style={css.subCategoryBtn}>
                        <Text>Ice tea</Text>
                    </Button>
                    <Button  rounded style={css.subCategoryBtn}>
                        <Text>Soda</Text>
                    </Button>
                    <Button  rounded  style={css.subCategoryBtn}>
                        <Text>Energy Drink</Text>
                    </Button>
                   </ScrollView>
                </View>

                <Content>
                <Card style={{flexDirection: 'row'}}>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}  pagingEnabled={true}
                                style={{borderWidth: 2, borderColor: 'green',height: 140}} >
                    <Product name="ice tea" thumbnail="http://gelsin.az/app/api/product/image/27" price="12.50 ₼"/>

                        <Product name="ice tea" thumbnail="http://gelsin.az/app/api/product/image/28" price="12.50 ₼"/>


                        <Product name="ice tea" thumbnail="http://gelsin.az/app/api/product/image/29" price="12.50 ₼"/>


                        <Product name="ice tea" thumbnail="http://gelsin.az/app/api/product/image/27" price="12.50 ₼"/>

                    </ScrollView>
                </Card>

                <Card style={{flexDirection: 'row'}}>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}  pagingEnabled={true}
                                style={{borderWidth: 2, borderColor: 'green',height: 140}} >
                        <Product name="ice tea" thumbnail="http://gelsin.az/app/api/product/image/27" price="12.50 ₼"/>


                        <Product name="ice tea" thumbnail="http://gelsin.az/app/api/product/image/27" price="12.50 ₼"/>


                        <Product name="ice tea" thumbnail="http://gelsin.az/app/api/product/image/27" price="12.50 ₼"/>
                    </ScrollView>
                </Card>

                <Card style={{flexDirection: 'row'}}>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}  pagingEnabled={true}
                                style={{borderWidth: 2, borderColor: 'green',height: 140}} >
                        <Product name="ice tea" thumbnail="http://gelsin.az/app/api/product/image/27" price="12.50 ₼"/>


                        <Product name="ice tea" thumbnail="http://gelsin.az/app/api/product/image/27" price="12.50 ₼"/>


                        <Product name="ice tea" thumbnail="http://gelsin.az/app/api/product/image/27" price="12.50 ₼"/>
                    </ScrollView>
                </Card>

                <Card style={{flexDirection: 'row'}}>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}  pagingEnabled={true}
                                style={{borderWidth: 2, borderColor: 'green',height: 140}} >
                        <Product name="ice tea" thumbnail="http://gelsin.az/app/api/product/image/27" price="12.50 ₼"/>


                        <Product name="ice tea" thumbnail="http://gelsin.az/app/api/product/image/27" price="12.50 ₼"/>


                        <Product name="ice tea" thumbnail="http://gelsin.az/app/api/product/image/27" price="12.50 ₼"/>
                    </ScrollView>
                </Card>

                <Card style={{flexDirection: 'row'}}>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}  pagingEnabled={true}
                                style={{borderWidth: 2, borderColor: 'green',height: 140}} >
                        <Product name="ice tea" thumbnail="http://gelsin.az/app/api/product/image/27" price="12.50 ₼"/>


                        <Product name="ice tea" thumbnail="http://gelsin.az/app/api/product/image/27" price="12.50 ₼"/>


                        <Product name="ice tea" thumbnail="http://gelsin.az/app/api/product/image/27" price="12.50 ₼"/>
                    </ScrollView>
                </Card>
                </Content>

            </Container>

        );


    }
}
