
import React, {Component} from 'react';
import {ListView, TextInput, View, Image, Platform, TouchableOpacity, ScrollView, StyleSheet,Animated,ActivityIndicator,Dimensions} from "react-native";
import {Header,Container,Body,Text,Icon,Right,Left,Item,Input,Content,Button} from "native-base";
import {Actions} from 'react-native-router-flux';
// import css from '../Styles/CategoryStyle';
const {width, height, scale} = Dimensions.get("window"),
    vw = width / 100
    vh = height / 100

export default class Categories extends Component {


    constructor(props) {
        super(props);
        this.state = {
            categories: null
        }
    }

        getCategories() {
        return fetch("http://gelsin.az/app/api/categories", {method: "GET"})
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({categories: responseData.categoryTree});
            })
            .done();


    }


    componentWillMount()
    {
        this.getCategories();
    }


    componentDidMount()
    {
    }

    render() {
        if (this.state.categories === null) {
            return <Header  action={Actions.categories} newsLayoutButton={true}/>
        }

        const css = {
            "templateRow": {
                "width": (width / 2 - 18),
                "backgroundColor": "#FFF",
                "borderWidth": 1,
                "borderColor": "#E5DDCB",
                "alignItems": "center",
                "justifyContent": "center",
                margin: 6,
                borderRadius: 4

            },
            "templateImage": {
                width: 110,
                height: 80,
                "resizeMode": "contain",
                marginTop: 30,
                marginBottom: 20
            },
            "templateMenu": {
                color: '#524656',
                marginBottom: 15
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
            <Content>

            <View style={{flexDirection: 'row','flexWrap': 'wrap',alignItems: 'center', padding: 6}}>

                {this.state.categories.map((category) => {

                 return  <TouchableOpacity disabled={this.state.disabled}
                 style={css.templateRow}
                 onPress={()=>Actions.products(category.id)}>
                 <Image style={css.templateImage} source={require('./meal.jpeg')}></Image>
                 <Text style={css.templateMenu}>{category.name}</Text>
            </TouchableOpacity>
                })}


            </View>
            </Content>
        </Container>
        );


    }
}
