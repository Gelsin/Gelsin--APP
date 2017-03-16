import React, {Component} from 'react';
import {ListView, TextInput, View, Image, Platform, TouchableOpacity, ScrollView, StyleSheet,Animated,ActivityIndicator,AsyncStorage} from "react-native";
import {Header,Container,Body,Text,Icon,Right,Left,Item,Button,Input,Content,Card,CardItem,Thumbnail} from "native-base";
import {Actions} from 'react-native-router-flux';

export default class Products extends Component {

    constructor(props) {
        super(props);
        this.state = {
            brands: null,
            activeBrand: null,
            cartProducts: [],
            // Storage: null,
            cartPrice: 0,
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => true
            })
        }


        this.data = [];

    }

    getDataSource(posts) {
        return this.state.dataSource.cloneWithRows(posts);
    }


    addItem(product)
    {

        // flag = 0;
        // //updates the value of Cart in the top-right
        // pr = parseFloat(this.state.cartPrice) + parseFloat(product.price);
        // this.setState({cartPrice: pr});
        //look whether selected item exists in cart or not
        ProdID=product.id;
        cartProds = this.state.cartProducts;
        // look whether Cart is not empty
        if(cartProds.length > 0)
        {
            for (var i = 0; i < cartProds.length; i++) {
                //if selected product type already exists in Cart, do not add new object, just increase the quantity of existing one.

                if (cartProds[i].id == ProdID) {
                    cartProds[i].quantity++;
                    this.setState({cartProducts: cartProds}, () => console.log("Cart after update: ", this.state.cartProducts));
                    flag=1;
                }
            }

            if(flag==0)
            {
                cartProds.push({id: product.id,
                    stock: product.quantity,
                    quantity: 1,
                    cover_url: product.cover_url,
                    is_discounted: product.is_discounted,
                    name: product.name,
                    price: product.price});
                this.setState({cartProducts: cartProds}, () => console.log("CartProducts after adding new product: ", this.state.cartProducts));
            }




        }
         else {
            cartProds.push({id: product.id,
                stock: product.quantity,
                quantity: 1,
                cover_url: product.cover_url,
                is_discounted: product.is_discounted,
                name: product.name,
                price: product.price});
            this.setState({cartProducts: cartProds},()=>console.log("empty Cart after adding new product: ",this.state.cartProducts));
        }

        this.writeCartToDevice();
    }


    writeCartToDevice = async() => {

        try {
            cart = this.state.cartProducts;
            await AsyncStorage.setItem('@Gelsin:Cart', JSON.stringify(cart));
        } catch (error) {
            console.log(error);
        }


    };


    getBrands()
    {
        var prodUrl = "http://gelsin.az/app/api/brands";
        return fetch(prodUrl, {method: "GET"})
            .then((response) => response.json())
            .then((responseData) => {
                if(responseData.error==false)
                {
                    this.setState({brands: responseData.brands});
                }
            })
            .done();
    }

    renderRow(post, sectionID, rowID) {
        if (post.error == 'true')
            return null;

       return   <View key={post.id}>
           <CardItem horizontal={false} style={{flexDirection: 'column',borderWidth: 1,borderRadius: 4,padding: 0,marginRight: 14, borderColor: '#E5DDCB'}}>
               <Thumbnail square size={70} source={{uri: post.cover_url }} style={{marginTop: 12, marginBottom: 12}}/>
               <Text>{post.name}</Text>
               <Button full style={{backgroundColor: '#EB7B59',height: 28,marginTop: 8, marginBottom: 8}} onPress={()=>this.addItem(post)}><Text>Add To Cart</Text></Button>
               <Text style={{marginBottom: 8}}>{post.price}</Text>
           </CardItem>
       </View>


    }


    readData()
    {
        AsyncStorage.getItem("@Gelsin:Cart").then((value) => {
            console.log("save edilen data: ", value);
        }).done();
    }

    getProducts()
    {
        var prodUrl = "http://gelsin.az/app/api/products?category_id=" + this.props.subCategoryID + "&branch_id="+ this.props.branchID;
        return fetch(prodUrl, {method: "GET"})
            .then((response) => response.json())
            .then((responseData) => {
                if(responseData.error==false) {
                    this.setState({dataSource: this.getDataSource(responseData.products)});
                }
            })
            .done();
    }

    componentWillMount()
    {
        AsyncStorage.getItem("@Gelsin:Cart").then((value) => {
            if(value!=null)
                this.setState({cartProducts: JSON.parse(value)},()=>console.log("Storage-cartProducts: ",this.state.cartProducts));
        }).done();
        this.getBrands();
        this.getProducts();
    }





    render() {
        if(this.state.brands === null) {
            return null;
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
                <Header style={{"backgroundColor": '#524656'}}>
                    <Left>
                    <Button transparent onPress={()=>Actions.subCategories({categoryID: this.props.categoryID, branchID: this.props.branchID, subCategoryID: this.props.subCategoryID})}>
                        <Icon name="arrow-back" style={{color: '#E5DDCB'}}></Icon>
                    </Button>
                    </Left>
                    <Body>
                    <Text style={{letterSpacing: 0.5,color: '#E5DDCB'}}>GƏLSİN</Text>
                    </Body>
                    <Right>
                        <Text style={{top: -12, color: '#E5DDCB',fontSize: 14}}>{this.state.cartPrice} ₼</Text>
                        <Button transparent onPress={()=>Actions.cart()}>
                            <Icon name="ios-cart-outline" style={{color: '#E5DDCB'}}></Icon>
                        </Button>
                    </Right>
                </Header>
                    <Item style={{backgroundColor: '#EB7B59',justifyContent: 'center',margin: 0, paddingLeft: -40, borderWidth: 0}}>
                        <Icon name="search" style={{color: '#E5DDCB',marginLeft: 6}}></Icon>
                        <Input placeholder="search something" placeholderTextColor="rgba(255, 255, 255, 0.6)" style={{textAlign: 'center',color: '#FFF'}}/>
                    </Item>




                {/*Scrollable brands bar*/}

                <View horizontal={true} style={css.subCategoryRow}>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                {this.state.brands.map((brand,i) => {
                    //sadece o subKateqoriyaya aid olan brandlar cixir 'horizontal ScrollViewda'
                    if(brand.category_id==this.props.subCategoryID){
                  return <Button rounded style={css.subCategoryBtn} key={i}>
                                <Text style={{color: '#E5DDCB'}}>{brand.name}</Text>
                            </Button>
                    }
                })}
                    </ScrollView>

                </View>



                {/*PRODUCTS of choosen subCategory with brand rows*/}

                <Content>
                    {this.state.brands.map((brand,i) => {
                        if(brand.category_id==this.props.subCategoryID) {
                            return <Card style={{borderWidth: 0,marginLeft: 16,shadowOpacity: 0}} key={i}>
                                <Text style={{borderWidth: 0,marginBottom: 14, color: '#EB7B59'}}>{brand.name}</Text>
                                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}
                                            pagingEnabled={true}
                                            style={{flexDirection: 'row','flexWrap': 'wrap'}}>

                                    <ListView
                                        enableEmptySections={true}
                                        dataSource={this.state.dataSource}
                                        horizontal={true}
                                        renderRow={this.renderRow.bind(this)}>
                                    </ListView>
                                </ScrollView>
                            </Card>
                        }
                    })}

                </Content>

            </Container>

        );


    }
}
