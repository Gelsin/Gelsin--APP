import {Header,Container,Body,Text,Icon,Right,Left,Item,Input,Content,Button,Card,CardItem,Thumbnail} from "native-base";
import React, {Component} from 'react';
import {ListView, TextInput, View, Image, Platform, TouchableOpacity, ScrollView, StyleSheet,Animated,ActivityIndicator,Dimensions} from "react-native";
import {Actions} from 'react-native-router-flux';
const {width} = Dimensions.get("window");

var CatID;
export default class Products extends Component {

    constructor(props) {
        super(props);
        this.state = {
            SubCategories: null
        }
    }


    componentWillMount()
    {
        this.getCategories()
    }

    componentDidMount()
    {

    }


    getCategories() {
        var url = "http://gelsin.az/app/api/categories/" + this.props.data;
        return fetch(url, {method: "GET"})
            .then((response) => response.json())
            .then((responseData) => {
                if(responseData.error==false) {
                    CatID = responseData.category.id;
                    this.setState({SubCategories: responseData.category.childs});
                }

        })
            .done();


    }


    render()
    {
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


        if (this.state.SubCategories === null) {
            return <Header  action={Actions.subCategories(this.props.data)} newsLayoutButton={true}/>

        }

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
                <Text style={{top: -12,color: '#E5DDCB',fontSize: 14}}>13.50</Text>
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

           {this.state.SubCategories.map((subCategory,i) => {
               return <TouchableOpacity disabled={this.state.disabled} key={i}
                                        style={css.templateRow}
                                        onPress={()=>Actions.products({categoryID:CatID, branchID: 1, subCategoryID: subCategory.id})}>
                   <Image style={css.templateImage}
                          source={{uri: subCategory.cover_url}}></Image>
                   <Text style={css.templateMenu}>{subCategory.name}</Text>
               </TouchableOpacity>

           })}


       </View>
   </Content>
    </Container>
    );
    }


}
