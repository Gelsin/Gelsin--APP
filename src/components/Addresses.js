import React, {Component} from 'react';
import {View,Container, Header, Title, Content, Footer, FooterTab, Button, Body, Icon, H3, Text, Form, Item, Picker,Input,Card,CardItem,Left,Right} from 'native-base';
import {AsyncStorage,Alert} from 'react-native';
import {Actions} from 'react-native-router-flux';

export default class Addresses extends Component {

    constructor(props) {
        super(props);
        this.state = {
            token: '',
            address: [],
            selectedAddress: ''
        }
    }

    getToken = async () => {
        try {
            var value = await AsyncStorage.getItem('@Gelsin:auth_user');
            if (value !== null){
                this.setState({token: value});
                this.getAddresses(this.state.token);

            } else {
                console.log(value);
            }
        } catch (error) {
            console.log(error);
        }
    };


    deleteClicked(addressID)
    {
        //delete Address

        Alert.alert("Hörmətli istifadəçi","Bu adresi silmək istədiyinizə əminsiniz?",
            [

                {text: 'Bəli', onPress: (()=>this.deleteAddress(addressID))},
                {text: 'Xeyir'}
            ],{ cancelable: false })
    }


    deleteAddress(addressID)
    {

        fetch("http://gelsin.az/app/api/address/delete" ,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',

            },
            body: JSON.stringify({token: this.state.token, address_id: addressID})})
            .then((response) => response.json())
            .then((responseData) => {
                if(responseData.message !="success") {
                    Alert.alert("Adres silindi.");
                    this.componentWillMount();
                    console.log("responseData: ",responseData);
                }

            })
            .done();
    }


    getAddresses(token) {
        console.log("getting user addresses");

        fetch('http://gelsin.az/app/api/addresses?token=' + token, {method: 'GET'})
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({address: responseJson.address},()=>console.log("ADRESLER: ",this.state.address));
            })
            .catch((error) => {
                console.error(error);
            });
    }



    componentWillMount() {
        console.log("mounted");
        this.getToken();
    };



    render() {

        const styles = {
            header: {
                backgroundColor: '#524656',alignItems: 'center'
            },
            item: {
                flexDirection: 'column'
            }
        };

        return (


            <Container>
                <Header style={styles.header}>
                    <Left style={{ flex: 1}}>
                        <Button transparent onPress={()=>Actions.account()}>
                            <Icon style={{color: '#e5ddcb'}} name='ios-arrow-round-back'/>
                        </Button>
                    </Left>

                    <Body style={{ flex: 7}}>
                    <Title style={{alignSelf: 'center', color: '#e5ddcb'}}>GƏLSİN</Title>
                    </Body>

                    <Right style={{ flex: 1}}/>

                </Header>

                <Content style={{marginTop: 30}}>
                        <H3 style={{color: '#EB7B59',fontFamily: 'SourceSansPro-Regular',paddingLeft: 14}}>Mövcud adresləriniz</H3>

                    {this.state.address.map((adres,i) => {
                        return  <Card key={i}>

                                <Left style={{flexDirection: 'row'}}>
                                    <Button transparent onPress={()=>Actions.newAddress({adres})} style={{flex: 9}}>
                                    <Body>
                                    <Text>{adres.branch_address.street_name}</Text>
                                    <Text note>{adres.address_line}</Text>
                                    </Body>
                                    </Button>
                                    <Button transparent style={{flex: 1,alignItems: 'flex-end' }} onPress={()=>this.deleteClicked(adres.id)}>
                                        <Icon  name='ios-trash-outline'/></Button>
                                </Left>
                        </Card>
                    })}
                </Content>

                <Footer style={{"backgroundColor": '#524656'}}>
                    <FooterTab style={{flex: 1}}>
                        <Button transparent onPress={()=>Actions.newAddress()}>
                            <Icon style={{color: '#FFF'}} name="ios-add-circle-outline" />
                            <Text style={{color: '#FFF', fontFamily: 'SourceSansPro-Regular'}}>Yeni adres</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        );
    }
}