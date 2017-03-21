    import React, {Component} from 'react';
    import {ListView, TextInput, View, Image, Platform, TouchableOpacity, ScrollView, StyleSheet,Animated,Alert,ActivityIndicator,AsyncStorage,Dimensions} from "react-native";
    import {Header,Container,Body,Text,Icon,Right,Left,Item,Button,Input,Content,Card,CardItem,Thumbnail} from "native-base";
    import {Actions} from 'react-native-router-flux';
    import ProductItem from './common/ProductItem';
    const {width, height} = Dimensions.get("window"),
        vw = width / 100
    vh = height / 100

    var currentBrand;
    export default class Products extends Component {

        constructor(props)
        {
            super(props);
            this.state = {
                brands: null,
                activeBrand: null,
                selectedBrand: null,
                cartProducts: [],
                cartPrice: null,
                wholeProducts: [],
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

            flag = 0;
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
            this.setCartPrice();
        }


        writeCartToDevice = async() =>
        {

            try {
                cart = this.state.cartProducts;
                await AsyncStorage.setItem('@Gelsin:Cart', JSON.stringify(cart));
            } catch (error) {
                console.log(error);
            }


        };


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



        getBrands()
        {
            var prodUrl = "http://gelsin.az/app/api/brands";
            return fetch(prodUrl, {method: "GET"})
                .then((response) => response.json())
                .then((responseData) => {
                    if(responseData.error==false)
                    {
                        this.setState({brands: responseData.brands},()=>console.log("Brandlar: ",this.state.brands));
                    }
                })
                .done();
        }

        renderRow(post)
        {
            if(this.state.brands == null)
                return null;

            return(
                    <ProductItem name={post.name} price={post.price} thumbnail={post.cover_url} addItem={()=>this.addItem(post)}/>
            );





        }

        selectBrand(brand_id)
        {



            if(brand_id == -1)
           {
               ar = this.state.wholeProducts;
               this.setState({dataSource: this.getDataSource(ar)},()=>console.log("dataSource butunde: ",this.state.dataSource));
           }
           else {
                var arr = [];
                for (i = 0; i < this.state.wholeProducts.length; i++) {
                    if (this.state.wholeProducts[i].brand_id == brand_id) {
                        arr.push(this.state.wholeProducts[i]);
                    }
                }
                this.setState({dataSource: this.getDataSource(arr)}, () => console.log("filterDan sonra datasource: ", this.state.dataSource));
            }
        }

        getProducts(value)
        {

            var prodUrl = "http://gelsin.az/app/api/products?category_id=" + this.props.subCategoryID + "&branch_id="+ value;
            return fetch(prodUrl, {method: "GET"})
                .then((response) => response.json())
                .then((responseData) => {
                    if(responseData.error==false) {
                        console.log("URL gonderilen: ",prodUrl);
                        this.setState({wholeProducts: responseData.products});
                        this.setState({dataSource: this.getDataSource(responseData.products)},()=>console.log("PRODUKTLAR: ",responseData.products));
                    }
                    else
                    {
                        console.log("URL gonderilen: ",prodUrl);
                        console.log(responseData.error);
                        console.log(responseData.message);

                    }
                })
                .done();
        }

        componentWillMount()
        {

            AsyncStorage.getItem("@Gelsin:SelectedAddress").then((value) => {
                if(value != null) {
                    console.log("VALUEEEEE: ",value);
                    this.getProducts(JSON.parse(value));
                }
                else
                    console.log("get Error on read from device storage");
            }).done();


            AsyncStorage.getItem("@Gelsin:Cart").then((value) => {
                if(value!=null)
                    this.setState({cartProducts: JSON.parse(value)},()=>console.log("Storage-cartProducts: ",this.state.cartProducts));
                this.setCartPrice();
            }).done();

            this.getBrands();

        }





        render() {

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

                },
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

            if(this.state.brands === null) {
                return null;
            }




                return (
                    <Container>
                        <Header style={{"backgroundColor": '#524656',elevation: 0}}>
                            <Left style={{flex: 1}}>
                                <Button transparent
                                        onPress={()=>Actions.subCategories({categoryID: this.props.categoryID, branchID: this.props.branchID, subCategoryID: this.props.subCategoryID})}>
                                    <Icon name="ios-arrow-round-back" style={{color: '#E5DDCB'}}></Icon>
                                </Button>
                            </Left>
                            <Body style={{flex: 4}}>
                            <Text style={{letterSpacing: 0.5,color: '#E5DDCB'}}>GƏLSİN</Text>
                            </Body>
                            <Right style={{flex: 1}}>
                                <Text style={{top: -12, color: '#E5DDCB',fontSize: 14}}>{this.state.cartPrice} ₼</Text>
                                <Button transparent onPress={()=>Actions.cart()}>
                                    <Icon name="ios-cart-outline" style={{color: '#E5DDCB'}}></Icon>
                                </Button>
                            </Right>
                        </Header>
                        <Item
                            style={{backgroundColor: '#EB7B59',justifyContent: 'center',margin: 0, paddingLeft: -40, borderWidth: 0}}>
                            <Icon name="search" style={{color: '#E5DDCB',marginLeft: 6}}></Icon>
                            <Input placeholder="search something" placeholderTextColor="rgba(255, 255, 255, 0.6)"
                                   style={{textAlign: 'center',color: '#FFF'}}/>
                        </Item>


                        {/*Scrollable brands bar*/}

                        <View horizontal={true} style={css.subCategoryRow}>
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                <Button rounded style={css.subCategoryBtn} key={i} onPress={()=>this.selectBrand(-1)}>
                                    <Text style={{color: '#E5DDCB'}}>Bütün Məhsullar</Text>
                                </Button>
                                {this.state.brands.map((brand, i) => {
                                    //sadece o subKateqoriyaya aid olan brandlar cixir 'horizontal ScrollViewda'
                                    if (brand.category_id == this.props.subCategoryID) {
                                        return <Button rounded style={css.subCategoryBtn} key={i} onPress={()=>this.selectBrand(brand.id)}>
                                            <Text style={{color: '#E5DDCB'}}>{brand.name}</Text>
                                        </Button>
                                    }
                                })}
                            </ScrollView>

                        </View>


                        {/*PRODUCTS of choosen subCategory with brand rows*/}

                        <Content>
                                            <ListView contentContainerStyle={{flexDirection: 'row',flex: 1, flexWrap: 'wrap'}}
                                                dataSource={this.state.dataSource}
                                                enableEmptySections={true}
                                                horizontal
                                                renderRow={(rowData)=>this.renderRow(rowData)}>
                                            </ListView>

                        </Content>

                    </Container>

                );
        }
    }
