import React, {Component} from 'react';
import {View,Container, Header, Title, Content, Footer, FooterTab, Button, Body, Icon, H3, Text, Form, Item, Picker,Input,Card,CardItem,Left,Right} from 'native-base';
import {Grid, Row, Col} from 'react-native-easy-grid';
import {AsyncStorage} from 'react-native';
import {Actions} from 'react-native-router-flux';
import  ButtonRound  from './common/ButtonRound';

export default class Addresses extends Component {

    constructor(props) {
        super(props);
        this.state = {
            token: '',
            address: [],
            selectedAddress: ''
        }
    }

    // onSeherChange (value: string) {
    //     this.setState({
    //         selected : value
    //     });
    // }
    //
    // onRayonChange (value: string) {
    //     this.setState({
    //         selected1 : value
    //     });
    // }


    goWithoutParam()
    {
       var obj;
       obj.addres_line=null;
       obj.branch_addres_id=null;
       Actions.newAddress(obj);
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
                backgroundColor: '#524656',
            },
            item: {
                flexDirection: 'column'
            }
        };

        return (


            <Container >
                <Header style={styles.header}>
                    <Left style={{ flex: 1}}>
                        <Button transparent onPress={()=>Actions.account()}>
                            <Icon name='arrow-back' style={{color: '#FFF'}}/>
                        </Button>
                    </Left>

                    <Body style={{ flex: 15}} >
                    <Title style={{alignSelf: 'center',color: '#E5DDCB',paddingLeft: 20,fontFamily: 'SourceSansPro-Regular',marginRight: 30}}>GƏLSİN</Title>
                    </Body>
                </Header>

                <Content style={{marginTop: 30}}>
                        <H3 style={{color: '#EB7B59',fontFamily: 'SourceSansPro-Regular',paddingLeft: 14}}>Mövcud adresləriniz</H3>

                    {this.state.address.map((adres,i) => {
                        return  <Card key={i}>
                            <Button transparent onPress={()=>Actions.newAddress({adres})}>
                                <Left>
                                    <Body>
                                    <Text>{adres.branch_address.street_name}</Text>
                                    <Text note>{adres.address_line}</Text>
                                    </Body>
                                </Left>
                            </Button>
                        </Card>
                    })}


                </Content>

                <Footer style={{"backgroundColor": '#524656'}}>
                    <FooterTab style={{flex: 1}}>
                        <Button transparent onPress={()=>Actions.newAddress()}>
                            <Icon name="ios-contacts-outline"/>
                            <Text style={{fontFamily: 'SourceSansPro-SemiBold', color: '#FFF'}}> + Yeni adres</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        );
    }
}