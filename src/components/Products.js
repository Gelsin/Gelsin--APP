import React, {Component} from 'react';
import {ListView, TextInput, View, Image, Platform, TouchableOpacity, ScrollView, StyleSheet,Animated,ActivityIndicator} from "react-native";
import {Header,Container,Body,Text,Icon,Right,Left,Item,Button,Input,Content,Card,CardItem} from "native-base";
import {Actions} from 'react-native-router-flux';
import Product from './common/ProductItem';


export default class Products extends Component {



    constructor(props) {
        super(props);
        this.state = {
            SubCategories: null,
            isLoading: true
        }
    }

    getProducts()
    {

    }

    getSubCategories()
    {
        CatId = this.props.data;
        var Url = "http://gelsin.az/app/api/categories/" + CatId;
        return fetch(Url, {method: "GET"})
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({SubCategories: responseData.category.childs});
                this.setState({isLoading: false});
            })
            .done();
        console.log(this.setState.SubCategories);

    }

    componentWillMount()
    {
        this.getSubCategories();
    }

    render() {
        if(this.state.SubCategories === null) {
            return <Header  action={()=>Actions.products(this.props.data)} newsLayoutButton={true} />
        }

        const css = {
            "subCategoryRow": {
                "height": 48,
                "backgroundColor": '#524656',
                "paddingTop": 0,
                "marginLeft": 0,
                "marginBottom": 8,
                "flexDirection": "row",
                alignItems: 'center'
            },
            "subCategoryBtn": {
                "backgroundColor": '#524656',
                borderWidth: 1,
                borderColor: '#E5DDCB',
                height: 30,
                margin: 5,
                paddingLeft: 15,
                paddingRight: 15
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
                <ActivityIndicator animating={this.state.isLoading}></ActivityIndicator>
                <Header style={{"backgroundColor": '#524656'}}>
                    <Left>
                    <Button transparent>
                        <Icon name="ios-arrow-round-back-outline" style={{color: '#E5DDCB'}}></Icon>
                    </Button>
                    </Left>
                    <Body>
                    <Text style={{letterSpacing: 0.5,color: '#E5DDCB'}}>GƏLSİN</Text>
                    </Body>
                    <Right>
                        <Text style={{top: -12, color: '#E5DDCB',fontSize: 14}}>12.50</Text>
                        <Button transparent onPress={()=>Actions.cart()}>
                            <Icon name="ios-cart-outline" style={{color: '#E5DDCB'}}></Icon>
                        </Button>
                    </Right>
                </Header>
                    <Item style={{backgroundColor: '#EB7B59',justifyContent: 'center',margin: 0, paddingLeft: -40, borderWidth: 0}}>
                        <Icon name="search" style={{color: '#E5DDCB',marginLeft: 6}}></Icon>
                        <Input placeholder="search something" placeholderTextColor="rgba(255, 255, 255, 0.6)" style={{textAlign: 'center',color: '#FFF'}}/>
                    </Item>

                <View horizontal={true} style={css.subCategoryRow}>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                {this.state.SubCategories.map((category,i) => {
                  return  <Button rounded style={css.subCategoryBtn}>
                                <Text style={{color: '#E5DDCB'}}>{category.name}</Text>
                            </Button>
                })}
                    </ScrollView>

                </View>

                <Content>
                    {this.state.SubCategories.map((category,i) => {
                        return <Card style={{borderWidth: 0,marginLeft: 16,shadowOpacity: 0}}>
                            <Text style={{borderWidth: 0,marginBottom: 14, color: '#EB7B59'}}>{category.name}</Text>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}  pagingEnabled={true}
                                style={{flexDirection: 'row'}}>
                        <Product name="Ice Tea" thumbnail="http://gelsin.az/app/api/product/image/27" price="12.50 ₼"/>

                        <Product name="Cola" thumbnail="http://gelsin.az/app/api/product/image/32" price="12.50 ₼"/>


                        <Product name="Cola" thumbnail="http://gelsin.az/app/api/product/image/30" price="12.50 ₼"/>


                        <Product name="Cola" thumbnail="http://gelsin.az/app/api/product/image/31" price="12.50 ₼"/>


                        <Product name="Fanta" thumbnail="http://gelsin.az/app/api/product/image/33" price="12.50 ₼"/>


                        <Product name="Cola" thumbnail="http://gelsin.az/app/api/product/image/28" price="12.50 ₼"/>

                    </ScrollView>
                </Card>

                    })}
                </Content>

            </Container>

        );


    }
}
