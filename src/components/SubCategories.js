import {Header,Container,Body,Text,Icon,Right,Left,Item,Input,Content,Button,Card,CardItem,Thumbnail} from "native-base";
import React, {Component} from 'react';
import {ListView, TextInput, View, Image, Platform, TouchableOpacity, ScrollView, StyleSheet,Animated,ActivityIndicator,Dimensions,AsyncStorage,Alert} from "react-native";
import {Actions} from 'react-native-router-flux';

import Drawer from 'react-native-drawer-menu';
import {Easing} from 'react-native'; // Customize easing function (Optional)

const {width, height} = Dimensions.get("window"),
    vw = width / 100
vh = height / 100
var CatID;
export default class Products extends Component {

    constructor(props) {
        super(props);
        this.state = {
            SubCategories: null,
            color: "#000000",
            cartProducts: [],
            cartPrice: null
        }
    }

    openControlPanel = () => {
        this._drawer.openDrawer();
        console.log("Drawer Acildi");
        this.setState({color: '#000000'},()=>console.log("color ag olmalidi: ",this.state.color));
    }


    onClose()
    {
        this.setState({color: "#FFF"},()=>(console.log("BAGLANDI: ",this.state.color)));
    }

    componentWillMount()
    {
        this.getCategories()
    }


    setCartPrice()
    {
        Price = 0.00;
        for (i=0; i<this.state.cartProducts.length; i++)
        {
            console.log("products Price: ",this.state.cartProducts[i].price);
            Price += this.state.cartProducts[i].price * this.state.cartProducts[i].quantity;
        }
        this.setState({cartPrice: Price},()=>console.log("Cart Price: ",this.state.cartPrice));
    }

    componentDidMount()
    {
        AsyncStorage.getItem("@Gelsin:Cart").then((value) => {
            if(value!=null)
                this.setState({cartProducts: JSON.parse(value)},()=> this.setCartPrice());
        }).done();
    }


    getCategories() {
        var url = "http://gelsin.az/app/api/categories/" + this.props.categoryID;
        return fetch(url, {method: "GET"})
            .then((response) => response.json())
            .then((responseData) => {
            if(responseData.message == "This category has no childs!")
            {
                Alert.alert("Təəssüf ki","Bu Kateqoriya hal-hazırda boşdur.");
                this.setState({SubCategories: responseData.category.childs});
            }
            else if(responseData.error==false) {
                CatID = responseData.category.id;
                this.setState({SubCategories: responseData.category.childs});
            }


        })
            .done();


    }


    render()
    {



        var customStyles = {
            drawer: {
                shadowColor: '',
                shadowOpacity: 0.4,
                shadowRadius: 10
            },
            mask: {}, // style of mask if it is enabled
            main: {} // style of main board
        };


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
            container: {
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#F5FCFF',
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
            },
            "Button": {color: '#E5DDCB',fontFamily: 'SourceSansPro-Regular'}
        }


         var drawerContent = (
        <View style={{ backgroundColor: 'black', height: height}} >
            <Button  style={{marginTop: 80}} transparent onPress={()=>Actions.ordersMain()}><Text style={css.Button}>Order History</Text></Button>
            <Button  transparent onPress={()=>Actions.account()}><Text style={css.Button}>Hesabım</Text></Button>
            <Button  transparent onPress={()=>Actions.addresses()}><Text style={css.Button}>Adreslərim</Text></Button>
            <Button  transparent><Text style={css.Button}>Haqqımızda</Text></Button>
            <Button  transparent onPress={()=>Actions.category()}><Text style={css.Button}>Kateqoriyalar</Text></Button>
        </View>);


        const drawerStyles = {
            drawer: { shadowRadius: 3, backgroundColor: this.state.color},
        }


        if (this.state.SubCategories === null) {
            return null;

        }

        return (
            <Drawer
                style={css.container}
                drawerWidth={170}
                maskAlpha={2.0}
                duration={100}
                ref = {(ref) => this._drawer = ref}
                drawerContent={drawerContent}
                type={Drawer.types.Overlay}
                customStyles={{drawer: css.main}}
                drawerPosition={Drawer.positions.Left}
                onDrawerOpen={() => {console.log('Drawer is opened');}}
                onDrawerClose={() => {console.log('Drawer is closed')}}
                easingFunc={Easing.ease}
            >
        <Container style={{backgroundColor: '#FFF'}}>

        <Header style={{"backgroundColor": '#524656', justifyContent: 'space-between'}}>
            <Left style={{flex: 1}}>
                <Button transparent onPress={()=>this.openControlPanel()}>
                <Icon name="ios-menu" style={{color: '#E5DDCB'}}></Icon>
                </Button>
            </Left>
            <Body style={{flex: 1}}>
            <Text style={{letterSpacing: 0.5,color: '#E5DDCB'}}>GƏLSİN</Text>
            </Body>
            <Right style={{flex: 1}}>
                <Text style={{top: -12,color: '#E5DDCB',fontSize: 14}}>{this.state.cartPrice} ₼</Text>
                <Button transparent onPress={()=>Actions.cart()}>
                    <Icon name="ios-cart-outline" style={{color: '#E5DDCB'}}></Icon>
                </Button>
            </Right>
        </Header>

   <Content>
       <View style={{flexDirection: 'row','flexWrap': 'wrap',alignItems: 'center', padding: 6}}>

           {this.state.SubCategories.map((subCategory,i) => {
               return <TouchableOpacity disabled={this.state.disabled} key={i}
                                        style={css.templateRow}
                                        onPress={()=>Actions.products({categoryID:CatID, subCategoryID: subCategory.id})}>
                   <Image style={css.templateImage}
                          source={{uri: subCategory.cover_url}}></Image>
                   <Text style={css.templateMenu}>{subCategory.name}</Text>
               </TouchableOpacity>

           })}


       </View>
   </Content>
    </Container>
    </Drawer>
    );
    }


}
