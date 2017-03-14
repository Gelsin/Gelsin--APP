
import React, {Component} from 'react';
import {ListView, TextInput, View, Image, Platform, TouchableOpacity, ScrollView, StyleSheet,Animated,ActivityIndicator,Dimensions} from "react-native";
import {Header,Container,Body,Text,Icon,Right,Left,Item,Input,Content,Button} from "native-base";
import {Actions} from 'react-native-router-flux';
import Drawer from 'react-native-drawer';
import SideBarContent from './common/SideBarContent';

const {width, height} = Dimensions.get("window"),
    vw = width / 100
    vh = height / 100

export default class Categories extends Component {

    constructor(props) {
        super(props);
        this.state = {
            categories: null
        }
    }

    openControlPanel = () => {
        this._drawer.open()
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
            }
        }

        const drawerStyles = {
            drawer: { shadowColor: '#000000', shadowOpacity: 1.8, shadowRadius: 3, backgroundColor: '#252225'},
            main: {paddingLeft: 3},
        }


        if (this.state.categories === null) {
            return null;

        }



        return (


        <Container>
            <Drawer
                tapToClose={true}
                open={false}
                type="overlay"
                content={<SideBarContent />}
                ref = {(ref) => this._drawer = ref}
                openDrawerOffset={250}
                styles={drawerStyles}
                tweenHandler={Drawer.tweenPresets.parallax}
            >
                <Header style={{"backgroundColor": '#524656'}}>
                    <Left>
                        <Button transparent onPress={()=>this.openControlPanel()}>
                        <Icon name="ios-menu" style={{color: '#E5DDCB'}}></Icon>
                        </Button>
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

                {this.state.categories.map((category,i) => {

                 return  <TouchableOpacity disabled={this.state.disabled} key={i}
                 style={css.templateRow}
                 onPress={()=>Actions.subCategories(category.id)}>
                 <Image style={css.templateImage} source={{uri: category.cover_url}}></Image>
                 <Text style={css.templateMenu}>{category.name}</Text>
            </TouchableOpacity>
                })}


            </View>
            </Content>
            </Drawer>
        </Container>

        );


    }
}
