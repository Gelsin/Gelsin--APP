import React, {Component} from 'react';
import {View,Container, Header, Title, Content, Footer, FooterTab, Button, Body, Icon, H3, Text, Form, Item, Input,Card,CardItem,Left,Right} from 'native-base';
import {Grid, Row, Col} from 'react-native-easy-grid';
import {Actions} from 'react-native-router-flux';
import  ButtonRound  from './common/ButtonRound';
import {AsyncStorage,Picker,AlertIOS,TextInput} from 'react-native';

export default class NewAddress extends Component {

    constructor(props) {
        super(props);
        this.state = {
            addressLine: this.props.adres? this.props.adres.address_line:null,
            selectedBranchId: this.props.adres? this.props.adres.branch_address_id:null,

            //addresLine: this.props.adres.address_line ? this.props.adres.address_line: null ,
            //selectedBranchID: this.props.adres.branch_address_id ? this.props.adres.branch_address_id: null,
            token: '',
            user: String,
            branchAddresses: [],
            pageName: ''
        }

    }


    getUser(token)
    {
        console.log("getting user");

        fetch('http://gelsin.az/app/api/auth/user?token=' + token, {method: 'GET'})
            .then((response) => response.json())
            .then((responseJson) => {
            if(responseJson.message == "authenticated user is customer") {
                this.setState({user: responseJson.user}, () => console.log("User: ", this.state.user));
            }
            })
            .catch((error) => {
                console.error(error);
            });

    }

    getToken = async () => {
        try {
            var value = await AsyncStorage.getItem('@Gelsin:auth_user');
            if (value != null){
                this.setState({token: value},this.getUser(value),this.getBranchAddresses());
            } else {
                console.log("value null oldu.");
            }
        } catch (error) {
            console.log(error);
        }
    };


    AddEditAdres()
    {
        if(this.props.adres == null)
        {
            //add Address
            fetch("http://gelsin.az/app/api/address/add" ,{
            method: 'POST',
                headers: {
                'Accept': 'application/json',
                    'Content-Type': 'application/json',

            },
                body: JSON.stringify({token: this.state.token, user_id: this.state.user.id, branch_address_id: this.state.selectedBranchID, address_line: this.state.addresLine})})
                .then((response) => response.json())
                .then((responseData) => {
                })
                .done();
        }
        else
        {
            //edit Address
            console.log("EDIT ADRES");
            console.log("TOKEN: ",this.state.token);
            console.log("addressID: ",this.props.adres.id);
            console.log("branchID: ",this.state.selectedBranchId);
            console.log("Address Line: ",this.state.addressLine);
        }
    }


    componentWillMount()
    {
        this.getToken();
        if(this.state.addressLine != null && this.state.branchAddresses !=null)
        {
            this.setState({addresLine: this.props.adres.address_line});
            this.setState({selectedBranchID: this.props.adres.branch_address_id});
            this.setState({pageName: "Mövcud adres"});
        }
        else
        {
            this.setState({pageName: "Yeni adres"});
        }
    }


    getBranchAddresses()
    {
        fetch('http://gelsin.az/app/api/branch/addresses', {method: 'GET'})
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({branchAddresses: responseJson.branches}, ()=>console.log("Branch adresleri: ",this.state.branchAddresses));
            })
            .catch((error) => {
                console.error(error);
            });
    }

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
                            <Button transparent onPress={()=>Actions.addresses()}>
                                <Icon name='arrow-back' style={{color: '#FFF'}}/>
                            </Button>
                        </Left>

                        <Body style={{ flex: 7}}>
                        <Title
                            style={{alignSelf: 'center',color: '#E5DDCB',paddingLeft: 20,fontFamily: 'SourceSansPro-Regular'}}>GƏLSİN</Title>
                        </Body>
                    </Header>

                    <Content style={{marginTop: 30}}>
                        <Form>
                            <H3 style={{color: '#EB7B59',fontFamily: 'SourceSansPro-semiBold',paddingLeft: 14}}>{this.state.pageName ? this.state.pageName:"yeni adres"}</H3>

                                <Picker
                                    iosHeader="Select one"
                                    mode="dropdown"
                                    selectedValue={this.state.selectedBranchID}
                                    onValueChange={(value)=>this.setState({
                                    selectedBranchID : value},()=>console.log("Street Line: ",this.state.selectedBranchID))}>
                                    {this.state.branchAddresses.map((address,i) =>
                                         {
                                             return <Picker.Item style={{fontFamily: 'SourceSansPro-Regular'}} label={address.street_name} value={address.id} key={i}/>}
                                    )}
                                </Picker>

                            <Item>
                                <Input
                                    style={{left: 15,color: '#524656',paddingLeft: 0,fontFamily: 'SourceSansPro-Regular',height: 40 }}
                                    placeholder="adres açıqlaması"
                                    onChangeText={(Line) => this.setState({addresLine: Line},()=>console.log("adresLineS: ",this.state.addresLine))}/>
                            </Item>

                        </Form>
                    </Content>

                    <Footer style={{"backgroundColor": '#524656'}}>
                        <FooterTab style={{flex: 1}}>
                            <View style={{flexDirection: 'row', flex: 1, justifyContent: 'space-between'}}>
                                <Button transparent>
                                    <Text style={{fontFamily: 'SourceSansPro-Regular',marginTop: 10, color: '#FFF'}}>Cancel</Text>
                                </Button>
                                <Button rounded
                                        style={{backgroundColor: '#EB7B59',marginTop: 10,marginRight: 15, width: 120,height: 30,justifyContent: 'center'}}
                                        onPress={()=>this.AddEditAdres()}>
                                    <Text style={{fontFamily: 'SourceSansPro-Regular'}}>Save</Text>
                                </Button>
                            </View>
                        </FooterTab>
                    </Footer>
                </Container>
            );

    }
}